# AgencyOS — an autonomous marketing operating system

**Project type:** Independent creative-marketing operating system
**Role:** Product concept, marketing strategy, interaction design, and workflow development
**Status:** Creative operating model with a working, model-backed campaign-planning application

## The problem

Small businesses often run marketing as disconnected projects: research in one place, content in another, planning in a spreadsheet, approvals in messages, and reporting after the fact. Work is repeated, context gets lost, and lessons from one launch do not reliably shape the next.

Generative AI can produce a single asset quickly, but a business needs more than content generation. It needs an operating system that understands goals, maintains context, coordinates specialist work, and makes the next decision easier.

## The product question

**How might an AI-powered agency run repeatable marketing work independently while keeping a business owner accountable for consequential decisions?**

## The concept

AgencyOS is a proposed AI marketing operating system. Its core is **Brand Memory**: a governed record of business goals, audience knowledge, brand rules, offers, campaign history, and validated learnings. Specialist agents work from that shared context to research an opportunity, develop a campaign, create content systems, coordinate approved work, monitor results, and recommend the next action.

It is not a black-box autopilot. Each action belongs to a named specialist and produces a visible campaign record. The system is autonomous for bounded, low-risk work; people approve public claims, paid-media limits, final publishing, sensitive customer interactions, and exceptions.

## Operating loop

1. Know the business.
2. Find the signal.
3. Choose the move.
4. Build the campaign.
5. Ask for approval.
6. Coordinate launch.
7. Learn and adapt.

## Current build

The public site explains the operating model and includes a full campaign kit with strategy, art direction, copy, content system, test plan, and approval queue. The companion Streamlit application creates this type of structured package from a business brief when its server-side model connection is configured.

The repository also includes an inspectable Python workflow. It uses deterministic outputs to model how specialist agents produce an accountable decision record.

## Build direction

1. Business onboarding that creates a governed Brand Memory profile.
2. Research connections with citations, source dates, and confidence indicators.
3. A campaign workspace with content briefs, approval states, asset versions, and channel calendars.
4. Connected publishing and advertising integrations, enabled only through explicitly approved permissions and budgets.
5. An analytics and learning layer that records outcomes, confidence, and recommendations across campaigns.

## What this project demonstrates

- Marketing systems thinking and customer-journey design
- AI-agent orchestration with explicit roles and controls
- Product communication and creative-system design
- Responsible automation boundaries
- Translating an agency-service idea into a buildable software product
