"""Agency of Tomorrow: a Python-powered autonomous-agency simulator.

Run locally with: streamlit run app.py
"""

import time

import streamlit as st

st.set_page_config(page_title="Agency / 2030", page_icon="●", layout="wide")

PRESETS = {
    "Hybrid agency": {"orchestration": 70, "creative": 65, "media": 70},
    "Autonomous agency 2030": {"orchestration": 92, "creative": 88, "media": 90},
    "Traditional agency": {"orchestration": 15, "creative": 20, "media": 25},
}

DEPARTMENTS = [
    ("Signal Desk", "Researches customer, culture, and category signals."),
    ("Strategy Pod", "Builds a decision-ready campaign route."),
    ("Creative Studio", "Produces concepts, copy, and adaptable creative variants."),
    ("Media Room", "Plans channels, allocation, and measurement."),
    ("QA Exceptions", "Escalates only policy, safety, or accountability exceptions."),
]


def model_outputs(orchestration: int, creative: int, media: int) -> dict[str, str]:
    automation = (orchestration + creative + media) / 3
    minutes = max(18, round(95 - automation * 0.58))
    return {
        "manual_time": "5 business days",
        "autonomous_time": f"{minutes} minutes",
        "deliverables": str(round(8 + creative * 0.32 + orchestration * 0.14)),
        "retention": f"{round(60 + media * 0.22 + orchestration * 0.1)}%",
    }


st.title("Agency / 2030")
st.caption("Public prototype · autonomous advertising-agency operating model")
st.write(
    "Explore how an AI-operated agency could route a brief through research, "
    "strategy, creative production, media planning, and launch with human review "
    "only when an exception needs accountability."
)

with st.sidebar:
    st.header("Agency controls")
    preset = st.selectbox("Operating model", list(PRESETS), index=1)
    defaults = PRESETS[preset]
    orchestration = st.slider("AI orchestration", 0, 100, defaults["orchestration"])
    creative = st.slider("Creative automation", 0, 100, defaults["creative"])
    media = st.slider("Media optimization", 0, 100, defaults["media"])
    st.caption("Outputs are illustrative scenario assumptions, not performance guarantees.")

metrics = model_outputs(orchestration, creative, media)
first, second, third, fourth = st.columns(4)
first.metric("Traditional campaign cycle", metrics["manual_time"])
second.metric("Simulated autonomous cycle", metrics["autonomous_time"])
third.metric("Simulated deliverables", metrics["deliverables"])
fourth.metric("Illustrative retention health", metrics["retention"])

st.divider()
st.subheader("Route a client brief")
left, right = st.columns(2)
with left:
    brand = st.text_input("Brand or project", "Aster Jewelry — Tide Collection")
    objective = st.selectbox(
        "Primary outcome",
        ["Generate qualified interest", "Build brand awareness", "Increase product discovery", "Drive repeat purchase"],
    )
with right:
    goal = st.text_area(
        "What needs to happen?",
        "Build qualified interest before the first recycled-silver collection launch.",
    )

if st.button("Start autonomous agency run", type="primary", use_container_width=True):
    st.session_state["run_complete"] = False
    with st.status("Agency systems are working", expanded=True) as status:
        for index, (department, description) in enumerate(DEPARTMENTS, start=1):
            st.write(f"**{index:02d} · {department}** — {description}")
            time.sleep(0.35)
        status.update(label="Autonomous run complete", state="complete", expanded=False)
    st.session_state["run_complete"] = True

if st.session_state.get("run_complete"):
    st.success(f"Campaign ready for launch: {brand}")
    st.write(
        f"The agency created a route to **{objective.lower()}** from the brief: “{goal}” "
        f"The model treats human involvement as exception-only; people enter when a safety, policy, "
        "or accountability issue is escalated."
    )

st.divider()
st.subheader("What the agency does")
columns = st.columns(3)
for column, (department, description) in zip(columns * 2, DEPARTMENTS + [("Client Portal", "Makes work, decisions, and outcomes transparent without status-meeting overload.")]):
    with column:
        st.markdown(f"**{department}**")
        st.caption(description)
