# Campaign Launch Lab

A simple, interactive marketing prototype that turns a campaign brief into an **Invest**, **Test First**, or **Pause** recommendation and a first campaign launch kit.

## The agency model

Campaign Launch Lab is an AI-powered agency concept for emerging consumer brands. Its productized offer, the **Campaign Test Sprint**, takes a client from campaign qualification to research, a decision, launch materials, and an ongoing three-agent growth engine:

- **Content Flywheel:** creates, tests, and learns from content.
- **Amplification Engine:** turns winning messages into bounded paid distribution.
- **Opportunity Hunter:** routes interest into fast, helpful follow-up and human handoff.

The agency is designed to automate repetitive work, not to remove accountability for evidence, public claims, spend, or creative judgment.

Read the portfolio-ready [Campaign Launch Lab case study](CASE_STUDY.md).

## The idea

What if an interactive marketing system made the repetitive first steps of campaign planning faster—while people stayed accountable for research evidence, public claims, privacy, spend, and creative judgment?

## Prototype capabilities

- A campaign decision: **Invest**, **Test First**, or **Pause**
- Five visible agent steps: Brief Organizer, Research Desk, Campaign Planner, Test Designer, and Approval Gate
- A transparent record of what each agent reviewed and recommended
- An attached research-source field; factual claims are never presented as verified without a source
- A first campaign kit: direction, social copy, test approach, and an original visual concept
- Support for any industry, not only jewelry

## Why it matters

This is not a claim that AI predicts campaign success or replaces marketers. It is a product concept for making early marketing research, decisions, and first-draft campaign work more visible and less time-consuming.

## Built with

- React
- Next.js / Vinext
- TypeScript
- CSS
- Python / Streamlit

## Python agents

The reusable Python workflow lives in `agencyos/`. It contains seven deterministic, explainable agents and an `AgencyOS` orchestrator. It deliberately does **not** connect to an ad account, CRM, or customer data: the first version is safe to inspect and test locally.

Run the agents directly from Terminal:

```bash
python3 run_agency.py
```

Try the human-review path:

```bash
python3 run_agency.py --claim-review
```

Both commands print a JSON decision record showing each agent's action, outputs, and whether launch needs a human owner.

## Run the Python app

The primary interactive simulator is written in Python with Streamlit.

```bash
python3 -m pip install -r requirements.txt
streamlit run app.py
```

## Static preview

### Simplest option: browser

Open `index.html` in any browser. No installation is required.

### Terminal simulation

```bash
python3 simulate_agency.py
```

### Full prototype

```bash
npm install
npm run dev
```

## Status

Active concept prototype. The current version uses structured example logic rather than a live AI integration.
