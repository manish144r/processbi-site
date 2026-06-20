/* ── ProcessBI shared-nav.js — Dark Premium Theme ── */
(function(){
'use strict';

/* ───────────────────────────────────────────────
   1. Inject Three.js canvas (fixed background)
─────────────────────────────────────────────── */
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.insertBefore(canvas, document.body.firstChild);

/* ───────────────────────────────────────────────
   2. Logo — uses logo-animated.svg (full animation: bar grow, line draw,
      node pop-in, floating spark particles). Absolute path so it works
      from every page including subdirectories like blog/.
─────────────────────────────────────────────── */
const LOGO_SVG = `<img src="/logo-animated.svg" width="42" height="38" alt="ProcessBI logo" style="flex:none;display:block" onerror="this.style.display='none'">`;

/* ───────────────────────────────────────────────
   3. Nav links config
─────────────────────────────────────────────── */
const NAV_LINKS = [
  {href:'index.html',       label:'Home'},
  {href:'services.html',    label:'Services'},
  {href:'pricing.html',     label:'Pricing'},
  {href:'methodology.html', label:'Methodology'},
  {href:'case-studies.html',label:'Case Studies'},
  {href:'technology.html',  label:'Technology'},
  {href:'about.html',       label:'About'},
  {href:'blog/index.html',  label:'Insights'},
  {href:'contact.html',     label:'Contact'},
];

const currentPage = (location.pathname.split('/').pop()||'index.html');

function navLinkClass(href){
  return currentPage === href
    ? 'font-medium text-sm transition-colors' + ' ' + 'nav-link-active'
    : 'text-sm transition-colors font-medium nav-link';
}

/* ───────────────────────────────────────────────
   4. Inject Nav
─────────────────────────────────────────────── */
const desktopLinks = NAV_LINKS.map(l=>`<a href="${l.href}" class="${navLinkClass(l.href)}" style="${currentPage===l.href?'color:#00C2FF':'color:#CBD5E1'}" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='${currentPage===l.href?'#00C2FF':'#CBD5E1'}'">${l.label}</a>`).join('');
const mobileLinks  = NAV_LINKS.map(l=>`<a href="${l.href}" style="color:${currentPage===l.href?'#00C2FF':'#CBD5E1'}" class="block py-2 transition-colors text-sm font-medium">${l.label}</a>`).join('');

const navHTML = `<nav id="navbar" class="fixed top-0 w-full z-50 nav-blur transition-all duration-300">
  <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    <a href="index.html" class="flex items-center gap-3" style="text-decoration:none">
      ${LOGO_SVG}
      <div>
        <span class="font-display font-bold text-lg leading-tight" style="letter-spacing:-0.04em;color:#FFFFFF">Process<span style="color:#00C2FF">BI</span></span>
        <div class="brand-label" style="font-size:9px;letter-spacing:0.16em;line-height:1;margin-top:1px;opacity:0.7">PROCESS × INTELLIGENCE</div>
      </div>
    </a>
    <div class="hidden md:flex items-center gap-7">${desktopLinks}</div>
    <div class="flex items-center gap-4">
      <a href="contact.html" class="hidden md:inline-flex btn-primary" style="padding:10px 22px;font-size:13px">Book a Call</a>
      <button id="mobile-menu-btn" class="md:hidden transition-colors" style="color:#8BB4CC" aria-label="Menu">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden" style="background:rgba(11,26,46,0.98);border-top:1px solid rgba(0,194,255,0.1)">
    <div class="max-w-7xl mx-auto px-6 py-4 space-y-1">${mobileLinks}
      <a href="contact.html" class="btn-primary block text-center mt-4" style="padding:12px 0;font-size:13px">Book a Call</a>
    </div>
  </div>
</nav>`;

document.body.insertAdjacentHTML('afterbegin', navHTML);

/* ───────────────────────────────────────────────
   5. Inject Footer
─────────────────────────────────────────────── */
const footerHTML = `<footer style="border-top:1px solid rgba(0,194,255,0.12);background:rgba(8,18,36,0.55);backdrop-filter:blur(8px);padding:64px 0 0">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid md:grid-cols-4 gap-10 mb-12">
      <div class="md:col-span-2">
        <a href="index.html" class="flex items-center gap-3 mb-4" style="text-decoration:none">
          ${LOGO_SVG}
          <span class="font-display font-bold text-lg" style="color:#FFFFFF">Process<span style="color:#00C2FF">BI</span></span>
        </a>
        <p style="color:#8BB4CC;font-size:0.875rem;line-height:1.6;max-width:340px">Australia's specialist Microsoft Fabric, Power BI &amp; AI consulting practice. Where process meets intelligence.</p>
        <div class="brand-label mt-4">PROCESS × INTELLIGENCE</div>
      </div>
      <div>
        <h4 style="color:#FFFFFF;font-weight:600;font-size:0.875rem;margin-bottom:16px">Navigation</h4>
        <div class="space-y-2">${NAV_LINKS.map(l=>`<div><a href="${l.href}" style="color:#8BB4CC;font-size:0.875rem;text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">${l.label}</a></div>`).join('')}</div>
      </div>
      <div>
        <h4 style="color:#FFFFFF;font-weight:600;font-size:0.875rem;margin-bottom:16px">Contact</h4>
        <div class="space-y-2">
          <p style="color:#8BB4CC;font-size:0.875rem">hello@processbi.com.au</p>
          <p style="color:#8BB4CC;font-size:0.875rem">Melbourne, Australia</p>
          <a href="https://linkedin.com/in/manish-sharma-processbi" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;color:#8BB4CC;font-size:0.875rem;text-decoration:none;margin-top:8px;transition:color 0.2s" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid rgba(0,194,255,0.08);padding:28px 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px">
      <p style="color:#8BB4CC;font-size:0.8rem">&copy; 2026 ProcessBI. All rights reserved. ABN in progress.</p>
      <div style="display:flex;gap:20px">
        <a href="#" style="color:#8BB4CC;font-size:0.75rem;text-decoration:none" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">Privacy Policy</a>
        <a href="#" style="color:#8BB4CC;font-size:0.75rem;text-decoration:none" onmouseover="this.style.color='#00C2FF'" onmouseout="this.style.color='#8BB4CC'">Terms of Service</a>
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
   7. Navbar scroll
─────────────────────────────────────────────── */
window.addEventListener('scroll',()=>{
  const nb = document.getElementById('navbar');
  if(nb) nb.style.borderBottomColor = scrollY>50 ? 'rgba(0,194,255,0.25)' : 'rgba(0,194,255,0.1)';
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
   12. Three.js particle background — dark navy palette
       Mobile: reduced particle count + no mousemove parallax
─────────────────────────────────────────────── */
if(typeof THREE !== 'undefined'){
  (function(){
    // Mobile detection — reduce load on phones/tablets
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent)
                  || innerWidth < 768;

    // Skip animation for prefers-reduced-motion
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      canvas.style.display = 'none';
      return;
    }

    const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:!isMobile});
    renderer.setSize(innerWidth,innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, innerWidth/innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Particles — 80 on mobile vs 400 on desktop
    const N = isMobile ? 80 : 400;
    const pos = new Float32Array(N*3);
    const col = new Float32Array(N*3);
    for(let i=0;i<N*3;i+=3){
      pos[i]   = (Math.random()-.5)*80;
      pos[i+1] = (Math.random()-.5)*80;
      pos[i+2] = (Math.random()-.5)*40;
      // Cyan to deep blue palette
      const t = Math.random();
      const c = new THREE.Color(
        t < 0.5
          ? new THREE.Color(0x00C2FF).lerp(new THREE.Color(0x1A7FFF), t*2)
          : new THREE.Color(0x1A7FFF).lerp(new THREE.Color(0x1EAEFF), (t-0.5)*2)
      );
      col[i]=c.r; col[i+1]=c.g; col[i+2]=c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col,3));
    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.18,
      vertexColors:true,transparent:true,
      opacity: isMobile ? 0.4 : 0.5,
      blending:THREE.AdditiveBlending
    });
    const pts = new THREE.Points(geo,mat);
    scene.add(pts);

    // Connection lines — 30 on mobile vs 180 on desktop
    const MAX_LINES = isMobile ? 30 : 180;
    const lgeo = new THREE.BufferGeometry();
    const lpos  = new Float32Array(MAX_LINES*6);
    lgeo.setAttribute('position', new THREE.BufferAttribute(lpos,3));
    const lmat = new THREE.LineBasicMaterial({
      color:0x00C2FF,transparent:true,opacity:0.09
    });
    scene.add(new THREE.LineSegments(lgeo,lmat));

    // Mousemove parallax — desktop only (saves battery on mobile)
    let mx=0,my=0;
    if(!isMobile){
      document.addEventListener('mousemove',e=>{
        mx=(e.clientX/innerWidth-.5)*2;
        my=(e.clientY/innerHeight-.5)*2;
      },{passive:true});
    }

    const CONN_LIMIT = isMobile ? 20 : 70;

    function animate(){
      requestAnimationFrame(animate);
      pts.rotation.y += isMobile ? 0.00008 : 0.00015;
      pts.rotation.x += isMobile ? 0.00004 : 0.00008;
      if(!isMobile){
        camera.position.x += (mx*1.5 - camera.position.x)*0.006;
        camera.position.y += (-my*1.5 - camera.position.y)*0.006;
      }
      camera.lookAt(scene.position);

      let li=0;
      const p = pts.geometry.attributes.position.array;
      const limit = Math.min(CONN_LIMIT,N);
      for(let i=0;i<limit&&li<MAX_LINES*6;i++){
        for(let j=i+1;j<limit&&li<MAX_LINES*6;j++){
          const dx=p[i*3]-p[j*3],dy=p[i*3+1]-p[j*3+1],dz=p[i*3+2]-p[j*3+2];
          if(dx*dx+dy*dy+dz*dz < 64){
            lpos[li++]=p[i*3];lpos[li++]=p[i*3+1];lpos[li++]=p[i*3+2];
            lpos[li++]=p[j*3];lpos[li++]=p[j*3+1];lpos[li++]=p[j*3+2];
          }
        }
      }
      for(let i=li;i<MAX_LINES*6;i++) lpos[i]=0;
      lgeo.attributes.position.needsUpdate=true;
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

})();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        