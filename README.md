# Agency of Tomorrow

A speculative marketing-agency operating model and interactive brief simulator.

## The idea

What if an early-stage agency used specialized AI roles to make marketing work more structured—while keeping people accountable for judgment, quality, and direction?

## Prototype capabilities

- A shared campaign brief
- Six focused roles: strategy, creative, copy, media, operations, and quality
- A human approval gate before launch
- An interactive simulation that turns a brief into a first campaign response
- A learning loop for improving the next project

## Why it matters

This is not a claim that AI replaces marketers. It is a product concept for making briefs, handoffs, and decisions clearer in a modern agency workflow.

## Built with

- React
- Next.js / Vinext
- TypeScript
- CSS

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
