"""Specialist, explainable agents for the AgencyOS prototype.

These are deterministic workflow agents, not live ad-platform integrations. Their
outputs make the operating model inspectable before any real account permissions
or external AI model are introduced.
"""

from .models import AgentEvent, CampaignBrief


class BrandMemoryAgent:
    name = "Brand Memory"

    def run(self, brief: CampaignBrief) -> AgentEvent:
        return AgentEvent(
            self.name,
            "Created a governed campaign context.",
            f"Stored brand: {brief.brand}; objective: {brief.objective}; goal: {brief.goal}",
        )


class MarketIntelligenceAgent:
    name = "Market Intelligence"

    def run(self, brief: CampaignBrief) -> AgentEvent:
        return AgentEvent(
            self.name,
            "Mapped the opportunity to an audience tension.",
            "Research brief: identify the customer tension, category whitespace, and proof needed before launch.",
        )


class CampaignStrategistAgent:
    name = "Campaign Strategist"

    def run(self, brief: CampaignBrief) -> AgentEvent:
        return AgentEvent(
            self.name,
            "Selected a testable campaign route.",
            f"Route: use one clear promise to {brief.objective.lower()} and measure qualified response before widening distribution.",
        )


class CreativeFlywheelAgent:
    name = "Creative Flywheel"

    def run(self, brief: CampaignBrief) -> AgentEvent:
        return AgentEvent(
            self.name,
            "Prepared an adaptable creative system.",
            "Output: one campaign territory, three message angles, and channel-ready variants for controlled testing.",
        )


class MediaAutopilotAgent:
    name = "Media Autopilot"

    def run(self, brief: CampaignBrief) -> AgentEvent:
        return AgentEvent(
            self.name,
            "Prepared bounded activation rules.",
            "Output: a small initial test, pacing thresholds, and an optimization plan that cannot exceed approved limits.",
        )


class OpportunityHunterAgent:
    name = "Opportunity Hunter"

    def run(self, brief: CampaignBrief) -> AgentEvent:
        return AgentEvent(
            self.name,
            "Prepared approved lead-response paths.",
            "Output: a qualifying question, a helpful follow-up route, and a handoff point for high-intent prospects.",
        )


class GovernanceAgent:
    name = "Governance Layer"

    def run(self, brief: CampaignBrief) -> AgentEvent:
        reasons: list[str] = []
        if brief.needs_claim_review:
            reasons.append("a new public claim, price promise, or regulated statement")
        if brief.needs_spend_review:
            reasons.append("a material paid-media budget decision")
        if reasons:
            return AgentEvent(
                self.name,
                "Paused launch for accountable approval.",
                f"Human review required for {' and '.join(reasons)}.",
                status="review_required",
            )
        return AgentEvent(
            self.name,
            "Approved a bounded launch route.",
            "No configured exception was triggered. Continue to monitoring within approved rules.",
        )
