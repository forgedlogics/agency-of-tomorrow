# Campaign Launch Lab

## An interactive marketing concept for moving from campaign brief to test-ready launch

**Project type:** Independent product and marketing-operations prototype  
**Role:** Research, campaign strategy, interaction design, and Python workflow development  
**Status:** Exploratory prototype — simulated workflow; no live ad accounts or customer data

## The problem

Marketing teams spend significant time on repetitive work before a campaign can begin: translating a client brief, collecting early research, reviewing competitors, creating first-draft copy, adapting creative for different channels, and preparing status updates.

Those steps are necessary, but they can be slow, fragmented, and difficult for a client to follow. Small brands especially may not have the time or budget to move from an idea to a well-reasoned campaign test.

## The question

**How might an interactive marketing system help a brand decide whether a campaign is ready to test, then reduce the repetitive work needed to prepare it?**

## The concept

Campaign Launch Lab is a proposed interactive agency workflow. A user enters a brand, campaign goal, and outcome. Specialized Python agents create a visible decision record instead of operating as a black box.

The workflow is designed to answer one clear question:

> Should the brand invest in this campaign, test it on a small scale, or pause and improve the idea first?

## Workflow

1. **Brand Memory** — organizes the brief, brand voice, product, audience, and approved information.
2. **Market Intelligence** — frames the research questions around category, competitor, and customer signals.
3. **Campaign Strategy** — creates an audience tension, campaign hypothesis, channel role, and success measure.
4. **Creative Flywheel** — prepares campaign directions, messaging, and format variations.
5. **Media Autopilot** — creates a bounded test and measurement plan.
6. **Opportunity Hunter** — prepares a route for approved lead follow-up.
7. **Governance Layer** — escalates public claims, privacy concerns, material spend, or brand-safety issues to a person.

## Why it is interactive marketing

The project treats marketing as a feedback loop rather than one-way advertising. The user can enter a brief, see each system’s action, inspect its decision trail, and understand what happens next. In a future version, campaign results would feed back into Brand Memory to improve the next recommendation.

## Current prototype

- Public interactive workflow: [GitHub Pages demo](https://forgedlogics.github.io/agency-of-tomorrow/)
- Python simulator: [Streamlit demo](https://5zzvgaaiediuctukwyrjjr.streamlit.app/)
- Python agent workflow: `agencyos/` and `run_agency.py`

The current version uses deterministic sample logic so its behavior can be inspected safely. It does not claim to predict campaign success, access live customer data, or publish to advertising platforms.

## What I would build next

1. Connect a reliable live-research provider and show a source link, publisher, and date beside every factual claim.
2. Turn the final recommendation into **Invest**, **Test First**, or **Pause**, with clear reasoning and risk indicators.
3. Generate an approved launch kit: campaign concepts, social posts, captions, email, ad-copy variations, visual mockups, and content calendar.
4. Add an experiment dashboard that compares a small test with the campaign hypothesis and recommends the next action.

## What this project demonstrates

- Campaign planning and customer-journey thinking
- Interactive experience design
- Marketing automation and AI workflow design
- Research transparency and responsible AI boundaries
- Translating a marketing problem into a working public prototype
