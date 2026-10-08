# AgencyOS — The Agency of Tomorrow

## An AI-powered marketing-agency portfolio concept for moving from campaign brief to test-ready launch

**Project type:** Independent product and marketing-operations prototype  
**Role:** Research, campaign strategy, interaction design, and Python workflow development  
**Status:** Professional portfolio concept — simulated workflow; no live ad accounts or customer data

## The problem

Marketing teams spend significant time on repetitive work before a campaign can begin: translating a client brief, collecting early research, reviewing competitors, creating first-draft copy, adapting creative for different channels, and preparing status updates.

Those steps are necessary, but they can be slow, fragmented, and difficult for a client to follow. Small brands especially may not have the time or budget to move from an idea to a well-reasoned campaign test.

## The question

**How might an interactive marketing system help a brand decide whether a campaign is ready to test, then reduce the repetitive work needed to prepare it?**

## The concept

AgencyOS is a proposed AI-powered agency model. Its Campaign Launch Lab lets a user enter a brand, campaign goal, audience, early market signal, and optional research source. Specialized Python agents create a visible decision record instead of operating as a black box.

The workflow is designed to answer one clear question:

> Should the brand invest in this campaign, test it on a small scale, or pause and improve the idea first?

## Workflow

1. **Brief Organizer** — turns the request into a focused campaign question.
2. **Research Desk** — records the market signal and attached source; it flags unsupported factual claims.
3. **Campaign Planner** — creates an audience focus, campaign hypothesis, and measurable goal.
4. **Test Designer** — creates a small campaign test before larger investment.
5. **Approval Gate** — recommends **Invest**, **Test First**, or **Pause** and identifies the next human decision.

## Why it is interactive marketing

The project treats marketing as a feedback loop rather than one-way advertising. The user can enter a brief, see each system’s action, inspect its decision trail, and understand what happens next. In a future version, campaign results would feed back into Brand Memory to improve the next recommendation.

## Current prototype

- Public interactive workflow: [GitHub Pages demo](https://forgedlogics.github.io/agency-of-tomorrow/)
- Python simulator: [Streamlit demo](https://5zzvgaaiediuctukwyrjjr.streamlit.app/)
- Python agent workflow: `agencyos/` and `run_agency.py`

The current version uses deterministic sample logic so its behavior can be inspected safely. It does not claim to predict campaign success, access live customer data, or publish to advertising platforms.

## What I would build next

1. Connect a reliable live-research provider and show a source link, publisher, and date beside every factual claim.
2. Add a richer evidence score that checks source reliability and campaign-specific research signals.
3. Expand the first launch kit into campaign concepts, social posts, captions, email, ad-copy variations, visual mockups, and content calendar.
4. Add an experiment dashboard that compares a small test with the campaign hypothesis and recommends the next action.

## What this project demonstrates

- Campaign planning and customer-journey thinking
- Interactive experience design
- Marketing automation and AI workflow design
- Research transparency and responsible AI boundaries
- Translating a marketing problem into a working public prototype
