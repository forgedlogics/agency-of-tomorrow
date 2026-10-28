"use strict";
const Growth = (() => {
  const escape = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const example = {
    target: 'Local shoppers considering a custom ring from an independent jeweler',
    benefit: 'Explore a custom ring around your occasion, preferences and budget.',
    support: 'To verify with the jeweler: approved examples, design process, materials and production capabilities.',
    character: 'Knowledgeable, thoughtful, precise',
    cta: 'Request a custom-ring consultation',
    offer: 'A custom-ring consultation; confirm availability, terms and any fee with the jeweler.',
    story: 'Show a real piece from initial sketch through CAD to the finished design, using approved assets.',
    discovery: 'A craft-focused Instagram post invites shoppers to explore a custom ring.',
    consideration: 'A matching landing page explains the process, verified examples and consultation expectations.',
    conversation: 'Collect occasion, jewelry type, budget range, stone preferences, inspiration and desired completion date.',
    handoff: 'The jeweler reviews requirements, confirms feasibility and provides the final quote.',
    followup: 'Assign an owner and reminder timing; stop on booking, reply requiring personal attention, or opt-out.',
    measurement: 'Record source, qualified inquiry, consultation booked and eventual sale using the same cohort and window.',
    research: '', competitors: '', insight: '', owner: '', window: '',
    inquiries: '', qualified: '', bookings: '', sales: '', revenue: '', cost: ''
  };
  function metrics(d) {
    const keys = ['inquiries','qualified','bookings','sales','revenue','cost'];
    if (keys.some(k => String(d[k] ?? '').trim() === '')) throw Error('Enter all six results, including 0 where applicable.');
    const n = Object.fromEntries(keys.map(k => [k, Number(d[k])]));
    if (keys.some(k => !Number.isFinite(n[k]) || n[k] < 0) || keys.slice(0,4).some(k => !Number.isSafeInteger(n[k]))) throw Error('Counts must be whole nonnegative numbers; money must be finite and nonnegative.');
    if (n.qualified > n.inquiries || n.bookings > n.qualified || n.sales > n.bookings) throw Error('Use one sequential cohort: inquiries ≥ qualified inquiries ≥ bookings ≥ sales.');
    return {qualification: n.inquiries ? n.qualified/n.inquiries*100 : null, booking: n.qualified ? n.bookings/n.qualified*100 : null, close: n.bookings ? n.sales/n.bookings*100 : null, costPerBooking: n.bookings ? n.cost/n.bookings : null, revenue: n.revenue};
  }
  function brief(d) {
    return `# Growth pilot brief\n\nWorking hypotheses; validate before presenting as proven results.\n\n` + [
      ['Target',d.target],['Benefit',d.benefit],['Support / verified evidence',d.support],['Brand character',d.character],['Call to action',d.cta],['Offer',d.offer],['Human story / approved creative',d.story],['Discovery',d.discovery],['Consideration',d.consideration],['Conversation / intake',d.conversation],['Human handoff',d.handoff],['Follow-up and stop conditions',d.followup],['Measurement definition',d.measurement],['Owner',d.owner],['Reporting window / cohort',d.window],['Three competitors',d.competitors],['Customer research notes (anonymized)',d.research],['Learning and next change',d.insight]
    ].map(([label,value]) => `## ${label}\n${value || 'To define'}\n`).join('\n') + '\n## Manually entered results\n' + ['inquiries','qualified','bookings','sales','revenue','cost'].map(k=>`${k}: ${d[k] || 'Not recorded'}`).join('\n');
  }
  function render(main, saved, hooks) {
    const d = {...Object.fromEntries(Object.keys(example).map(k=>[k,''])), ...saved};
    const field = (key,label) => `<label>${label}<textarea name="${key}" maxlength="10000">${escape(d[key])}</textarea></label>`;
    main.innerHTML = `<section class="hero"><div><span class="eyebrow">FROM ATTENTION TO CONSULTATION</span><h2>Give every campaign a next step.</h2><p>Define one offer, validate the customer problem, and connect the journey from discovery to a recorded sale.</p><button class="secondary" type="button" id="growthExample">Load jewelry pilot example</button></div></section>
    <form id="growthForm"><section class="card"><h2>1. Position the offer</h2><p>Use TBSCCO to keep your message consistent. Treat your initial positioning as a hypothesis.</p><div class="form-grid">${field('target','Target customer')}${field('benefit','Customer benefit')}${field('support','Support: evidence you can verify')}${field('character','Brand character')}${field('cta','Call to action')}${field('offer','Offer')}${field('story','Creative direction: a real story and approved product facts')}</div></section>
    <section class="card"><h2>2. Validate the problem</h2><p>Compare three competitors, then speak with 6–8 prospective customers. Ask what they use, what they pay, where inquiries get lost, and what is missing. Show the demo after discussing their current process; ask what they think it does and what they would change.</p><div class="form-grid">${field('competitors','Competitors: target, offer, pricing and your difference')}${field('research','Anonymized findings: problem, current process and willingness to pay')}</div></section>
    <section class="card"><h2>3. Connect the customer journey</h2><p>One consistent promise across channels. Keep final pricing, feasibility and product claims with the business owner.</p><div class="form-grid">${field('discovery','Discovery: channel, story and next step')}${field('consideration','Consideration: landing page and useful proof')}${field('conversation','Conversation: questions needed to guide the shopper')}${field('handoff','Human handoff: who takes over and when')}${field('followup','Follow-up: trigger, timing and stop conditions')}${field('measurement','Measurement: source and event definitions')}${field('owner','Pilot owner')}${field('window','Reporting period and cohort definition')}</div></section>
    <section class="card"><h2>4. Record what happened</h2><p>Manual counts for one cohort: each booking belongs to a qualified inquiry, and each sale follows a booking. Revenue is attributed revenue, not proof that the campaign caused the sale.</p><div class="form-grid">${[['inquiries','Total inquiries'],['qualified','Qualified inquiries'],['bookings','Consultations booked'],['sales','Completed sales'],['revenue','Attributed revenue ($)'],['cost','Total pilot cost ($)']].map(([k,l])=>`<label>${l}<input name="${k}" type="number" min="0" step="${['revenue','cost'].includes(k)?'0.01':'1'}" value="${escape(d[k])}"></label>`).join('')}</div><button class="secondary" type="button" id="growthMetrics">Calculate pilot results</button><p id="growthResults" role="status"></p>${field('insight','What did you learn, and what will you change?')}</section>
    <div class="actions"><button class="primary" type="submit">Save growth plan</button><button class="secondary" type="button" id="growthBrief">Download pilot brief</button><button class="secondary" type="button" id="growthChannels">Use positioning in Channel Studio</button></div><p id="growthStatus" role="status"></p><p class="muted">Plans save in this browser and workspace backups. Customer conversations, CRM events, publishing and analytics are not connected.</p></form>`;
    const form = main.querySelector('#growthForm');
    const read = () => Object.fromEntries(new FormData(form));
    const status = text => {main.querySelector('#growthStatus').textContent=text;};
    const persist = data => {if (!hooks.save(data)) throw Error('Browser storage unavailable. Download the pilot brief to keep your work.');};
    form.onsubmit = e => {e.preventDefault();try {persist(read());status('Growth plan saved and included in workspace backups.');} catch(e){status(e.message);}};
    main.querySelector('#growthExample').onclick = () => {
      if (Object.values(read()).some(v=>v.trim()) && !confirm('Replace the current growth plan fields with the jewelry example? Download your pilot brief first if needed.')) return;
      Object.entries(example).forEach(([k,v])=>{form.elements[k].value=v;});
      main.querySelector('#growthResults').textContent='';status('Illustrative jewelry pilot loaded. Edit and save; no results are claimed.');
    };
    main.querySelector('#growthBrief').onclick=()=>hooks.download('growth-pilot.md',brief(read()),'text/markdown');
    main.querySelector('#growthMetrics').onclick=()=>{
      const out=main.querySelector('#growthResults');
      try {const m=metrics(read()),pct=v=>v===null?'Not available':v.toFixed(1)+'%';out.textContent=`Qualification: ${pct(m.qualification)} · Qualified inquiry to booking: ${pct(m.booking)} · Booking to sale: ${pct(m.close)} · Cost per booking: ${m.costPerBooking===null?'Not available':'$'+m.costPerBooking.toFixed(2)} · Attributed revenue: $${m.revenue.toFixed(2)}`;} catch(e){out.textContent=e.message;}
    };
    main.querySelector('#growthChannels').onclick=()=>{
      const current=read();
      if (!current.target.trim() || !current.benefit.trim() || !current.cta.trim()) return status('Define the target, benefit and CTA before handing off.');
      if (!confirm('Replace the goal, headline, proof, CTA and test plan in Channel Studio with this positioning? Other channel fields will stay as they are.')) return;
      try {persist(current);hooks.channels({goal:current.benefit,headline:current.benefit,proof:current.support,cta:current.cta,test:`Target: ${current.target}\nOffer: ${current.offer}\nVoice: ${current.character}\nJourney: ${current.discovery} → ${current.consideration} → ${current.conversation}\nMeasure: ${current.measurement}`});}catch(e){status(e.message);}
    };
  }
  return {render,metrics,brief};
})();
if(typeof module!=='undefined')module.exports=Growth;
