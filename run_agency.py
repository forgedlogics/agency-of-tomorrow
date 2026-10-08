"""Run a local AgencyOS workflow from the terminal and print its decision record."""

import argparse
import json

from agencyos import AgencyOS, CampaignBrief


def main() -> None:
    parser = argparse.ArgumentParser(description="Run an AgencyOS campaign simulation.")
    parser.add_argument("--brand", default="Aster Jewelry — Tide Collection")
    parser.add_argument("--goal", default="Build qualified interest before a recycled-silver collection launch.")
    parser.add_argument("--objective", default="Generate qualified interest")
    parser.add_argument("--claim-review", action="store_true", help="Require review for a new claim or regulated statement.")
    parser.add_argument("--spend-review", action="store_true", help="Require review for a material media budget decision.")
    args = parser.parse_args()

    brief = CampaignBrief(
        brand=args.brand,
        goal=args.goal,
        objective=args.objective,
        needs_claim_review=args.claim_review,
        needs_spend_review=args.spend_review,
    )
    print(json.dumps(AgencyOS().run(brief).as_dict(), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
