"""Orchestrates AgencyOS's specialist agents into one accountable workflow."""

from .agents import (
    BrandMemoryAgent,
    CampaignStrategistAgent,
    CreativeFlywheelAgent,
    GovernanceAgent,
    MarketIntelligenceAgent,
    MediaAutopilotAgent,
    OpportunityHunterAgent,
)
from .models import CampaignBrief, CampaignRun


class AgencyOS:
    """Runs the local prototype workflow and preserves a decision record."""

    def __init__(self) -> None:
        self.agents = [
            BrandMemoryAgent(),
            MarketIntelligenceAgent(),
            CampaignStrategistAgent(),
            CreativeFlywheelAgent(),
            MediaAutopilotAgent(),
            OpportunityHunterAgent(),
            GovernanceAgent(),
        ]

    def run(self, brief: CampaignBrief) -> CampaignRun:
        campaign = CampaignRun(brief=brief)
        for agent in self.agents:
            event = agent.run(brief)
            campaign.add(event)
            if event.status == "review_required":
                campaign.requires_human_review = True
                campaign.review_reasons.append(event.output)

        if campaign.requires_human_review:
            campaign.recommended_next_step = "Assign the named owner to approve or revise the exception before launch."
        else:
            campaign.recommended_next_step = "Launch the bounded test and feed observed results back into Brand Memory."
        return campaign
