/* ── ProcessBI — Brand Reveal motion graphic (vanilla port of animations.jsx) ──
   Ported 1:1 from animations.jsx BrandVideo / Mark / LogoScene timings.
   White-centred chart nodes. Plays once per session. Click to skip.
*/
(function(){
  'use strict';

  // Skip if already seen this session OR reduced motion preferred
  var seen = false;
  try { seen = sessionStorage.getItem('pb_intro_seen') === '1'; } catch(e){}
  if (seen) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { sessionStorage.setItem('pb_intro_seen', '1'); } catch(e){}

  var PB = {
    navy:  '#06182F',
    navy2: '#0B2A52',
    blue:  '#2E6BF6',
    blueD: '#1A4AC2',
    cyan:  '#46D5FF',
    cyan2: '#86E6FF',
    ink:   '#EAF2FF',
    mute:  '#7C9CC9',
    sora:  "'Sora','Space Grotesk',system-ui,sans-serif",
    mono:  "'Space Mono',ui-monospace,monospace"
  };
  var DURATION = 11; // seconds — matches animations.jsx Stage duration

  // ── Easing (matching animations.jsx Easing module) ───────────────────────────
  function easeOutCubic(t){return 1-Math.pow(1-t,3)}
  function easeOutQuart(t){return 1-Math.pow(1-t,4)}
  function easeInCubic(t){return t*t*t}
  function easeInOutCubic(t){return t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2}
  function easeOutBack(t){var c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)}

  // Ranged animation: returns 0..1 progress for t within [start,end], eased
  function animate(t,start,end,ease){
    if (t<=start) return 0;
    if (t>=end)   return 1;
    var p=(t-start)/(end-start);
    return ease ? ease(p) : p;
  }
  // Multi-keyframe interpolate (linear between keys, optional ease per segment)
  function interp(t,keys,vals,ease){
    if (t<=keys[0]) return vals[0];
    for (var i=0;i<keys.length-1;i++){
      if (t<=keys[i+1]){
        var p=(t-keys[i])/(keys[i+1]-keys[i]);
        if (ease) p=ease(p);
        return vals[i]+(vals[i+1]-vals[i])*p;
      }
    }
    return vals[vals.length-1];
  }

  // ── DOM scaffolding ──────────────────────────────────────────────────────────
  var overlay=document.createElement('div');
  overlay.id='pb-brand-reveal';
  overlay.setAttribute('aria-hidden','true');
  overlay.setAttribute('role','presentation');
  overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:radial-gradient(120% 90% at 50% 38%,'+PB.navy2+' 0%,'+PB.navy+' 62%);transition:opacity .8s ease;cursor:pointer;will-change:opacity;overflow:hidden';

  // Background grid + glow (matches Background component)
  var bg=document.createElement('div');
  bg.style.cssText='position:absolute;inset:0;overflow:hidden;pointer-events:none';
  bg.innerHTML=
    '<div id="pb-grid" style="position:absolute;inset:-64px;'+
      'background-image:linear-gradient('+PB.blue+'14 1px,transparent 1px),linear-gradient(90deg,'+PB.blue+'14 1px,transparent 1px);'+
      'background-size:64px 64px;'+
      'mask-image:radial-gradient(80% 70% at 50% 45%,#000 30%,transparent 78%);'+
      '-webkit-mask-image:radial-gradient(80% 70% at 50% 45%,#000 30%,transparent 78%);'+
      'will-change:transform"></div>'+
    '<div id="pb-glow" style="position:absolute;left:50%;top:42%;width:900px;height:900px;'+
      'transform:translate(-50%,-50%);background:radial-gradient(circle,'+PB.cyan+'22 0%,transparent 60%);will-change:opacity"></div>';
  overlay.appendChild(bg);

  // 1920×1080 stage scaled to fit viewport (preserves the animations.jsx layout exactly)
  var stage=document.createElement('div');
  stage.id='pb-stage';
  stage.style.cssText='position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform-origin:50% 50%;will-change:transform';
  overlay.appendChild(stage);

  // Mark container
  var markEl=document.createElement('div');
  markEl.id='pb-mark';
  markEl.style.cssText='position:absolute;transform:translate(-50%,-50%);will-change:left,top';
  stage.appendChild(markEl);

  markEl.innerHTML=
    '<div style="transform:translateX(-3%)">'+
      '<svg id="pb-mark-svg" viewBox="0 0 128 118" style="overflow:visible;display:block">'+
        '<defs>'+
          '<linearGradient id="pb-bar"     x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="'+PB.blueD+'"/><stop offset="1" stop-color="'+PB.blue+'"/></linearGradient>'+
          '<linearGradient id="pb-bar-top" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="'+PB.blue+'"/><stop offset="1" stop-color="'+PB.cyan+'"/></linearGradient>'+
          '<linearGradient id="pb-line-g"  x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="'+PB.blue+'"/><stop offset="1" stop-color="'+PB.cyan+'"/></linearGradient>'+
          '<filter id="pb-glow-f" x="-60%" y="-60%" width="220%" height="220%">'+
            '<feGaussianBlur stdDeviation="2.4" result="b"/>'+
            '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>'+
          '</filter>'+
        '</defs>'+
        '<g id="pb-bars">'+
          '<rect data-bar="0" x="12" rx="6" fill="url(#pb-bar)"/>'+
          '<rect data-bar="1" x="37" rx="6" fill="url(#pb-bar)"/>'+
          '<rect data-bar="2" x="62" rx="6" fill="url(#pb-bar)"/>'+
          '<rect data-bar="3" x="87" rx="6" fill="url(#pb-bar-top)"/>'+
        '</g>'+
        '<path id="pb-line" d="M 20.5 78 L 45.5 60 L 70.5 38 L 95.5 16" fill="none" stroke="url(#pb-line-g)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#pb-glow-f)" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>'+
        '<g id="pb-arrow-grp" opacity="0">'+
          '<path id="pb-arrow-seg" d="" fill="none" stroke="url(#pb-line-g)" stroke-width="4.5" stroke-linecap="round" filter="url(#pb-glow-f)"/>'+
          '<g id="pb-arrowhead" transform="translate(95.5 16)">'+
            '<path d="M 0 0 L -13 1.5 M 0 0 L -1.5 13" fill="none" stroke="'+PB.cyan+'" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#pb-glow-f)"/>'+
          '</g>'+
        '</g>'+
        '<g id="pb-nodes">'+
          // WHITE-CENTRED nodes (replacing the original navy fill)
          '<g data-node="0" opacity="0"><circle data-halo cx="20.5" cy="78" fill="'+PB.cyan+'"/><circle data-ring cx="20.5" cy="78" fill="#FFFFFF" stroke="'+PB.cyan+'" stroke-width="3"/><circle data-dot cx="20.5" cy="78" fill="'+PB.cyan2+'"/></g>'+
          '<g data-node="1" opacity="0"><circle data-halo cx="45.5" cy="60" fill="'+PB.cyan+'"/><circle data-ring cx="45.5" cy="60" fill="#FFFFFF" stroke="'+PB.cyan+'" stroke-width="3"/><circle data-dot cx="45.5" cy="60" fill="'+PB.cyan2+'"/></g>'+
          '<g data-node="2" opacity="0"><circle data-halo cx="70.5" cy="38" fill="'+PB.cyan+'"/><circle data-ring cx="70.5" cy="38" fill="#FFFFFF" stroke="'+PB.cyan+'" stroke-width="3"/><circle data-dot cx="70.5" cy="38" fill="'+PB.cyan2+'"/></g>'+
          '<g data-node="3" opacity="0"><circle data-halo cx="95.5" cy="16" fill="'+PB.cyan+'"/><circle data-ring cx="95.5" cy="16" fill="#FFFFFF" stroke="'+PB.cyan+'" stroke-width="3"/><circle data-dot cx="95.5" cy="16" fill="'+PB.cyan2+'"/></g>'+
        '</g>'+
      '</svg>'+
    '</div>';

  // Text block
  var textBlock=document.createElement('div');
  textBlock.id='pb-text';
  textBlock.style.cssText='position:absolute;display:flex;flex-direction:column;gap:12px;will-change:left,top';
  textBlock.innerHTML=
    '<div id="pb-kicker" style="opacity:0;font-family:'+PB.mono+';font-size:17px;letter-spacing:0.22em;color:'+PB.cyan+';text-transform:uppercase;font-weight:700">Process &times; Intelligence</div>'+
    '<div style="overflow:hidden"><div id="pb-word" style="clip-path:inset(0 100% 0 0);-webkit-clip-path:inset(0 100% 0 0);font-family:'+PB.sora+';font-size:108px;font-weight:700;line-height:1;letter-spacing:-0.02em;white-space:nowrap">'+
      '<span style="color:'+PB.ink+'">Process</span><span style="color:'+PB.cyan+';margin-left:0.18em">BI</span>'+
    '</div></div>'+
    '<div style="display:flex;align-items:center;gap:16px;margin-top:4px">'+
      '<div id="pb-dash" style="width:0px;height:3px;background:'+PB.blue+';border-radius:2px"></div>'+
      '<div id="pb-tag" style="opacity:0;font-family:'+PB.sora+';font-size:23px;font-weight:400;color:'+PB.mute+';letter-spacing:0.01em">Make process intelligent</div>'+
    '</div>';
  stage.appendChild(textBlock);

  // ── Mount ────────────────────────────────────────────────────────────────────
  function mount(){
    document.body.appendChild(overlay);
    document.body.style.overflow='hidden';
    fit();
    window.addEventListener('resize', fit, {passive:true});
    overlay.addEventListener('click', dismiss);
    requestAnimationFrame(frame);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  // ── Layout fit ───────────────────────────────────────────────────────────────
  function fit(){
    var s = Math.min(window.innerWidth/1920, window.innerHeight/1080);
    stage.style.transform = 'translate(-50%,-50%) scale('+s+')';
  }

  // ── Refs ─────────────────────────────────────────────────────────────────────
  var grid       = overlay.querySelector('#pb-grid');
  var glow       = overlay.querySelector('#pb-glow');
  var line       = overlay.querySelector('#pb-line');
  var arrowGrp   = overlay.querySelector('#pb-arrow-grp');
  var arrowSeg   = overlay.querySelector('#pb-arrow-seg');
  var arrowhead  = overlay.querySelector('#pb-arrowhead');
  var svg        = overlay.querySelector('#pb-mark-svg');
  var kickerEl   = overlay.querySelector('#pb-kicker');
  var wordEl     = overlay.querySelector('#pb-word');
  var dashEl     = overlay.querySelector('#pb-dash');
  var tagEl      = overlay.querySelector('#pb-tag');

  var bars = [
    { x:12, w:17, top:78 },
    { x:37, w:17, top:60 },
    { x:62, w:17, top:38 },
    { x:87, w:17, top:16 }
  ];
  var nodes = bars.map(function(b){ return { cx:b.x+b.w/2, cy:b.top }; });
  var baseY = 104;
  var arrowTip = { x:122, y:5 };

  var startTime=null, dismissed=false;
  function dismiss(){
    if (dismissed) return;
    dismissed = true;
    overlay.style.opacity='0';
    document.body.style.overflow='';
    setTimeout(function(){ if (overlay.parentNode) overlay.remove(); }, 850);
  }

  // ── Frame loop (1:1 with LogoScene + Mark + Background timings) ──────────────
  function frame(now){
    if (dismissed) return;
    if (startTime===null) startTime = now;
    var t = (now - startTime)/1000;
    if (t >= DURATION) { dismiss(); return; }

    // Background drift + breathing glow
    var drift = (t*6) % 64;
    grid.style.transform = 'translate('+drift+'px,'+drift+'px)';
    var glowVal = 0.5 + 0.5*Math.sin((t/11)*Math.PI*2);
    glow.style.opacity = (0.5 + 0.5*glowVal).toFixed(3);

    // Mark hero → lockup
    var markCX   = interp(t, [0,2.6,3.5], [960,960,648], easeInOutCubic);
    var markCY   = interp(t, [0,2.6,3.5], [470,470,540], easeInOutCubic);
    var markSize = interp(t, [0,2.6,3.5], [430,430,188], easeInOutCubic);
    markEl.style.left = markCX+'px';
    markEl.style.top  = markCY+'px';
    svg.setAttribute('width',  markSize);
    svg.setAttribute('height', markSize*(118/128));

    // Bars (staggered rise)
    for (var i=0;i<bars.length;i++){
      var barP = animate(t, 0.45 + i*0.17, 0.45 + i*0.17 + 0.55, easeOutQuart);
      var fullH = baseY - bars[i].top;
      var h = fullH * barP;
      var y = baseY - h;
      var rect = overlay.querySelector('rect[data-bar="'+i+'"]');
      rect.setAttribute('y', y);
      rect.setAttribute('width', bars[i].w);
      rect.setAttribute('height', Math.max(0, h));
      rect.setAttribute('opacity', (0.34 + 0.66*Math.min(1, barP*1.4)).toFixed(3));
    }

    // Process line (stroke-dashoffset draw-on 1.0 → 2.05)
    var lineP = animate(t, 1.0, 2.05, easeInOutCubic);
    line.setAttribute('stroke-dashoffset', 100*(1 - lineP));

    // Nodes (staggered pop-in with ambient shimmer)
    var phase = (t/11)*Math.PI*2;
    for (var j=0;j<nodes.length;j++){
      var s = animate(t, 1.05 + j*0.22, 1.05 + j*0.22 + 0.4, easeOutBack);
      var shimmer = 0.55 + 0.45*Math.sin(phase - j*0.7);
      var r = 6.2*s;
      var grp = overlay.querySelector('g[data-node="'+j+'"]');
      grp.setAttribute('opacity', s);
      var halo = grp.querySelector('[data-halo]');
      halo.setAttribute('r', r+4);
      halo.setAttribute('opacity', (0.16*shimmer*s).toFixed(3));
      var ring = grp.querySelector('[data-ring]');
      ring.setAttribute('r', r);
      var dot = grp.querySelector('[data-dot]');
      dot.setAttribute('r', r*0.42);
      dot.setAttribute('opacity', (0.6 + 0.4*shimmer).toFixed(3));
    }

    // Insight arrow (extends from last node 2.0 → 2.5)
    var arrowP = animate(t, 2.0, 2.5, easeOutBack);
    arrowGrp.setAttribute('opacity', arrowP);
    var tipX = nodes[3].cx + (arrowTip.x - nodes[3].cx)*arrowP;
    var tipY = nodes[3].cy + (arrowTip.y - nodes[3].cy)*arrowP;
    arrowSeg.setAttribute('d', 'M '+nodes[3].cx+' '+nodes[3].cy+' L '+tipX+' '+tipY);
    arrowhead.setAttribute('transform', 'translate('+tipX+' '+tipY+')');

    // Text block — positioned right of the mark when in lockup
    var markVisualHalf = markSize*(98/128)/2;
    var textLeft = markCX + markVisualHalf + 46;
    textBlock.style.left = textLeft+'px';
    textBlock.style.top  = '540px';
    textBlock.style.transform = 'translateY(-50%)';

    // Kicker fade
    var kickP = animate(t, 3.25, 3.75, easeOutCubic);
    kickerEl.style.opacity = kickP;
    kickerEl.style.transform = 'translateY('+((1-kickP)*8)+'px)';

    // Wordmark wipe
    var wordP = animate(t, 3.45, 4.35, easeInOutCubic);
    wordEl.style.clipPath = wordEl.style.webkitClipPath = 'inset(0 '+((1-wordP)*102)+'% 0 0)';

    // Divider draw
    var dashP = animate(t, 4.3, 4.9, easeInOutCubic);
    dashEl.style.width = (46*dashP)+'px';

    // Tagline
    var tagP = animate(t, 4.7, 5.4, easeOutCubic);
    tagEl.style.opacity = tagP;
    tagEl.style.transform = 'translateY('+((1-tagP)*6)+'px)';

    // Outro fade 9.4 → 10.7
    var outro = animate(t, 9.4, 10.7, easeInCubic);
    overlay.style.opacity = (1 - outro).toFixed(3);

    requestAnimationFrame(frame);
  }
})();
