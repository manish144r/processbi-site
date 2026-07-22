/* ── ProcessBI shared-nav.js — Light Premium Theme (AAA) ── */
(function(){
'use strict';

/* ───────────────────────────────────────────────
   1. Inject Three.js canvas (fixed background)
─────────────────────────────────────────────── */
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.insertBefore(canvas, document.body.firstChild);

/* ───────────────────────────────────────────────
   2. Logo SVG (inline, reusable)
   White dot hubs + deep-blue centre — reads on a light nav
─────────────────────────────────────────────── */
const LOGO_SVG = `<svg viewBox="0 0 132 120" xmlns="http://www.w3.org/2000/svg" width="42" height="38" aria-hidden="true" style="flex:none">
<defs>
  <linearGradient id="nl1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1A4AC2"/><stop offset="1" stop-color="#2E6BF6"/></linearGradient>
  <linearGradient id="nlt" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2E6BF6"/><stop offset="1" stop-color="#46D5FF"/></linearGradient>
  <linearGradient id="nln" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2E6BF6"/><stop offset="1" stop-color="#46D5FF"/></linearGradient>
  <filter id="ngl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <style>
    .nline{stroke-dasharray:none}
    .nhalo{transform-box:fill-box;transform-origin:center;animation:npulse 4.4s ease-in-out infinite}
    @keyframes npulse{0%,100%{opacity:.18}50%{opacity:.42}}
  </style>
</defs>
<rect class="nbar nb0" x="12" y="78" width="17" height="26" rx="6" fill="url(#nl1)"/>
<rect class="nbar nb1" x="37" y="60" width="17" height="44" rx="6" fill="url(#nl1)"/>
<rect class="nbar nb2" x="62" y="38" width="17" height="66" rx="6" fill="url(#nl1)"/>
<rect class="nbar nb3" x="87" y="16" width="17" height="88" rx="6" fill="url(#nlt)"/>
<path class="nline" d="M20.5 78 L45.5 60 L70.5 38 L95.5 16 L122 5" fill="none" stroke="url(#nln)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#ngl)"/>
<path class="narr" d="M122 5 L109 6.5 M122 5 L120.5 18" fill="none" stroke="#1A7FFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#ngl)"/>
<g class="nnode nn0"><circle class="nhalo" cx="20.5" cy="78" r="11" fill="#46D5FF"/><circle cx="20.5" cy="78" r="6.2" fill="#FFFFFF" stroke="#1A7FFF" stroke-width="3"/><circle cx="20.5" cy="78" r="2.6" fill="#054186"/></g>
<g class="nnode nn1"><circle class="nhalo" cx="45.5" cy="60" r="11" fill="#46D5FF"/><circle cx="45.5" cy="60" r="6.2" fill="#FFFFFF" stroke="#1A7FFF" stroke-width="3"/><circle cx="45.5" cy="60" r="2.6" fill="#054186"/></g>
<g class="nnode nn2"><circle class="nhalo" cx="70.5" cy="38" r="11" fill="#46D5FF"/><circle cx="70.5" cy="38" r="6.2" fill="#FFFFFF" stroke="#1A7FFF" stroke-width="3"/><circle cx="70.5" cy="38" r="2.6" fill="#054186"/></g>
<g class="nnode nn3"><circle class="nhalo" cx="95.5" cy="16" r="11" fill="#46D5FF"/><circle cx="95.5" cy="16" r="6.2" fill="#FFFFFF" stroke="#1A7FFF" stroke-width="3"/><circle cx="95.5" cy="16" r="2.6" fill="#054186"/></g>
</svg>`;

/* ───────────────────────────────────────────────
   3. Nav links config
─────────────────────────────────────────────── */
const NAV_LINKS = [
  {href:'index.html',    label:'Home'},
  {href:'services.html', label:'Services'},
  {href:'methodology.html', label:'Methodology'},
  {href:'case-studies.html', label:'Case Studies'},
  {href:'live-demos.html', label:'Demos'},
  {href:'about.html',   label:'About'},
  {href:'contact.html', label:'Contact'},
];

const currentPage = (location.pathname.split('/').pop()||'index.html');

function navLinkClass(href){
  return currentPage === href
    ? 'font-medium text-sm transition-colors nav-link-active'
    : 'text-sm transition-colors font-medium nav-link';
}

/* ───────────────────────────────────────────────
   4. Inject Nav (light theme, AAA)
─────────────────────────────────────────────── */
const DROPDOWNS = {
  'services.html': [{"cat":"Business Process Design","num":"01","desc":"Map, analyse and redesign how work flows.","items":[{"name":"End-to-End Process Mapping","href":"service-process-mapping.html"},{"name":"Gap Analysis & Root Cause","href":"service-gap-analysis.html"},{"name":"Future-State Design","href":"service-future-state.html"},{"name":"Process Benchmarking","href":"service-process-benchmarking.html"},{"name":"Lean Six Sigma Delivery","href":"service-lean-six-sigma.html"},{"name":"Governance & Standards","href":"service-governance-standards.html"}]},{"cat":"Business Intelligence & Analytics","num":"02","desc":"Instrument the optimised process.","items":[{"name":"Microsoft Fabric & OneLake Architecture","href":"service-fabric-onelake.html"},{"name":"Power BI Performance & Optimisation","href":"service-power-bi-optimisation.html"},{"name":"Real-Time Intelligence","href":"service-realtime-intelligence.html"},{"name":"Data Engineering & Pipelines","href":"service-data-engineering.html"},{"name":"Risk & Compliance Analytics","href":"service-risk-compliance.html"},{"name":"Fraud & Anomaly Detection","href":"service-fraud-anomaly.html"}]},{"cat":"Automation & AI","num":"03","desc":"The connective layer of agents and automation.","items":[{"name":"Power Automate & Workflow Automation","href":"service-power-automate.html"},{"name":"Copilot Studio & Multi-Agent Orchestration","href":"service-copilot-studio.html"},{"name":"RAG & Azure OpenAI","href":"service-rag-openai.html"},{"name":"ML Model Development","href":"service-ml-development.html"},{"name":"AI Readiness & Governance","href":"service-ai-readiness.html"},{"name":"Night Factory™ Managed Service","href":"service-night-factory.html"}]},{"cat":"Cloud & Data Platform","num":"04","desc":"The foundation everything runs on.","items":[{"name":"Azure Architecture","href":"service-azure-architecture.html"},{"name":"Microsoft 365 & SharePoint","href":"service-m365-sharepoint.html"},{"name":"Data Factory & Integration","href":"service-data-factory.html"},{"name":"Governance & Security","href":"service-governance-security.html"}]}],
  'case-studies.html': [{"cat":"Government","items":[{"name":"Enterprise Fabric Tenancy Governance","href":"case-fabric-tenancy-governance.html","kind":"case"},{"name":"Transport Data Platform Modernisation","href":"case-transport-platform.html","kind":"case"}]},{"cat":"Financial Services","items":[{"name":"Production Fraud Detection System","href":"case-fraud-detection-system.html","kind":"case"},{"name":"Customer Retention Hub","href":"case-retention-hub.html","kind":"case"},{"name":"Regulatory Reporting & Process Automation","href":"case-regulatory-reporting.html","kind":"case"},{"name":"Enterprise Risk Analytics Platform","href":"case-enterprise-risk-platform.html","kind":"case"},{"name":"Financial Portfolio Analysis","href":"case-financial-portfolio-analysis.html","kind":"case"},{"name":"Predictive Analytics in Financial Trading","href":"case-predictive-trading-analytics.html","kind":"case"},{"name":"Multi-Model Monte Carlo Testing","href":"case-monte-carlo-testing.html","kind":"case"},{"name":"Superannuation Fund Reporting","href":"case-superannuation-fund-reporting.html","kind":"case"},{"name":"Power BI Sales Dashboards","href":"case-power-bi-sales-dashboards.html","kind":"case"}]},{"cat":"Energy & Utilities","items":[{"name":"Fabric Migration & Medallion Architecture","href":"case-energy-fabric-medallion.html","kind":"case"},{"name":"Process Intelligence & Predictive Maintenance","href":"case-predictive-maintenance.html","kind":"case"},{"name":"Synapse → Databricks Migration","href":"case-synapse-databricks-migration.html","kind":"blueprint"}]},{"cat":"Manufacturing","items":[{"name":"Demand Forecasting ML Pipeline","href":"case-demand-forecasting-ml.html","kind":"case"},{"name":"Manufacturing Analytics Consolidation","href":"case-manufacturing-analytics.html","kind":"case"},{"name":"Quality Control Dashboards","href":"case-quality-control-dashboards.html","kind":"case"},{"name":"Integrated Quality Management System","href":"case-qms-blueprint.html","kind":"blueprint"},{"name":"Claims Management — High-Defect Industry","href":"case-claims-management-high-defect.html","kind":"blueprint"},{"name":"Waste Reduction in Fabric Printing","href":"case-waste-reduction-printing.html","kind":"blueprint"},{"name":"Statistical Process Design & DPMO","href":"case-statistical-process-design.html","kind":"blueprint"}]},{"cat":"Technology","items":[{"name":"Multi-Agent AI Operations Platform","href":"case-multi-agent-ai-platform.html","kind":"case"},{"name":"Azure Synapse → Microsoft Fabric Migration","href":"case-synapse-fabric-migration.html","kind":"case"},{"name":"On-Prem DWH Redesign & Multi-Cloud Automation","href":"case-on-prem-dwh-redesign.html","kind":"case"},{"name":"Service Operations & Document Analytics","href":"case-service-ops-doc-analytics.html","kind":"case"},{"name":"Power BI & Fabric Tenancy Optimisations","href":"case-fabric-tenancy-optimisation.html","kind":"blueprint"},{"name":"Live SPC Dashboard for AI Agents","href":"case-live-spc-ai-agents.html","kind":"blueprint"}]}]
};
const desktopLinks = NAV_LINKS.map(l=>{
  const hasDrop = DROPDOWNS[l.href];
  if(hasDrop){
    const groups = hasDrop.map(g=>{
      const items = g.items.map(it=>`<a href="${it.href}" class="dd-item">${it.name}</a>`).join('');
      return `<div class="dd-col"><div class="dd-col-h">${g.cat}</div>${items}</div>`;
    }).join('');
    const viewAllLabel = l.href==='services.html' ? 'View all services →' : 'View all selected work →';
    return `<div class="nav-drop-wrap"><a href="${l.href}" class="${navLinkClass(l.href)}" style="${currentPage===l.href?'color:#054186;font-weight:600':'color:#3A4A5F'}">${l.label}<svg class="dd-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:4px;vertical-align:middle;opacity:0.6"><path d="M6 9l6 6 6-6"/></svg></a><div class="nav-drop"><div class="nav-drop-inner">${groups}</div><div class="nav-drop-foot"><a href="${l.href}">${viewAllLabel}</a></div></div></div>`;
  }
  return `<a href="${l.href}" class="${navLinkClass(l.href)}" style="${currentPage===l.href?'color:#054186;font-weight:600':'color:#3A4A5F'}" onmouseover="this.style.color='#054186'" onmouseout="this.style.color='${currentPage===l.href?'#054186':'#3A4A5F'}'">${l.label}</a>`;
}).join('');
const mobileLinks  = NAV_LINKS.map(l=>`<a href="${l.href}" style="color:${currentPage===l.href?'#054186':'#3A4A5F'}" class="block py-2 transition-colors text-sm font-medium">${l.label}</a>`).join('');

const navHTML = `<nav id="navbar" class="fixed top-0 w-full z-50 nav-blur transition-all duration-300">
  <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    <a href="index.html" class="flex items-center gap-3" style="text-decoration:none">
      ${LOGO_SVG}
      <div>
        <span class="font-display font-bold text-lg leading-tight" style="letter-spacing:-0.04em;color:#0A1626">Process<span style="color:#054186">BI</span></span>
        <div class="brand-label" style="font-size:9.5px;letter-spacing:0.16em;line-height:1;margin-top:1px;opacity:0.85">PROCESS × INTELLIGENCE</div>
      </div>
    </a>
    <div class="hidden md:flex items-center gap-7">${desktopLinks}</div>
    <div class="flex items-center gap-4">
      <a href="contact.html" class="hidden md:inline-flex btn-primary" style="padding:10px 22px;font-size:13px">Book a Call</a>
      <button id="mobile-menu-btn" class="md:hidden transition-colors" style="color:#3A4A5F" aria-label="Menu">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden" style="background:rgba(255,255,255,0.98);border-top:1px solid rgba(2,86,155,0.13)">
    <div class="max-w-7xl mx-auto px-6 py-4 space-y-1">${mobileLinks}
      <a href="contact.html" class="btn-primary block text-center mt-4" style="padding:12px 0;font-size:13px">Book a Call</a>
    </div>
  </div>
</nav>`;

document.body.insertAdjacentHTML('afterbegin', navHTML);

/* ───────────────────────────────────────────────
   5. Inject Footer (light theme, AAA)
─────────────────────────────────────────────── */
const footerHTML = `<footer style="border-top:1px solid rgba(2,86,155,0.13);background:#F6F9FC;padding:64px 0 0">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid md:grid-cols-4 gap-10 mb-12">
      <div class="md:col-span-2">
        <a href="index.html" class="flex items-center gap-3 mb-4" style="text-decoration:none">
          ${LOGO_SVG}
          <span class="font-display font-bold text-lg" style="color:#0A1626">Process<span style="color:#054186">BI</span></span>
        </a>
        <p style="color:#3A4A5F;font-size:14px;line-height:1.6;max-width:340px">Australia's specialist Microsoft Fabric, Power BI &amp; AI consulting practice. Make process intelligent.</p>
        <div class="brand-label mt-4">PROCESS × INTELLIGENCE</div>
      </div>
      <div>
        <h4 style="color:#0A1626;font-weight:700;font-size:14px;margin-bottom:16px;letter-spacing:.02em">Navigation</h4>
        <div class="space-y-2">${NAV_LINKS.map(l=>`<div><a href="${l.href}" style="color:#3A4A5F;font-size:14px;text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='#054186'" onmouseout="this.style.color='#3A4A5F'">${l.label}</a></div>`).join('')}</div>
      </div>
      <div>
        <h4 style="color:#0A1626;font-weight:700;font-size:14px;margin-bottom:16px;letter-spacing:.02em">Contact</h4>
        <div class="space-y-2">
          <p style="color:#3A4A5F;font-size:14px">hello@processbi.com.au</p>
          <p style="color:#3A4A5F;font-size:14px">Sydney, Australia</p>
          <a href="https://linkedin.com/in/manish24" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;color:#3A4A5F;font-size:14px;text-decoration:none;margin-top:8px;transition:color 0.2s" onmouseover="this.style.color='#054186'" onmouseout="this.style.color='#3A4A5F'">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid rgba(2,86,155,0.10);padding:28px 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px">
      <p style="color:#3A4A5F;font-size:13px">&copy; 2026 ProcessBI. All rights reserved.</p>
      <div style="display:flex;gap:20px">
        <a href="#" style="color:#3A4A5F;font-size:13px;text-decoration:none" onmouseover="this.style.color='#054186'" onmouseout="this.style.color='#3A4A5F'">Privacy Policy</a>
        <a href="#" style="color:#3A4A5F;font-size:13px;text-decoration:none" onmouseover="this.style.color='#054186'" onmouseout="this.style.color='#3A4A5F'">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>`;

document.body.insertAdjacentHTML('beforeend', footerHTML);

/* ───────────────────────────────────────────────
   6. Scroll reveal
─────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ───────────────────────────────────────────────
   7. Navbar scroll (light theme border)
─────────────────────────────────────────────── */
window.addEventListener('scroll',()=>{
  const nb = document.getElementById('navbar');
  if(nb) nb.style.borderBottomColor = scrollY>50 ? 'rgba(2,86,155,0.30)' : 'rgba(2,86,155,0.13)';
},{passive:true});

/* ───────────────────────────────────────────────
   8. Mobile menu
─────────────────────────────────────────────── */
const mmbtn = document.getElementById('mobile-menu-btn');
const mmenu = document.getElementById('mobile-menu');
if(mmbtn && mmenu) mmbtn.addEventListener('click',()=>mmenu.classList.toggle('hidden'));

/* ───────────────────────────────────────────────
   9. Counter animation (home page metrics)
─────────────────────────────────────────────── */
function animateCounters(){
  document.querySelectorAll('.metric-number[data-target]').forEach(el=>{
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || el.textContent.replace(/[\d.]/g,'');
    const dec    = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    let current  = 0, start = null;
    const duration = 1800;
    function step(ts){
      if(!start) start=ts;
      const progress = Math.min((ts-start)/duration,1);
      const ease = 1 - Math.pow(1-progress,3);
      current = target * ease;
      el.textContent = (dec ? current.toFixed(dec) : Math.floor(current)) + suffix;
      if(progress<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
const counterTarget = document.querySelector('.metric-number[data-target]');
if(counterTarget){
  const cObserver = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){ animateCounters(); cObserver.disconnect(); }
  },{threshold:0.3});
  cObserver.observe(counterTarget);
}

/* ───────────────────────────────────────────────
   10. Case study expand toggle
─────────────────────────────────────────────── */
document.querySelectorAll('.expand-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const body = btn.previousElementSibling;
    const icon = btn.querySelector('.expand-icon');
    if(!body) return;
    body.classList.toggle('open');
    icon && icon.classList.toggle('rotated');
    btn.querySelector('span').textContent = body.classList.contains('open') ? 'Show less' : 'Read more';
  });
});

/* ───────────────────────────────────────────────
   11. Case study filter
─────────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.case-card').forEach(card=>{
      const industry = card.dataset.industry || '';
      card.style.display = (filter==='all' || industry.includes(filter)) ? '' : 'none';
    });
  });
});

/* ───────────────────────────────────────────────
   12. Three.js particle background — LIGHT theme, far back, interaction-driven
─────────────────────────────────────────────── */
if(typeof THREE !== 'undefined'){
  (function(){
    const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
    renderer.setSize(innerWidth,innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));

    const scene  = new THREE.Scene();
    // Depth fog fades distant cubes into white → the field sits FAR back
    scene.fog = new THREE.Fog(0xFFFFFF, 55, 150);
    const camera = new THREE.PerspectiveCamera(70, innerWidth/innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // 110 particles, NEUTRAL slate-grey palette (blue cast removed) — pure depth on WHITE
    const N = 110;
    const pos = new Float32Array(N*3);
    const col = new Float32Array(N*3);
    const palette = [
      new THREE.Color(0xA6ADB6),
      new THREE.Color(0x9198A2),
      new THREE.Color(0xB4BBC4),
      new THREE.Color(0x878E98)
    ];
    for(let i=0;i<N;i++){
      pos[i*3]   = (Math.random()-0.5)*120;
      pos[i*3+1] = (Math.random()-0.5)*80;
      pos[i*3+2] = -22 - Math.random()*72; // pushed deep behind the scene
      const c = palette[(Math.random()*palette.length)|0];
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col,3));
    const mat = new THREE.PointsMaterial({
      size:0.62, vertexColors:true, transparent:true,
      opacity:0.38, depthWrite:false, blending:THREE.NormalBlending, fog:true
    });
    const pts = new THREE.Points(geo,mat);
    scene.add(pts);

    // INTERACTION-DRIVEN motion: tracks cursor + responds to scroll, faint idle drift only.
    let mx=0,my=0,cx=0,cy=0,scrollT=0;
    document.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-0.5);my=(e.clientY/innerHeight-0.5);},{passive:true});
    window.addEventListener('scroll',()=>{scrollT=(window.scrollY||0);},{passive:true});

    function animate(){
      requestAnimationFrame(animate);
      cx += (mx-cx)*0.04; cy += (my-cy)*0.04;
      const t = Date.now();
      pts.rotation.y = cx*0.45 + Math.sin(t*0.00016)*0.03;
      pts.rotation.x = cy*0.3;
      pts.rotation.z = scrollT*0.0001;
      camera.position.x += (cx*4 - camera.position.x)*0.045;
      camera.position.y += (-cy*4 - camera.position.y)*0.045;
      camera.lookAt(scene.position);
      renderer.render(scene,camera);
    }
    animate();

    window.addEventListener('resize',()=>{
      camera.aspect=innerWidth/innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth,innerHeight);
    },{passive:true});
  })();
}

