"""AgencyOS: a Python Streamlit simulation of an autonomous agency workflow.

Run locally with:
    python3 -m pip install -r requirements.txt
    streamlit run app.py
"""

import time

import streamlit as st


st.set_page_config(page_title="AgencyOS", page_icon="◉", layout="wide")

AGENTS = [
    ("Brand Memory", "Assembles the approved voice, product, audience, and prior learning."),
    ("Market Intelligence", "Turns category, competitor, and customer signals into a focused opportunity."),
    ("Campaign Strategist", "Sets the audience tension, message, channel roles, and success measure."),
    ("Creative Flywheel", "Builds on-brand campaign routes, copy, and adaptable creative variants."),
    ("Media Autopilot", "Prepares bounded tests, pacing rules, and a measurement plan."),
    ("Opportunity Hunter", "Designs approved high-intent follow-up and client handoff paths."),
    ("Governance Layer", "Checks claims, privacy, spend, brand safety, and human-approval rules."),
]


def simulated_metrics(autonomy: int, review_needed: bool) -> dict[str, str]:
    cycle_minutes = max(30, 94 - round(autonomy * 0.6))
    if review_needed:
        cycle_minutes += 13
    return {
        "traditional": "5 business days",
        "autonomous": f"{cycle_minutes} minutes",
        "outputs": str(round(18 + autonomy * 0.23)),
        "reviews": "1" if review_needed else "0",
    }


st.title("AgencyOS")
st.caption("A transparent, autonomous marketing-agency operating model · Demo data only")
st.write(
    "A client brief moves through seven specialist agents that share one governed brand memory. "
    "Routine work moves autonomously; consequential decisions are escalated to a responsible person."
)

with st.sidebar:
    st.header("Operating rules")
    autonomy = st.slider("Autonomy level", 0, 100, 86)
    st.caption("Higher autonomy speeds routine work. It does not remove approval rules.")
    st.markdown("**Always escalate**")
    st.caption("New public claims · material spend · privacy risk · brand safety · cultural judgment")

st.subheader("Client launchpad")
left, right = st.columns(2)
with left:
    brand = st.text_input("Brand or project", "Aster Jewelry — Tide Collection")
    objective = st.selectbox(
        "Primary outcome",
        ["Generate qualified interest", "Drive product discovery", "Grow an owned audience", "Increase repeat purchase"],
    )
with right:
    goal = st.text_area(
        "What needs to happen?",
        "Build qualified interest before a recycled-silver collection launch.",
    )
    review_needed = st.checkbox(
        "This brief includes a new claim, price promise, regulated statement, or major budget decision."
    )

metrics = simulated_metrics(autonomy, review_needed)
metric_columns = st.columns(4)
metric_columns[0].metric("Traditional setup", metrics["traditional"])
metric_columns[1].metric("Simulated autonomous cycle", metrics["autonomous"])
metric_columns[2].metric("Decision-ready outputs", metrics["outputs"])
metric_columns[3].metric("Human reviews", metrics["reviews"])

if st.button("Start AgencyOS run", type="primary", use_container_width=True):
    st.session_state["run_complete"] = False
    st.session_state["review_needed"] = review_needed
    with st.status("AgencyOS is coordinating the campaign", expanded=True) as status:
        for number, (agent, action) in enumerate(AGENTS, start=1):
            if agent == "Governance Layer" and review_needed:
                st.warning(f"{number:02d} · {agent} — Human approval requested before launch.")
            else:
                st.write(f"{number:02d} · **{agent}** — {action}")
            time.sleep(0.32)
        label = "Campaign staged for human approval" if review_needed else "Bounded launch route ready"
        status.update(label=label, state="complete", expanded=False)
    st.session_state["run_complete"] = True

if st.session_state.get("run_complete"):
    if st.session_state.get("review_needed"):
        st.warning("Human decision requested before launch")
        st.write(
            "The system completed routine research, strategy, production, and planning, "
            "but correctly stopped for a responsible owner to approve the flagged claim or spend decision."
        )
    else:
        st.success("Campaign route ready for bounded launch")
        st.write(
            f"**{brand}** has a measured route to **{objective.lower()}**. "
            "The simulation would keep monitoring routine signals and write learning back to Brand Memory."
        )

st.divider()
st.subheader("What each system owns")
for start in range(0, len(AGENTS), 3):
    columns = st.columns(3)
    for column, (agent, action) in zip(columns, AGENTS[start : start + 3]):
        with column:
            st.markdown(f"**{agent}**")
            st.caption(action)

st.caption("Portfolio prototype: outputs are illustrative workflow simulations, not performance guarantees or live ad-platform actions.")
