# AgencyOS — an autonomous marketing operating system

AgencyOS is a creative marketing operating system for independent brands. It turns business context into campaign strategy, art direction, copy, content systems, experiments, and accountable approvals.

## What it is

The public site is the AgencyOS creative world and output library. It includes a complete campaign kit so visitors can see the quality and format of work AgencyOS is built to produce.

Open the site: [AgencyOS on GitHub Pages](https://forgedlogics.github.io/agency-of-tomorrow/)

View the agency-style deliverable: [Tide Collection Campaign Kit](https://forgedlogics.github.io/agency-of-tomorrow/campaign-kit.html)

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
| `index.html` | Public AgencyOS creative-world homepage. |
| `campaign-kit.html` | Client-ready example campaign deliverable. |
| `agencyos/` | Inspectable Python model of specialist-agent orchestration. |
| `run_agency.py` | Runs the local Python workflow. |
| `app.py` | Optional Streamlit presentation of the workflow. |
| `CASE_STUDY.md` | Product rationale and build direction. |
| `archive/` | Earlier experiments, kept separate from the current build. |

## Run the real planning app

GitHub Pages hosts only the public concept page. The working AgencyOS app is
the Streamlit application because model calls and business memory must remain
server-side.

    python3 -m pip install -r requirements.txt
    export OPENAI_API_KEY="your_api_key"
    streamlit run app.py

`OPENAI_API_KEY` is intentionally excluded from Git. On Streamlit Community
Cloud, add it through the app's Secrets settings instead of committing it.

The app creates and stores a structured campaign package: strategy, content
drafts, controlled experiment, approval queue, and next best action. It does
not publish, spend, or contact customers.

## Safety boundary

AgencyOS is designed to automate research organization, drafting, monitoring, and recommendations while people remain accountable for consequential, public, or sensitive actions. It does not publish, spend, or contact customers without configured integrations and explicit approval rules.
