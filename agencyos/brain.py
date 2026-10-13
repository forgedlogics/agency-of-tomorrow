"""The model-backed planning layer for AgencyOS."""
from __future__ import annotations
import json
import os
from dataclasses import asdict
from .models import CampaignBrief

SYSTEM_PROMPT = """You are AgencyOS, an accountable marketing operating system.
Create useful, specific work for the business described. Do not invent facts,
research, performance data, sources, customer quotes, legal claims, or product features.
Treat unverified signals as hypotheses to test. Return valid JSON only with:
campaign_name, priority, business_hypothesis, audience_tension, campaign_territory,
core_message, content_plan, experiment, metrics, approval_queue, next_best_action.
content_plan is an array of 3 objects with channel, format, hook, and draft.
experiment has variable, variant_a, variant_b, hold_constant, and success_signal.
Always include public claims, final creative, and spend/publishing when applicable in
approval_queue. Prepare recommendations and drafts only; never publish, spend, or contact people."""

def build_campaign_package(brief: CampaignBrief, brand_memory: dict[str, str]) -> dict:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured. Add it to Streamlit Secrets or your server environment before running AgencyOS.")
    from openai import OpenAI

    client = OpenAI(api_key=api_key)
    response = client.responses.create(
        model=os.getenv("AGENCYOS_MODEL", "gpt-5-mini"),
        instructions=SYSTEM_PROMPT,
        input=json.dumps({"brief": asdict(brief), "brand_memory": brand_memory}),
    )
    try:
        return json.loads(response.output_text)
    except json.JSONDecodeError as error:
        raise RuntimeError("The planning model returned an invalid campaign package. Please run it again.") from error
