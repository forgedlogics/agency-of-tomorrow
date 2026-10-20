"use strict";
const KEY = "agencyos.workspace.v1";
const $ = (s) => document.querySelector(s);
const escapeHTML = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function validWorkspace(data) {
  const string = (v) => typeof v === "string";
  return (
    data &&
    (!data.luxury || (typeof data.luxury === "object" && !Array.isArray(data.luxury) && Object.values(data.luxury).every(string))) &&
    data.brand &&
    typeof data.brand === "object" &&
    !Array.isArray(data.brand) &&
    Object.values(data.brand).every(string) &&
    Array.isArray(data.campaigns) &&
    data.campaigns.every(
      (c) =>
        c &&
        [
          "id",
          "name",
          "brand",
          "goal",
          "audience",
          "date",
          "strategy",
          "engine",
        ].every((k) => string(c[k])) &&
        Array.isArray(c.checks) &&
        c.checks.length === 3 &&
        c.checks.every((v) => typeof v === "boolean") &&
        Array.isArray(c.items) &&
        c.items.length > 0 &&
        c.items.every(
          (i) =>
            i &&
            ["channel", "hook", "draft", "date"].every((k) => string(i[k])) &&
            /^\d{4}-\d{2}-\d{2}$/.test(i.date) &&
            typeof i.approved === "boolean",
        ),
    )
  );
}
let state = { brand: {}, campaigns: [] },
  view = "overview",
  selected = null;
