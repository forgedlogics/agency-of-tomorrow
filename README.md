# AgencyOS

## The agency that does not wait for a brief to become a spreadsheet

AgencyOS was created around a simple frustration: great independent brands should not need a full agency retainer, a stack of disconnected tools, and constant follow-up just to turn a good product into a coherent campaign.

The usual process is fragmented. Research lives in one place, strategy in another, content is drafted without context, performance is reviewed after the moment has passed, and the founder becomes the person connecting every dot. AgencyOS is designed to close that gap.

It is a creative marketing operating system that takes a focused business brief and develops the work a sharp agency team would normally coordinate: a campaign territory, strategic hypothesis, art direction, channel-ready content, controlled testing, measurement, and an approval route.

**The ambition is not automated noise. It is a more independent agency brain—one that remembers the brand, notices opportunities, develops the campaign, and learns what to do next.**

## What it solves

| The problem | The AgencyOS response |
| --- | --- |
| A campaign begins from a blank page every time. | Start from brand context, audience insight, the offer, and previous learning. |
| Strategy, creative, and execution lose the same central idea. | Turn one strategic thought into a connected campaign world across content, copy, channels, and testing. |
| Small teams spend too much time coordinating tools and people. | Put research, planning, production direction, and approval decisions into one operating loop. |
| Automation can publish generic or risky work. | Keep spend, public claims, publishing, and sensitive decisions behind human approval. |
| Marketing is measured too late to improve it. | Define the test, success signal, and next decision before launch. |

## See it in action

The public experience is an interactive campaign studio. Enter a brand brief and it produces an immediate campaign package with a creative route, strategy, content system, experiment, measurement plan, and clickable review queue. Packages can be saved locally in the browser.

- [Open AgencyOS](https://forgedlogics.github.io/agency-of-tomorrow/)
- [View the Tide Collection campaign kit](https://forgedlogics.github.io/agency-of-tomorrow/campaign-kit.html)

## The AgencyOS operating loop

1. **Brand memory** — retains the brand’s codes, audience, offers, guardrails, and accumulated learning.
2. **Market intelligence** — organizes customer, competitor, culture, and category signals.
3. **Campaign strategy** — turns evidence into a prioritized hypothesis and an outcome to move.
4. **Creative flywheel** — develops the creative territory, content system, copy, and production direction.
5. **Launch coordination** — prepares approved publishing, promotion, responses, and optimization workflows.
6. **Learning engine** — measures what happened and recommends the next best move.
7. **Governance** — keeps the human accountable for public claims, spend, sensitive actions, and exceptions.

## Built for brands with a point of view

AgencyOS is especially suited to founder-led and design-led brands where the product, material, and visual language matter. The goal is to make the work feel more considered—not more automated: clear strategy, strong creative judgment, and an operating system that can keep moving between campaigns.

## Repository guide

| File or folder | Purpose |
| --- | --- |
| `index.html` | Interactive public AgencyOS campaign studio. |
| `campaign-kit.html` | Full luxury campaign deliverable for the Tide Collection. |
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

## The line AgencyOS will not cross

AgencyOS can organize research, draft, monitor, recommend, and prepare actions. It does not publish, spend money, or contact customers without configured integrations and explicit human approval rules.