/* ───────────────────────────────────────────────
   13. Nav dropdowns
─────────────────────────────────────────────── */
(function(){
  const css = `
    .nav-drop-wrap{position:relative;display:inline-flex;align-items:center}
    .nav-drop-wrap > a{display:inline-flex;align-items:center;cursor:pointer}
    .nav-drop{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(-6px);
      background:#FFFFFF;border:1px solid rgba(2,86,155,0.18);border-radius:14px;
      box-shadow:0 18px 40px rgba(5,65,134,0.18);
      padding:0;min-width:680px;max-width:90vw;opacity:0;visibility:hidden;
      transition:all .22s cubic-bezier(.4,0,.2,1);z-index:60;pointer-events:none}
    .nav-drop-wrap:hover .nav-drop,
    .nav-drop-wrap:focus-within .nav-drop{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);pointer-events:auto}
    .nav-drop-wrap:hover .dd-chev{transform:rotate(180deg)}
    .dd-chev{transition:transform .25s}
    .nav-drop-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:6px 24px;padding:22px 26px}
    .dd-col-h{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#054186;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid rgba(2,86,155,0.13)}
    .dd-item{display:block;padding:7px 0;font-size:13px;color:#0A1626;text-decoration:none;font-weight:500;line-height:1.35;transition:color .15s}
    .dd-item:hover{color:#054186}
    .dd-tag{display:inline-block;margin-left:6px;font-size:9px;letter-spacing:.10em;text-transform:uppercase;background:rgba(0,194,255,0.15);color:#054186;padding:1px 6px;border-radius:5px;font-weight:700}
    .nav-drop-foot{padding:14px 26px;border-top:1px solid rgba(2,86,155,0.10);background:#F8FBFD;border-radius:0 0 14px 14px;text-align:right}
    .nav-drop-foot a{color:#054186;font-weight:700;font-size:13px;text-decoration:none}
    .nav-drop-foot a:hover{text-decoration:underline}
    @media (max-width:900px){.nav-drop{display:none}}
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

})();
