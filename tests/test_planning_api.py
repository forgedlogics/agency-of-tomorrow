"""Run with python -m unittest discover -s tests."""
import os
import unittest
from unittest.mock import patch
from fastapi.testclient import TestClient
import api_server

BRIEF = dict(name='Autumn', brand='Aster', offer='Collection', audience='Collectors', goal='Grow waitlist', channel='Email')

class PlanningAPI(unittest.TestCase):
    def setUp(self):
        api_server.recent_requests.clear()
        self.client = TestClient(api_server.app)

    def test_unconfigured_planner(self):
        with patch.dict(os.environ, {'OPENAI_API_KEY': ''}):
            self.assertEqual(self.client.post('/plan-campaign', json=BRIEF).status_code, 503)

    def test_invalid_brief(self):
        self.assertEqual(self.client.post('/plan-campaign', json={**BRIEF, 'brand': ''}).status_code, 422)

    def test_success_and_no_server_persistence(self):
        package = {'business_hypothesis': 'Test the offer', 'content_plan': [{'channel': 'Email', 'hook': 'Introducing Aster', 'draft': 'A draft'}]}
        with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-only'}), patch('agencyos.brain.build_campaign_package', return_value=package) as planner:
            response = self.client.post('/plan-campaign', json=BRIEF)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json(), package)
            self.assertEqual(planner.call_args.args[1]['offer'], 'Collection')

    def test_model_failure_and_malformed_output(self):
        for value in [{}, [], {'content_plan': [{'draft': 42}]}]:
            with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-only'}), patch('agencyos.brain.build_campaign_package', return_value=value):
                self.assertEqual(self.client.post('/plan-campaign', json=BRIEF).status_code, 502)

    def test_rate_limit(self):
        with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-only'}), patch('agencyos.brain.build_campaign_package', return_value={'content_plan':[{'channel':'Email','hook':'A hook','draft':'ok'}]}):
            codes = [self.client.post('/plan-campaign', json=BRIEF).status_code for _ in range(4)]
            self.assertEqual(codes, [200, 200, 200, 429])

    def test_health_reports_capabilities_without_keys(self):
        with patch.dict(os.environ, {'OPENAI_API_KEY': '', 'GEMINI_API_KEY': ''}):
            self.assertEqual(self.client.get('/health').json(), {'ready': True, 'planning_ready': False, 'visual_ready': False})
        with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-only', 'GEMINI_API_KEY': ''}):
            self.assertTrue(self.client.get('/health').json()['planning_ready'])

    def test_incomplete_content_fields_are_rejected(self):
        for item in [{'draft': 'text'}, {'channel': 'Email', 'hook': '', 'draft': 'text'}, {'channel': 42, 'hook': 'Hook', 'draft': 'text'}]:
            with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-only'}), patch('agencyos.brain.build_campaign_package', return_value={'content_plan': [item]}):
                api_server.recent_requests.clear()
                self.assertEqual(self.client.post('/plan-campaign', json=BRIEF).status_code, 502)

    def test_serves_workspace_and_same_origin_configuration(self):
        self.assertIn('Campaign workspace', self.client.get('/').text)
        self.assertIn('window.location.origin', self.client.get('/agencyos-config.js').text)
        self.assertEqual(self.client.get('/workspace.js').status_code, 200)

    def test_private_files_are_not_served(self):
        for path in ['/agencyos.db', '/api_server.py', '/.env', '/requirements.txt', '/agencyos/store.py']:
            self.assertEqual(self.client.get(path).status_code, 404)

    def test_provider_errors_have_safe_actionable_messages(self):
        class ProviderError(Exception):
            pass
        for status, expected in [(401, 'key was rejected'), (429, 'quota or rate limit'), (403, 'model is unavailable')]:
            error = ProviderError('private provider response must not be returned')
            error.status_code = status
            api_server.recent_requests.clear()
            with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-only'}), patch('agencyos.brain.build_campaign_package', side_effect=error):
                response = self.client.post('/plan-campaign', json=BRIEF)
                self.assertEqual(response.status_code, 502)
                self.assertIn(expected, response.json()['detail'])
                self.assertNotIn('private provider response', response.text)
