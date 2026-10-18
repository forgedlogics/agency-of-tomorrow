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
        package = {'business_hypothesis': 'Test the offer', 'content_plan': [{'draft': 'A draft'}]}
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
        with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-only'}), patch('agencyos.brain.build_campaign_package', return_value={'content_plan':[{'draft':'ok'}]}):
            codes = [self.client.post('/plan-campaign', json=BRIEF).status_code for _ in range(4)]
            self.assertEqual(codes, [200, 200, 200, 429])
