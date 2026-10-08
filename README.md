# AgencyOS — Agency of Tomorrow

A speculative, interactive operating model for a transparent autonomous marketing agency.

## The idea

What if a marketing agency used specialized AI agents to keep work moving around the clock—while people stayed accountable for brand judgment, public claims, privacy, spend, and cultural direction?

## Prototype capabilities

- Seven connected agency systems: Brand Memory, Market Intelligence, Campaign Strategy, Creative Flywheel, Media Autopilot, Opportunity Hunter, and Governance
- One shared record of brand context, approved claims, audience signals, and learning
- An interactive campaign simulation with a visible decision log
- Rules that distinguish routine autonomous work from exceptions requiring human approval
- A jewelry-brand sample brief, plus support for custom non-sensitive briefs

## Why it matters

This is not a claim that AI replaces marketers or that it should make unaccountable public decisions. It is a product concept for making marketing operations, handoffs, decisions, and learning more visible and useful.

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
