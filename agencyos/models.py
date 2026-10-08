"""Data structures shared by the AgencyOS agents."""

from dataclasses import asdict, dataclass, field


@dataclass(frozen=True)
class CampaignBrief:
    """A deliberately small, non-sensitive client brief for the prototype."""

    brand: str
    goal: str
    objective: str
    needs_claim_review: bool = False
    needs_spend_review: bool = False


@dataclass(frozen=True)
class AgentEvent:
    agent: str
    action: str
    output: str
    status: str = "complete"


@dataclass
class CampaignRun:
    """The explainable record returned by an AgencyOS run."""

    brief: CampaignBrief
    events: list[AgentEvent] = field(default_factory=list)
    requires_human_review: bool = False
    review_reasons: list[str] = field(default_factory=list)
    recommended_next_step: str = ""

    def add(self, event: AgentEvent) -> None:
        self.events.append(event)

    def as_dict(self) -> dict:
        return {
            "brief": asdict(self.brief),
            "events": [asdict(event) for event in self.events],
            "requires_human_review": self.requires_human_review,
            "review_reasons": self.review_reasons,
            "recommended_next_step": self.recommended_next_step,
        }
