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

GitHub Pages is deliberately static, so it cannot safely hold an API key. The included `api_server.py` is the private bridge between the homepage and the Gemini image API: it receives the visitor’s brief, creates the image prompt on the server, and returns that one generated visual to the visitor.

Deploy `api_server.py` to a Python service (the included `render.yaml` is ready for Render), set `GEMINI_API_KEY` in that service’s secret settings, then set the deployed API URL in `agencyos-config.js`. Never put the API key in `agencyos-config.js`, GitHub Pages, or browser JavaScript. Gemini's native image-generation models require the paid Gemini API tier; the free key can still be used for text/research integrations.

## The line AgencyOS will not cross

AgencyOS can organize research, draft, monitor, recommend, and prepare actions. It does not publish, spend money, or contact customers without configured integrations and explicit human approval rules.

## Campaign workspace

Open `workspace.html` (or use **Open workspace** on the homepage) for the user-facing marketing app:

- Create campaigns from your own brief, or load an editable jewelry example.
- Generate clearly labeled starter templates without an API key.
- Edit hooks and drafts, set content dates, and track draft and final review.
- Save brand context for future briefs, search campaigns, and view planned content dates.
- Download individual campaigns and export/import a complete JSON workspace backup.

Run a local preview with `python3 -m http.server 4177`, then visit
`http://localhost:4177/workspace.html`. Workspace data is stored in this browser on
this origin. There are no shared accounts or cloud sync; export a backup before
clearing browser data or switching devices. This app records planned dates and
reviews; it does not publish content.

### Optional AI campaign planning

The workspace can call the existing model-backed planner through
`POST /plan-campaign` on `api_server.py`. Set `OPENAI_API_KEY` on that server and
set `AGENCYOS_API_URL` in `agencyos-config.js` to the server's HTTPS origin. Select
**AI campaign planner** when creating a campaign. API keys stay on the server.
The endpoint returns drafts to the browser and does not write visitors' briefs to
the shared local campaign database. The visual engine remains available separately.

The server's in-memory rate limit is suitable for a small demo, not a paid public
service. Before a wider launch, add authenticated accounts, durable per-user storage,
and durable usage limits. Deploy the frontend to GitHub Pages and the Python API
separately; GitHub Pages cannot execute Python.

### Verification

```sh
node --check workspace.js
python -m unittest discover -s tests
```

API tests require `httpx` in addition to `requirements.txt` (install with
`python -m pip install httpx`). Tests mock the model; no paid model calls are made.