let planningReady = false;
const endpoint = (window.AGENCYOS_API_URL || "").replace(/\/$/, "");
try {
  const stored = JSON.parse(localStorage.getItem(KEY));
  if (stored) {
    if (!validWorkspace(stored)) throw Error("Invalid workspace");
    state = stored;
  }
} catch {
  announce(
    "Saved workspace could not be read. Export a backup before closing this page.",
  );
}
function announce(message) {
  $("#notice").textContent = message;
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    announce(
      "Browser storage is unavailable or full. Export your workspace to keep changes.",
    );
    return false;
  }
}
function download(name, data, type = "application/json") {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function status(c) {
  return c.items.every((i) => i.approved) && c.checks.every(Boolean)
    ? "Ready for publishing review"
    : "In progress";
}
function card(c) {
  return `<article class="card"><span class="badge">${escapeHTML(status(c))}</span><h3>${escapeHTML(c.name)}</h3><p>${escapeHTML(c.brand)} · ${escapeHTML(c.date)}</p><p>${escapeHTML(c.goal)}</p><div class="row"><span class="muted">${c.items.filter((i) => i.approved).length}/${c.items.length} drafts reviewed</span><button class="secondary" data-open="${escapeHTML(c.id)}">Open ↗</button></div></article>`;
}
function show(next) {
  view = next;
  selected = null;
  render();
}
function render() {
  document
    .querySelectorAll("nav button")
    .forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  $("#pageTitle").textContent = {
    overview: "Overview",
    campaigns: "Campaigns",
    calendar: "Content calendar",
    brand: "Brand profile",
    luxury: "Luxury growth",
  }[view];
  const main = $("#main");
  if (selected) {
    renderDetail();
    return;
  }
  if (view === "overview")
    main.innerHTML = `<section class="hero"><div><span class="eyebrow">A LITTLE STRUCTURE. A LOT MORE MOMENTUM.</span><h2>Your next great campaign starts here.</h2><p>Turn your business brief into a focused plan, shape the content, and keep every draft moving toward review.</p><button class="primary" data-new>Build a campaign →</button></div><div class="hero-mark" aria-hidden="true">✳</div></section><div class="stats"><div class="stat">Campaigns<strong>${state.campaigns.length}</strong></div><div class="stat">Drafts to review<strong>${state.campaigns.flatMap((c) => c.items).filter((i) => !i.approved).length}</strong></div><div class="stat">Reviewed drafts<strong>${state.campaigns.flatMap((c) => c.items).filter((i) => i.approved).length}</strong></div></div><div class="row"><h2>Recent campaigns</h2><button class="quiet" data-view="campaigns">View all →</button></div><div class="cards">${state.campaigns.slice(0, 3).map(card).join("")}</div>${!state.campaigns.length ? '<div class="empty"><h3>A clean slate for your next idea.</h3><p>Create your first campaign with your own brief, or explore an example.</p><button class="secondary" id="example">Load jewelry example</button></div>' : ""}`;
  if (view === "campaigns")
    main.innerHTML = `<input class="filter" id="search" aria-label="Search campaigns" placeholder="Search campaigns…"><div class="cards" id="campaignCards">${state.campaigns.map(card).join("")}</div>${!state.campaigns.length ? '<div class="empty">No campaigns yet. Start with “New campaign”.</div>' : ""}`;
  if (view === "calendar") {
    const entries = state.campaigns
      .flatMap((c) => c.items.map((i) => ({ c, i })))
      .sort((a, b) => a.i.date.localeCompare(b.i.date));
    main.innerHTML =
      '<p class="muted">Your planned content dates. Nothing is posted automatically.</p>' +
      (entries.length
        ? entries
            .map(
              ({ c, i }) =>
                `<article class="calendar-item"><span class="badge">${escapeHTML(i.date)}</span><div><strong>${escapeHTML(c.name)}</strong><span class="muted">${escapeHTML(i.channel)} · ${escapeHTML(i.hook)}</span></div><button class="secondary" data-open="${escapeHTML(c.id)}">${i.approved ? "Reviewed" : "Review draft"} ↗</button></article>`,
            )
            .join("")
        : '<div class="empty">Create a campaign to start planning content.</div>');
  }
  if (view === "luxury") Luxury.render(main, state.luxury || {}, {
    escape: escapeHTML, download,
    save: (data) => { state.luxury = data; if (!save()) throw Error("Storage unavailable. Download the strategy to keep it."); },
    campaign: (d, url) => {
      const c = { id: crypto.randomUUID(), name: d.campaign || "Private appointment pilot", brand: d.brandName,
        goal: d.cta, audience: d.target, date: new Date().toISOString().slice(0,10), engine: "starter",
        strategy: `Benefit: ${d.benefit}\nProof: ${d.support}\nVoice: ${d.character}\nSelection: ${d.segment}\nPermissions: ${d.dataSource}\nJourney: ${d.journey}\nCRM: ${d.automation}`,
        nextAction: d.test || "Set a randomized holdout and agree on a success metric before sending.", checks: [false,false,false],
        items: [{channel:"Email",hook:d.offer,draft:`Subject: ${d.offer}\n\n[Personalize with a verified customer preference.]\n\n${d.benefit}\n\n[Add verified evidence: ${d.support}]\n\n${d.cta}: ${url}\n\n[Add sender identity and opt-out details before sending.]`,date:new Date().toISOString().slice(0,10),approved:false}] };
      state.campaigns.unshift(c); save(); view="campaigns"; selected=c.id; render(); announce("Luxury pilot created as an editable starter draft.");
    }
  });
  if (view === "brand")
    main.innerHTML = `<form id="brandForm" class="card profile"><span class="eyebrow">THE CONTEXT BEHIND YOUR CONTENT</span><h2>Make it sound like you.</h2><p class="muted">These details prefill new briefs. Your rules also go to the AI planner when connected.</p>${[
      ["brand", "Business / brand"],
      ["offer", "Your product or service"],
      ["audience", "Your ideal customer"],
    ]
      .map(
        ([k, l]) =>
          `<label>${l}<input name="${k}" value="${escapeHTML(state.brand[k] || "")}" maxlength="300"></label>`,
      )
      .join(
        "",
      )}<label>Voice, facts, and brand rules<textarea name="rules" maxlength="2000">${escapeHTML(state.brand.rules || "")}</textarea></label><button class="primary">Save brand profile</button></form>`;
}
function renderDetail() {
  const c = state.campaigns.find((c) => c.id === selected);
  if (!c) {
    selected = null;
    render();
    return;
  }
  $("#pageTitle").textContent = c.name;
  $("#main").innerHTML =
    `<button class="quiet" data-view="campaigns">← All campaigns</button><div class="row"><p class="muted">${escapeHTML(c.brand)} · ${escapeHTML(c.engine === "ai" ? "AI-generated drafts" : "Starter templates — not AI-generated")}</p><span class="badge" id="campaignStatus">${escapeHTML(status(c))}</span></div><div class="detail-grid"><section><h2>Shape the story.</h2>${c.items.map((i, n) => `<article class="content-item"><div class="row"><h3>${escapeHTML(i.channel)}</h3><span class="badge" data-item-status="${n}">${i.approved ? "REVIEWED" : "DRAFT"}</span></div><label>Hook<input data-item="${n}" data-field="hook" value="${escapeHTML(i.hook)}" maxlength="500"></label><label>Content<textarea data-item="${n}" data-field="draft" maxlength="10000">${escapeHTML(i.draft)}</textarea></label><div class="form-grid"><label>Planned date<input type="date" data-item="${n}" data-field="date" value="${escapeHTML(i.date)}" required></label><label class="check"><input type="checkbox" data-item="${n}" data-field="approved" ${i.approved ? "checked" : ""}> Mark draft reviewed</label></div></article>`).join("")}</section><aside><div class="card"><span class="eyebrow">THE DIRECTION</span><h2>Campaign brief</h2><p>${escapeHTML(c.goal)}</p><h3>Audience</h3><p class="muted">${escapeHTML(c.audience)}</p><h3>Working hypothesis</h3><p class="muted">${escapeHTML(c.strategy)}</p><h3>Next step</h3><p class="muted">${escapeHTML(c.nextAction || "Review the drafts, verify claims, and choose where to publish.")}</p>${c.coreMessage ? `<h3>Core message</h3><p class="muted">${escapeHTML(c.coreMessage)}</p>` : ""}${c.experiment ? `<h3>Test one thing</h3><p class="muted">${escapeHTML(c.experiment.variable)}</p><p class="muted"><b>A:</b> ${escapeHTML(c.experiment.variant_a)}<br><b>B:</b> ${escapeHTML(c.experiment.variant_b)}</p><p class="muted">Keep constant: ${escapeHTML(c.experiment.hold_constant)}<br>Success signal: ${escapeHTML(c.experiment.success_signal)}</p>` : ""}</div><div class="card" style="margin-top:18px"><h3>Final review</h3>${["Verify product details and public claims", "Review creative and brand voice", "Confirm channel, consent, and any budget"].map((s, n) => `<label class="check"><input type="checkbox" data-check="${n}" ${c.checks[n] ? "checked" : ""}>${s}</label>`).join("")}<p class="muted">Review tracking only. No publishing or spending integrations are connected.</p></div></aside></div><div class="actions"><button class="secondary" id="exportCampaign">Download campaign</button><button class="quiet danger" id="deleteCampaign">Delete campaign</button></div>`;
}
function openDialog(example = false) {
  const form = $("#campaignForm");
  form.reset();
  for (const k of ["brand", "offer", "audience"])
    form.elements[k].value = state.brand[k] || "";
  form.elements.date.value = today();
  form.elements.engine.value = planningReady ? "ai" : "starter";
  $("#engineStatus").textContent = planningReady
    ? "AI planning is connected. Your brief will be sent to the planning service when you create this campaign."
    : endpoint
      ? "The AI service is waking up or unavailable. Starter templates work immediately."
      : "Starter templates work immediately. AI planning will be available when the service is connected.";
  if (example) {
    Object.entries({
      name: "Meet the maker",
      brand: "Aster Jewelry",
      offer: "A new handcrafted jewelry collection",
      audience: "Design-conscious customers interested in materials and craft",
      goal: "Invite interested customers to join the collection waitlist",
    }).forEach(([k, v]) => (form.elements[k].value = v));
  }
  $("#formError").textContent = "";
  $("#campaignDialog").showModal();
}
function starter(b) {
  return {
    strategy: `Test whether explaining ${b.offer} clearly to ${b.audience} helps achieve: ${b.goal}. Compare responses before expanding the campaign.`,
    items: [
      {
        channel: b.channel,
        hook: `A closer look at ${b.offer}`,
        draft: `Meet ${b.brand}. We are introducing ${b.offer} for ${b.audience}.\n\n[Add a verified product detail and the story behind it.]\n\nWant to learn more? [Add your next step or link.]`,
      },
      {
        channel: "Email",
        hook: `Discover what is next from ${b.brand}`,
        draft: `Subject: A closer look at ${b.offer}\n\nHello,\n\nWe wanted to share what we are working on at ${b.brand}: ${b.offer}.\n\n[Explain the benefit using verified facts.]\n\n[Add a clear invitation and working link.]`,
      },
      {
        channel: b.channel,
        hook: "The story behind the work",
        draft: `What goes into ${b.offer}?\n\n[Share a real process, design decision, or customer question.]\n\nFrom ${b.brand}. [Add a relevant call to action.]`,
      },
    ],
  };
}
$("#newCampaign").onclick = () => openDialog();
$("#closeDialog").onclick = () => $("#campaignDialog").close();
document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.view) show(b.dataset.view);
  if (b.dataset.open) {
    selected = b.dataset.open;
    view = "campaigns";
    render();
  }
  if (b.hasAttribute("data-new")) openDialog();
  if (b.id === "example") openDialog(true);
  if (
    b.id === "deleteCampaign" &&
    confirm("Delete this campaign and its drafts?")
  ) {
    state.campaigns = state.campaigns.filter((c) => c.id !== selected);
    save();
    show("campaigns");
  }
  if (b.id === "exportCampaign") {
    const c = state.campaigns.find((c) => c.id === selected);
    download(
      "agencyos-campaign.txt",
      `${c.name}\n${c.brand}\nGoal: ${c.goal}\nAudience: ${c.audience}\n\n${c.strategy}\n\n${c.items.map((i) => `${i.date} · ${i.channel}\n${i.hook}\n${i.draft}`).join("\n\n---\n\n")}`,
      "text/plain",
    );
  }
});
function updateDraft(el) {
  const c = state.campaigns.find((c) => c.id === selected);
  if (!c) return;
  if (el.dataset.item !== undefined) {
    const item = c.items[Number(el.dataset.item)];
    if (el.dataset.field === "date" && !el.value) {
      announce("Choose a valid planned date.");
      return;
    }
    item[el.dataset.field] = el.type === "checkbox" ? el.checked : el.value;
    if (["hook", "draft"].includes(el.dataset.field)) {
      item.approved = false;
      c.checks = [false, false, false];
      document
        .querySelectorAll("[data-check]")
        .forEach((check) => (check.checked = false));
      const approved = document.querySelector(
        `[data-item="${el.dataset.item}"][data-field="approved"]`,
      );
      if (approved) approved.checked = false;
    }
    const badge = document.querySelector(
      `[data-item-status="${el.dataset.item}"]`,
    );
    if (badge) badge.textContent = item.approved ? "REVIEWED" : "DRAFT";
  }
  if (el.dataset.check !== undefined)
    c.checks[Number(el.dataset.check)] = el.checked;
  $("#campaignStatus").textContent = status(c);
  save();
}
document.addEventListener("change", (e) => {
  if (
    e.target.matches('[data-field="date"],[data-field="approved"],[data-check]')
  )
    updateDraft(e.target);
});
document.addEventListener("input", (e) => {
  if (e.target.matches('[data-field="hook"],[data-field="draft"]'))
    updateDraft(e.target);
});
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    $("#campaignCards").innerHTML =
      state.campaigns
        .filter((c) =>
          (c.name + " " + c.brand + " " + c.goal)
            .toLowerCase()
            .includes(e.target.value.toLowerCase()),
        )
        .map(card)
        .join("") || '<p class="muted">No matching campaigns.</p>';
  }
});
document.addEventListener("submit", (e) => {
  if (e.target.id === "brandForm") {
    e.preventDefault();
    state.brand = Object.fromEntries(new FormData(e.target));
    if (save()) announce("Brand profile saved.");
  }
});
$("#campaignForm").onsubmit = async (e) => {
  e.preventDefault();
  const b = Object.fromEntries(new FormData(e.target));
  const button = $("#createButton");
  button.disabled = true;
  button.textContent =
    b.engine === "ai" ? "Planning your campaign…" : "Creating campaign…";
  $("#formError").textContent = "";
  try {
    let result = starter(b);
    if (b.engine === "ai") {
      if (!endpoint)
        throw Error(
          "The AI server is not connected. Choose starter templates or configure AGENCYOS_API_URL.",
        );
      const response = await fetch(endpoint + "/plan-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...b, rules: state.brand.rules || "" }),
        signal: AbortSignal.timeout(120000),
      });
      const data = await response.json();
      if (!response.ok)
        throw Error(
          typeof data.detail === "string"
            ? data.detail
            : "The AI planner could not complete this request.",
        );
      if (
        !Array.isArray(data.content_plan) ||
        !data.content_plan.length ||
        data.content_plan.some(
          (i) =>
            !i ||
            ["channel", "hook", "draft"].some(
              (k) => typeof i[k] !== "string" || !i[k].trim(),
            ),
        )
      )
        throw Error(
          "The planner returned incomplete content. Please try again.",
        );
      result = {
        strategy: data.business_hypothesis || "",
        items: data.content_plan,
        coreMessage: data.core_message || "",
        experiment: data.experiment,
        nextAction: data.next_best_action || "",
      };
    }
    const campaign = {
      ...b,
      id: crypto.randomUUID(),
      created: new Date().toISOString(),
      strategy: String(result.strategy),
      coreMessage: String(result.coreMessage || ""),
      experiment: result.experiment || null,
      nextAction: String(result.nextAction || ""),
      checks: [false, false, false],
      items: result.items.map((i) => ({
        channel: i.channel || b.channel,
        hook: i.hook || "",
        draft: i.draft,
        date: b.date,
        approved: false,
      })),
    };
    state.campaigns.unshift(campaign);
    save();
    $("#campaignDialog").close();
    view = "campaigns";
    selected = campaign.id;
    render();
    announce("Campaign created. Edit the drafts to make them yours.");
  } catch (error) {
    $("#formError").textContent =
      error.name === "TimeoutError"
        ? "The planner took too long. Please try again; your brief is still here."
        : error.message;
  } finally {
    button.disabled = false;
    button.textContent = "Create campaign →";
  }
};
$("#backup").onclick = () =>
  download("agencyos-workspace.json", JSON.stringify(state, null, 2));
$("#import").onchange = async (e) => {
  try {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000000) throw Error("Backup is too large (maximum 5 MB).");
    const data = JSON.parse(await file.text());
    if (!validWorkspace(data))
      throw Error("This file is not a valid AgencyOS workspace backup.");
    if (
      !confirm(
        "Replace this browser workspace with the backup? Export your current workspace first if needed.",
      )
    )
      return;
    state = data;
    save();
    show("overview");
    announce("Workspace imported.");
  } catch (error) {
    announce(error.message);
  } finally {
    e.target.value = "";
  }
};
render();

if (endpoint) {
  fetch(endpoint + "/health", { signal: AbortSignal.timeout(60000) })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      planningReady = data.planning_ready === true;
    })
    .catch(() => {});
}
