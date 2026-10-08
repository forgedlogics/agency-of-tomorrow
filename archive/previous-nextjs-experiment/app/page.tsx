"use client";

import { FormEvent, useState } from "react";
import playbooks from "../public/data/agency-playbooks.json";

const teamRoles = [
  ["Strategy", "Clarifies the audience, tension, offer, and success measure."],
  ["Creative", "Turns the strategy into a single sharp campaign territory."],
  ["Copy", "Builds the message hierarchy, hooks, and channel language."],
  ["Media", "Chooses a focused channel mix and a testable first move."],
  ["Operations", "Creates the smallest accountable delivery plan."],
  ["Quality", "Checks brand fit, factual risk, and the approval gate."],
];

type Plan = { brief: string; audience: string; objective: string; preset: keyof typeof playbooks };

export default function Home() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [preset, setPreset] = useState<keyof typeof playbooks>("launch");
  const [saved, setSaved] = useState(false);

  function runSimulation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(false);
    setPlan({ brief: String(data.get("brief")), audience: String(data.get("audience")), objective: String(data.get("objective")), preset });
  }

  function saveScenario() {
    if (!plan) return;
    localStorage.setItem("agency-of-tomorrow-last-brief", JSON.stringify(plan));
    setSaved(true);
  }

  return <main className="agency-shell">
    <section className="hero-grid"><div className="hero-copy"><p className="eyebrow">Speculative operating model · v1</p><h1>An agency that learns its way into better work.</h1><p className="lede">Agency of Tomorrow is a marketing-agency simulator. A brief enters the system, specialized AI roles shape the work, and a human stays responsible for the decisions that require judgment.</p><div className="metric-row"><div><strong>6</strong><span>specialist roles</span></div><div><strong>1</strong><span>human approval gate</span></div><div><strong>1</strong><span>shared brief</span></div></div></div><aside className="hero-panel"><p className="panel-label">The principle</p><h2>AI handles coordination. People protect the point of view.</h2><p>This model is not about automating taste. It is about making strategy, creative development, and campaign operations more legible and accountable.</p><a className="primary-action" href="#simulator">Try a brief</a></aside></section>
    <section className="simulator" id="simulator"><div className="simulator-intro"><p className="eyebrow">Interactive prototype</p><h2>Run a brief through the agency.</h2><p>Use a real idea or a fictional client. This version demonstrates workflow and decision logic—not a live AI integration.</p></div><form onSubmit={runSimulation} className="brief-form"><label>Campaign playbook<select value={preset} onChange={(event) => setPreset(event.target.value as keyof typeof playbooks)}>{Object.entries(playbooks).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}</select></label><label>Campaign brief<textarea name="brief" required defaultValue={playbooks.launch.default_brief} /></label><label>Audience<input name="audience" required placeholder="Design-conscious women, 22–34" /></label><label>Primary objective<select name="objective" defaultValue="Build qualified interest"><option>Build qualified interest</option><option>Drive product discovery</option><option>Grow email sign-ups</option><option>Convert returning visitors</option></select></label><button type="submit" className="primary-action">Run simulation</button></form><section className="plan-output" aria-live="polite">{plan ? <><p className="panel-label">Agency response · {playbooks[plan.preset].label}</p><h3>{plan.brief}</h3><div className="response-grid"><article><span>Strategy</span><p>Frame the campaign around a specific tension for {plan.audience}: make the collection feel like a point of view, not simply a product release.</p></article><article><span>Creative</span><p>Develop one recognizable visual world and three repeatable content expressions around the core material or insight.</p></article><article><span>Media</span><p>{playbooks[plan.preset].media}</p></article><article><span>Success signal</span><p>Primary KPI: {playbooks[plan.preset].kpi}. Test whether the work can {plan.objective.toLowerCase()} before widening the mix.</p></article><article><span>Risk check</span><p>{playbooks[plan.preset].risk}</p></article><article><span>Human approval</span><p>Approve the strategic territory, the first creative route, and any final claim before publishing.</p></article></div><button type="button" className="save-action" onClick={saveScenario}>{saved ? "Scenario saved in this browser" : "Save scenario"}</button></> : <p className="empty">Fill in the brief to see how the six roles translate it into an accountable first move.</p>}</section></section>
    <section className="workflow-section"><p className="eyebrow">Operating model</p><h2>One brief. Clear handoffs. Visible responsibility.</h2><ol className="workflow-grid"><li><b>01</b><span>Brief</span><p>A founder or account lead defines the goal, constraints, offer, and deadline.</p></li><li><b>02</b><span>Plan</span><p>Strategy and creative create a proposed direction before production starts.</p></li><li><b>03</b><span>Produce</span><p>Copy, media, and operations make the work executable across channels.</p></li><li><b>04</b><span>Learn</span><p>Quality review records what performed, what failed, and what changes next time.</p></li></ol></section>
    <section className="teams-section"><p className="eyebrow">Team boundaries</p><h2>Every agent has a job—and a limit.</h2><div className="team-grid">{teamRoles.map(([role, description]) => <article className="team-card" key={role}><h3>{role} Agent</h3><p>{description}</p></article>)}</div></section>
    <section className="closing-panel"><div><p className="eyebrow">Portfolio case study</p><h2>A future-facing marketing model, designed as a working interface.</h2></div><p>Agency of Tomorrow explores how human judgment, specialized AI roles, and a shared record of decisions can make an inexperienced team more structured without making it generic.</p></section>
  </main>;
}
