"""Run locally with: streamlit run app.py"""
import os
import streamlit as st
from agencyos import CampaignBrief
from agencyos.brain import build_campaign_package
from agencyos.store import recent_campaign_runs, save_campaign_run

st.set_page_config(page_title="AgencyOS Command Center", page_icon="◉", layout="wide")
st.title("AgencyOS Command Center")
st.caption("Real campaign planning with a human approval gate. It drafts and recommends; it does not publish or spend.")

with st.sidebar:
    st.header("Operating rules")
    st.write("The brain may research-plan, strategize, and draft. A person owns final claims, creative, publishing, and media spend.")
    if os.getenv("OPENAI_API_KEY"):
        st.success("Planning engine connected")
    else:
        st.warning("Planning engine needs an API key")
        st.caption("Set OPENAI_API_KEY in Streamlit Secrets or the server environment. The key never belongs in this repository.")

left, right = st.columns(2)
with left:
    brand = st.text_input("Business / brand", "Aster Jewelry")
    objective = st.selectbox("Business outcome", ["Generate qualified interest", "Drive product discovery", "Grow an owned audience", "Increase repeat purchase"])
    audience = st.text_input("Primary audience", "Design-conscious customers seeking meaningful jewelry")
with right:
    goal = st.text_area("What needs to happen?", "Build a qualified waitlist for a new collection.")
    signal = st.text_area("What do you already know? (treated as an unverified signal)", "Customers respond to material and process stories.")
    rules = st.text_area("Brand / business rules", "No urgency claims. Keep language calm, specific, and material-led.")

if st.button("Run AgencyOS", type="primary", use_container_width=True):
    brief = CampaignBrief(brand=brand, goal=goal, objective=objective)
    with st.status("AgencyOS is developing the campaign package…", expanded=True) as status:
        st.write("Loading governed Brand Memory")
        st.write("Building strategy, content, experiment, and approval package")
        try:
            package = build_campaign_package(brief, {"audience": audience, "observed_signal": signal, "rules": rules})
            run_id = save_campaign_run(brand, objective, goal, package)
            st.session_state["package"], st.session_state["run_id"] = package, run_id
            status.update(label="Campaign package ready for review", state="complete", expanded=False)
        except RuntimeError as error:
            status.update(label="Planning engine needs configuration", state="error")
            st.error(str(error))

if package := st.session_state.get("package"):
    st.divider()
    st.subheader(package.get("campaign_name", "Campaign package"))
    st.caption(f"Run #{st.session_state.get('run_id')} · {package.get('priority', 'Priority not set')}")
    first, second = st.columns(2)
    with first:
        st.markdown("#### Strategy")
        st.write(f"**Hypothesis:** {package.get('business_hypothesis', '')}")
        st.write(f"**Audience tension:** {package.get('audience_tension', '')}")
        st.write(f"**Territory:** {package.get('campaign_territory', '')}")
        st.write(f"**Core message:** {package.get('core_message', '')}")
    with second:
        st.markdown("#### Approval queue")
        for item in package.get("approval_queue", []):
            st.checkbox(item, value=False, disabled=True)
        st.info(f"**Next best action:** {package.get('next_best_action', '')}")
    st.markdown("#### Content system")
    for item in package.get("content_plan", []):
        with st.expander(f"{item.get('channel', 'Channel')} · {item.get('format', 'Draft')}"):
            st.write(f"**Hook:** {item.get('hook', '')}")
            st.write(item.get("draft", ""))
    experiment = package.get("experiment", {})
    st.markdown("#### Controlled experiment")
    st.write(f"**Variable:** {experiment.get('variable', '')}")
    st.write(f"**A:** {experiment.get('variant_a', '')}")
    st.write(f"**B:** {experiment.get('variant_b', '')}")
    st.write(f"**Hold constant:** {experiment.get('hold_constant', '')}")
    st.write(f"**Success signal:** {experiment.get('success_signal', '')}")

st.divider()
st.subheader("Persistent campaign record")
runs = recent_campaign_runs()
if runs:
    st.dataframe(runs, use_container_width=True, hide_index=True)
else:
    st.caption("No campaign packages have been created in this local workspace yet.")
st.caption("AgencyOS prototype: outputs are drafts and recommendations. It does not perform live research, publish, buy media, or contact people without configured integrations and explicit approval rules.")
