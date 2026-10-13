# AgencyOS — an autonomous marketing operating system

AgencyOS is a portfolio prototype for an AI marketing agency that operates as a continuous system, not a one-off campaign generator. It helps a business understand its context, research opportunities, develop campaigns, create and coordinate content, request human approval where needed, measure outcomes, and learn what to do next.

## What it is

The public demo is a browser-based prototype of the **AgencyOS Command Center**. It demonstrates the operating model and a transparent campaign route; it does not access live customer data, publish content, operate ad accounts, or make decisions for a business without configured controls.

Open the site: [AgencyOS on GitHub Pages](https://forgedlogics.github.io/agency-of-tomorrow/)

## The operating loop

1. **Brand Memory** — retains goals, audience insight, brand rules, offers, campaign history, and verified learnings.
2. **Market Intelligence** — researches customers, trends, competitors, and emerging opportunities.
3. **Campaign Strategy** — turns evidence into a prioritized hypothesis and measurement plan.
4. **Creative Flywheel** — develops campaign territory, content systems, and channel-ready variants.
5. **Launch Coordination** — prepares approved publishing, promotion, response, and optimization workflows.
6. **Learning Engine** — measures outcomes and recommends the next best action.
7. **Governance Layer** — requires human approval for public claims, spending, sensitive actions, and exceptions.

## Repository guide

| File or folder | Purpose |
| --- | --- |
| `index.html` | Public AgencyOS Command Center prototype. |
| `agencyos/` | Inspectable Python model of specialist-agent orchestration. |
| `run_agency.py` | Runs the local Python workflow. |
| `app.py` | Optional Streamlit presentation of the workflow. |
| `CASE_STUDY.md` | Product rationale and build direction. |
| `archive/` | Earlier experiments, kept separate from the current prototype. |

## Safety boundary

AgencyOS is designed to be autonomous in low-risk work—research organization, drafting, monitoring, and recommendations—while people remain accountable for consequential, public, or sensitive actions. The prototype makes no claim of live client service, marketing-platform access, legal-business registration, or guaranteed marketing results.
