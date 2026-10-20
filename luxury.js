"use strict";
const Luxury = (() => {
  const sources = [
    ["McKinsey • State of Luxury, June 2026", "https://www.mckinsey.com/industries/retail/our-insights/state-of-luxury"],
    ["Jewel360 • Independent jewelry report, 2026", "https://jewel360.com/jewelry-industry-report-2026"],
    ["D-EDGE • Hotel distribution report, 2025", "https://www.d-edge.com/2025-hotel-direct-distribution-report/"]
  ];
  const niches = [
    {name:"Independent fine jewelry", audience:"Collectors and milestone buyers seeking distinctive design and personal guidance", gap:"Social interest can get lost before a private appointment. Craftsmanship needs a clear story, credible proof, and a human next step.", offer:"Private design consultation with a curated selection", pilot:"Build one appointment landing page, a craft story, and a three-message follow-up sequence for opted-in inquiries.", metric:"Qualified appointments → attended visits → gross profit from sales", evidence:"Jewel360’s survey of 117 respondents reports strong social influence alongside predominantly in-person closing. This is directional vendor research, not a luxury-only market census.", source:1, fit:"Best starting fit • jewelry + CAD knowledge", proof:"Real process photography, verified materials, maker credentials and client-approved stories"},
    {name:"Heirloom redesign studios", audience:"Owners of inherited or unworn jewelry who want a meaningful new piece", gap:"Customers may not understand the redesign process or trust a studio with a sentimental piece. Generic product posts do little to answer these concerns.", offer:"Heirloom design discovery appointment", pilot:"Create an approved before/process/after case study, explain intake and estimates, and invite existing consenting customers to a consultation.", metric:"Consultations → approved estimates → contribution profit", evidence:"Jewel360 reports rising custom requests and substantial remaking work in its independent-jeweler sample. Demand for an agency still needs validation with owners.", source:1, fit:"Strong specialty • production knowledge matters", proof:"Client-approved case study, process milestones, written estimate and care handling"},
    {name:"Boutique luxury hotels", audience:"Past guests and experience-led travelers considering a return stay", gap:"Third-party booking dependence can weaken margins and the direct guest relationship.", offer:"A curated direct-booking experience with a clear guest benefit", pilot:"Audit mobile booking, clarify direct-booking benefits, and test a consented past-guest email against a holdout.", metric:"Incremental direct bookings and contribution after distribution costs", evidence:"D-EDGE’s Europe/APAC distribution research finds a cost advantage for direct bookings. Its customer results are not a forecast for any individual property.", source:2, fit:"Second vertical • requires booking-system access", proof:"Real guest experience, accurate availability, transparent terms and verified reviews"},
    {name:"Emerging luxury accessories", audience:"Design-led buyers attracted to distinctive identity and personal service", gap:"A premium price needs a recognizable point of view and evidence beyond polished imagery.", offer:"Private collection preview and styling appointment", pilot:"Build a founder/craft narrative, accurate product FAQs, and an invitation sequence with one trackable response route.", metric:"Qualified inquiries, preview attendance and first-order contribution", evidence:"McKinsey’s US/China client research highlights emotional connection, access and evolving discovery. This niche is a hypothesis, not proof of unmet agency demand.", source:0, fit:"Adjacent opportunity • validate after jewelry", proof:"Documented construction, provenance and specific design decisions"}
  ];
  const fields = [
    ["brandName","Client / brand"], ["target","Target: customer need + transaction signal"],
    ["benefit","Benefit: why this matters to the customer"], ["support","Support: verified proof and its source"],
    ["character","Character: voice and visual direction"], ["cta","CTA: one measurable next action"],
    ["offer","Offer: value through service or access"], ["dataSource","Data source and permission basis"],
    ["segment","Selection: RFM / behavior rule and exclusions"], ["journey","Journey: discovery → inquiry → appointment → follow-up"],
    ["automation","CRM flow: trigger, owner, delay and stop condition"],
    ["test","Test: one variable, random holdout, success metric and time window"],
    ["url","Response destination: working https URL"], ["campaign","Tracking campaign name"],
    ["nextLesson","Next course insight to apply (optional)"]
  ];
  const numbers = [["aov","Average order value ($)",3000],["margin","Gross margin (%)",50],["orders","Expected orders / customer / year",1],["years","Relationship horizon (years)",3],["discount","Annual discount rate (%)",10],["acquisition","Acquisition cost / customer ($)",200],["spend","Campaign cost ($)",1500],["tn","Treatment group size",100],["tc","Treatment conversions",10],["cn","Control group size",100],["cc","Control conversions",5]];
  function economics(v) {
    const n = k => Number(v[k]);
    if (numbers.some(([k]) => !Number.isFinite(n(k)) || n(k)<0) || n('margin')>100 || n('years')<1 || !Number.isInteger(n('years')) || n('years')>50 || n('tn')<1 || n('cn')<1 || ['tn','tc','cn','cc'].some(k=>!Number.isInteger(n(k))) || n('tc')>n('tn') || n('cc')>n('cn')) throw Error('Use valid nonnegative inputs, margin ≤ 100%, whole group counts, conversions ≤ group size, and a horizon of 1–50 whole years.');
    const profit=n('aov')*n('margin')/100;
    let ltv=-n('acquisition');
    for(let year=1;year<=n('years');year++) ltv+=profit*n('orders')/((1+n('discount')/100)**year);
    const lift=n('tc')/n('tn')-n('cc')/n('cn');
    const incremental=lift*n('tn');
    return {profit,ltv,lift,incremental,net:incremental*profit-n('spend'),breakEven:profit>0?Math.ceil(n('spend')/profit):null,roi:n('spend')>0?(incremental*profit-n('spend'))/n('spend'):null};
  }
  function render(main, saved, hooks) {
    const e=hooks.escape;
    const v={niche:'0',...Object.fromEntries(numbers.map(([k,,d])=>[k,String(d)])),...saved};
    const index=/^[0-3]$/.test(v.niche)?Number(v.niche):0;
    const chosen=niches[index];
    const field=(k,label)=>`<label>${label}<textarea name="${k}" maxlength="2000">${e(v[k]||'')}</textarea></label>`;
    main.innerHTML=`<section class="hero"><div><span class="eyebrow">LUXURY GROWTH LAB</span><h2>Make craftsmanship lead to a conversation.</h2><p>Start with independent fine jewelry. Build a measurable path from discovery to private appointments, then nurture the relationship.</p><p class="muted">Research reviewed October 20, 2026. These are opportunities to validate with buyers and business owners.</p></div></section>
    <form id="luxuryForm"><section class="card"><h2>1. Choose your specialty</h2><label>Niche<select name="niche">${niches.map((n,i)=>`<option value="${i}" ${i===index?'selected':''}>${n.name}</option>`).join('')}</select></label><div id="nicheDetail"></div><button type="button" class="secondary" id="applyNiche">Use this playbook in my brief</button></section>
    <section class="card"><h2>2. Build the direct-response brief</h2><p class="muted">TBSCCO + database, offer, creative and accountability. Use actual customer evidence; demographic assumptions alone do not establish intent.</p><div class="form-grid">${fields.map(([k,l])=>field(k,l)).join('')}</div></section>
    <section class="card"><h2>3. Check the economics</h2><p class="muted">Illustrative inputs. Discounted gross-profit LTV assumes stable annual orders paid at year-end; it excludes retention decay, service and overhead costs. Compare randomized treatment and control over the same period.</p><div class="form-grid">${numbers.map(([k,l])=>`<label>${l}<input type="number" min="0" step="any" name="${k}" value="${e(v[k])}" required></label>`).join('')}</div><button type="button" class="secondary" id="calculateLuxury">Calculate results</button><div id="luxuryResults" aria-live="polite"></div></section>
    <div class="actions"><button class="primary" type="submit">Save strategy</button><button class="secondary" type="button" id="luxuryCampaign">Create campaign from strategy</button><button class="secondary" type="button" id="luxuryExport">Download strategy</button></div><p id="luxuryStatus" role="status"></p></form>
    <section class="card"><h2>DIM → practical software</h2><p>Based on your Fall 2026 DM-300 syllabus and lecture notes through October 14. Future topics are planned applications; course content may change.</p><div class="luxury-roadmap">${[
      ['Covered in notes','Customer database, RFM, segmentation, personas','Define a behavioral selection rule; suppress ineligible contacts and existing purchasers where appropriate.'],
      ['Covered in notes','TBSCCO, offers, direct mail and CRM','Connect one offer to one response route. Draft welcome, appointment and reactivation flows with human ownership.'],
      ['Syllabus coverage','DIM math, LTV, present value, CPM/CPC and media','Use the profit calculator here; compare cost per qualified appointment before increasing a media budget.'],
      ['Upcoming syllabus','Privacy, AI and automation','Record data source, purpose, permissions, opt-out and retention rules; review jurisdiction-specific requirements before execution.'],
      ['Upcoming syllabus','Fulfillment and CRM automation','Specify service owner, response time, fulfillment steps and stop conditions before connecting a CRM.'],
      ['Upcoming syllabus','Integrated ads, email and team delivery','Run a measured pilot, maintain a control group, assign owners and present results with limitations.']
    ].map(([s,t,a])=>`<article><span class="badge">${s}</span><h3>${t}</h3><p>${a}</p></article>`).join('')}</div><p class="muted">Planning tools only: no ads, email sending, customer-data upload or live CRM connection. Add new lesson insights to your strategy as the course progresses.</p></section>
    <section class="card"><h2>Research desk</h2><p>Sector evidence suggests where to investigate; it does not prove an individual brand has a weakness or will hire an agency.</p>${sources.map(([title,url])=>`<p><a href="${url}" target="_blank" rel="noopener noreferrer">${title} ↗</a></p>`).join('')}</section>`;
    const form=main.querySelector('#luxuryForm');
    const read=()=>Object.fromEntries(new FormData(form));
    const message=t=>main.querySelector('#luxuryStatus').textContent=t;
    function detail(){const n=niches[Number(form.elements.niche.value)];main.querySelector('#nicheDetail').innerHTML=`<span class="badge">${n.fit}</span><h3>Gap to investigate</h3><p>${n.gap}</p><h3>30-day pilot</h3><p>${n.pilot}</p><p><b>Measure:</b> ${n.metric}</p><p class="muted">${n.evidence} <a href="${sources[n.source][1]}" target="_blank" rel="noopener noreferrer">Source ↗</a></p>`;}
    form.elements.niche.onchange=detail; detail();
    main.querySelector('#applyNiche').onclick=()=>{const n=niches[Number(form.elements.niche.value)]; for(const [k,val] of Object.entries({target:n.audience,benefit:'Personal guidance and confidence in a considered purchase',support:n.proof,character:'Discreet, precise and warm; use real craft details',cta:n.offer,offer:n.offer,journey:n.pilot,segment:'Select relevant opted-in inquiries; exclude opt-outs and people already booked',automation:'New opted-in inquiry → adviser review within one business day → personal follow-up → stop on reply, booking or opt-out',test:'Randomize eligible contacts into treatment and holdout; test the invitation; compare qualified appointments and contribution over 30 days'})) form.elements[k].value=val; message('Playbook copied. Edit the assumptions and add verified brand evidence, permissions and a working response URL.');};
    main.querySelector('#calculateLuxury').onclick=()=>{try{const r=economics(read());const money=n=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});main.querySelector('#luxuryResults').innerHTML=`<div class="stats"><div class="stat">Discounted profit LTV<strong>${money(r.ltv)}</strong></div><div class="stat">Conversion lift<strong>${(r.lift*100).toFixed(1)} pp</strong></div><div class="stat">Incremental campaign profit<strong>${money(r.net)}</strong></div></div><p>Estimated incremental orders: ${r.incremental.toFixed(1)} · Break-even incremental orders: ${r.breakEven??'Unavailable at zero margin'} · Incremental ROI: ${r.roi===null?'Unavailable at zero cost':(r.roi*100).toFixed(1)+'%'}</p><p class="muted">Descriptive estimate, not a statistical significance result or guaranteed revenue. Conversion must mean a completed order for these profit figures to apply.</p>`;}catch(err){main.querySelector('#luxuryResults').textContent=err.message;}};
    form.onsubmit=ev=>{ev.preventDefault();try{hooks.save(read());message('Strategy saved on this browser. Included in workspace backup.');}catch(err){message(err.message);}};
    main.querySelector('#luxuryExport').onclick=()=>hooks.download('agencyos-luxury-strategy.json',JSON.stringify(read(),null,2));
    main.querySelector('#luxuryCampaign').onclick=()=>{const d=read(); if(['brandName','target','benefit','support','cta','offer','url','dataSource'].some(k=>!d[k]?.trim())){message('Complete brand, target, benefit, proof, CTA, offer, data permissions and response URL first.');return;}
      let url;try{url=new URL(d.url);if(url.protocol!=='https:')throw Error();}catch{message('Use a valid https response URL.');return;}
      url.searchParams.set('utm_source','agencyos');url.searchParams.set('utm_medium','email');url.searchParams.set('utm_campaign',d.campaign||'private-appointment');
      try{hooks.save(d);hooks.campaign(d,url.href);}catch(err){message(err.message);}};
  }
  return {render,economics,niches};
})();
if(typeof module!=='undefined') module.exports=Luxury;
