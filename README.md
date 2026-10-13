# AgencyOS

## The AI automation agency that turns friction into operating systems

AgencyOS was created around a simple frustration: ambitious businesses should not need a collection of disconnected tools, manual handoffs, and constant follow-up just to turn customer interest into growth.

The usual process is fragmented. Leads sit in forms and DMs, research lives in tabs, content is made without customer context, CRM follow-up is inconsistent, and the founder becomes the person connecting every dot. AgencyOS is designed to close that gap.

It is an AI automation agency that designs and operates the systems a sharp growth team would normally coordinate: lead capture, qualification, research, content, outreach, CRM follow-up, reporting, and accountable approvals.

**The ambition is not automated noise. It is a more independent agency brain—one that notices opportunities, moves routine work forward, and learns what to do next.**

## What it solves

| The problem | The AgencyOS response |
| --- | --- |
| Leads and inbound interest go cold. | Capture, enrich, score, route, and follow up using a defined customer journey. |
| Research, content, and outreach live in separate tools. | Connect them into a single context-aware growth system. |
| Small teams spend too much time on handoffs and admin. | Automate routine research, CRM updates, reporting, and repeatable operational work. |
| Automation can send generic or risky work. | Keep public claims, messages, spend, and sensitive actions behind human approval. |
| Activity is measured too late to improve it. | Build measurement and a next-action loop into every automation from the start. |

## See it in action

The public experience is an interactive Automation Audit. Enter a business, offer, bottleneck, outcome, customer, and current tools. AgencyOS produces an immediate automation blueprint with a priority system, workflow logic, intelligence layer, content-and-demand engine, measurement plan, and clickable approvals. With the private Visual Engine connected, the same brief can also produce an original campaign image—never a fixed stock mockup. Blueprints can be saved locally in the browser.

- [Open AgencyOS](https://forgedlogics.github.io/agency-of-tomorrow/)

## The AgencyOS operating loop

1. **Capture** — collects inbound interest and operating signals from the places customers already show up.
2. **Qualify** — enriches, scores, and routes opportunities based on the business’s actual criteria.
3. **Create** — turns research and customer context into campaign drafts, content, and visual concepts.
4. **Follow through** — updates the CRM, prepares timely outreach, and eliminates manual handoffs.
5. **Learn** — measures the response, records the result, and recommends the next best move.
6. **Govern** — keeps the human accountable for public claims, spend, sensitive actions, and exceptions.

## Built for brands with a point of view

AgencyOS is especially suited to founder-led and design-led brands where the product, material, and visual language matter. The goal is to make the work feel more considered—not more automated: clear strategy, strong creative judgment, and an operating system that can keep moving between campaigns.

## Repository guide

| File or folder | Purpose |
| --- | --- |
| `index.html` | Interactive public AgencyOS Automation Audit. |
| `agencyos/` | Python model of specialist-agent orchestration. |
| `run_agency.py` | Runs the local planning workflow. |
| `app.py` | Optional Streamlit interface for the model-connected workflow. |
| `CASE_STUDY.md` | Product rationale and build direction. |
| `archive/` | Earlier experiments, kept separate from the current build. |

## Run the model-connected planning app

GitHub Pages runs the interactive public studio. Model calls and business memory stay server-side in the Streamlit app.

```bash
python3 -m pip install -r requirements.txt
export OPENAI_API_KEY="your_api_key"
streamlit run app.py
```

The app creates and stores a structured campaign package: strategy, content drafts, controlled experiment, approval queue, and next best action. The API key is intentionally excluded from Git.

## Connect live visual generation to the public site

GitHub Pages is deliberately static, so it cannot safely hold an OpenAI API key. The included `api_server.py` is the private bridge between the homepage and the OpenAI image API: it receives the visitor’s brief, creates the image prompt on the server, and returns that one generated visual to the visitor.

Deploy `api_server.py` to a Python service (the included `render.yaml` is ready for Render), set `OPENAI_API_KEY` in that service’s secret settings, then set the deployed API URL in `agencyos-config.js`. Never put the API key in `agencyos-config.js`, GitHub Pages, or browser JavaScript.

## The line AgencyOS will not cross

AgencyOS can organize research, draft, monitor, recommend, and prepare actions. It does not publish, spend money, or contact customers without configured integrations and explicit human approval rules.
