/**
 * @file Playground.js
 * @description Handles the interactive Playground section using aniscript.
 */
import { compile } from 'aniscript';

const exs = {
  hero: `:: fade-down | @100ms | dur:0.8s :: {\n  <h2>Experience Motion</h2>\n}\n:: fade-up | @400ms :: {\n  <p>A declarative DSL for modern web animations.</p>\n}\n:: zoom-in-sm | @700ms :: {\n  <button>Get Started Free</button>\n}`,
  stagger: `[[ stagger: 150ms ]]\n  :: zoom-in-sm :: { <div class="card"><h3>Card One</h3><p>Stagger is automatic.</p></div> }\n  :: zoom-in-sm :: { <div class="card"><h3>Card Two</h3><p>Each child is offset.</p></div> }\n  :: zoom-in-sm :: { <div class="card"><h3>Card Three</h3><p>No math required.</p></div> }\n[[/]]`,
  mixed: `:: blur-in | @0ms | dur:1s :: {\n  <div class="tag">New Release</div>\n}\n:: fade-down | @300ms :: {\n  <h2>AniScript v1.1.3</h2>\n}\n:: fade-up | @550ms :: {\n  <p>The animation DSL is now on npm.</p>\n}\n[[ stagger: 130ms ]]\n  :: fade-left :: { <div class="card"><h3>Compiler</h3><p>DSL to HTML</p></div> }\n  :: fade-left :: { <div class="card"><h3>Runtime</h3><p>Observer-based triggers</p></div> }\n[[/]]`
};

/**
 * All CSS keyframes string to inject in the iframe.
 * @returns {string} The CSS string of keyframes.
 */
function allKeyframes() {
  return `
    @keyframes ani-fade-in{from{opacity:0}to{opacity:1}}
    @keyframes ani-fade-up{from{opacity:0;transform:translate3d(0,40px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-up-sm{from{opacity:0;transform:translate3d(0,20px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-up-lg{from{opacity:0;transform:translate3d(0,100px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-down{from{opacity:0;transform:translate3d(0,-40px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-down-sm{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-down-lg{from{opacity:0;transform:translate3d(0,-100px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-left{from{opacity:0;transform:translate3d(40px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-left-sm{from{opacity:0;transform:translate3d(20px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-right{from{opacity:0;transform:translate3d(-40px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-right-sm{from{opacity:0;transform:translate3d(-20px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-up-left{from{opacity:0;transform:translate3d(40px,40px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-up-right{from{opacity:0;transform:translate3d(-40px,40px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-down-left{from{opacity:0;transform:translate3d(40px,-40px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-fade-down-right{from{opacity:0;transform:translate3d(-40px,-40px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes ani-zoom-in{from{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:1;transform:scale3d(1,1,1)}}
    @keyframes ani-zoom-in-sm{from{opacity:0;transform:scale3d(.85,.85,.85)}to{opacity:1;transform:scale3d(1,1,1)}}
    @keyframes ani-zoom-in-lg{from{opacity:0;transform:scale3d(0,0,0)}to{opacity:1;transform:scale3d(1,1,1)}}
    @keyframes ani-zoom-out{from{opacity:0;transform:scale3d(1.3,1.3,1.3)}to{opacity:1;transform:scale3d(1,1,1)}}
    @keyframes ani-zoom-out-sm{from{opacity:0;transform:scale3d(1.1,1.1,1.1)}to{opacity:1;transform:scale3d(1,1,1)}}
    @keyframes ani-zoom-out-lg{from{opacity:0;transform:scale3d(2,2,2)}to{opacity:1;transform:scale3d(1,1,1)}}
    @keyframes ani-zoom-in-up{from{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,1000px,0)}to{opacity:1;transform:scale3d(1,1,1) translate3d(0,0,0)}}
    @keyframes ani-zoom-in-down{from{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0)}to{opacity:1;transform:scale3d(1,1,1) translate3d(0,0,0)}}
    @keyframes ani-slide-in-up{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}
    @keyframes ani-slide-in-down{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}
    @keyframes ani-slide-in-left{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}
    @keyframes ani-slide-in-right{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}
    @keyframes ani-bounce-in{0%{opacity:0;transform:scale3d(.3,.3,.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(.9,.9,.9)}60%{opacity:1;transform:scale3d(1.03,1.03,1.03)}80%{transform:scale3d(.97,.97,.97)}to{opacity:1;transform:scale3d(1,1,1)}}
    @keyframes ani-bounce-up{from{opacity:0;transform:translate3d(0,3000px,0) scaleY(5)}60%{opacity:1;transform:translate3d(0,-20px,0) scaleY(.9)}75%{transform:translate3d(0,10px,0) scaleY(.95)}90%{transform:translate3d(0,-5px,0) scaleY(.98)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-bounce-down{0%{opacity:0;transform:translate3d(0,-3000px,0) scaleY(3)}60%{opacity:1;transform:translate3d(0,25px,0) scaleY(.9)}75%{transform:translate3d(0,-10px,0) scaleY(.95)}90%{transform:translate3d(0,5px,0) scaleY(.98)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-bounce-left{0%{opacity:0;transform:translate3d(3000px,0,0) scaleX(3)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-bounce-right{0%{opacity:0;transform:translate3d(-3000px,0,0) scaleX(3)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-slide-bounce-up{0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-slide-bounce-down{0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-slide-bounce-left{0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-slide-bounce-right{0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-flip-x{from{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg)}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}
    @keyframes ani-flip-y{from{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg)}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}
    @keyframes ani-rotate-in-cw{from{transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform:translate3d(0,0,0);opacity:1}}
    @keyframes ani-rotate-in-ccw{from{transform:rotate3d(0,0,1,200deg);opacity:0}to{transform:translate3d(0,0,0);opacity:1}}
    @keyframes ani-rotate-up{from{transform-origin:center bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:center bottom;transform:translate3d(0,0,0);opacity:1}}
    @keyframes ani-rotate-down{from{transform-origin:center bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:center bottom;transform:translate3d(0,0,0);opacity:1}}
    @keyframes ani-blur-in{from{filter:blur(20px);opacity:0}to{filter:blur(0);opacity:1}}
    @keyframes ani-blur-in-sm{from{filter:blur(5px);opacity:0}to{filter:blur(0);opacity:1}}
    @keyframes ani-blur-in-lg{from{filter:blur(50px);opacity:0}to{filter:blur(0);opacity:1}}
    @keyframes ani-blur-out{from{filter:blur(0);opacity:1}to{filter:blur(20px);opacity:0}}
    @keyframes ani-shake-h{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}
    @keyframes ani-shake-v{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}
    @keyframes ani-pulse{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.07,1.07,1.07)}to{transform:scale3d(1,1,1)}}
    @keyframes ani-swing{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}
    @keyframes ani-jello{from,11.1%,to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-.78125deg) skewY(-.78125deg)}77.7%{transform:skewX(.390625deg) skewY(.390625deg)}88.8%{transform:skewX(-.1953125deg) skewY(-.1953125deg)}}
    @keyframes ani-wobble{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}
    @keyframes ani-rubber-band{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,.75,1)}40%{transform:scale3d(.75,1.25,1)}50%{transform:scale3d(1.15,.85,1)}65%{transform:scale3d(.95,1.05,1)}75%{transform:scale3d(1.05,.95,1)}to{transform:scale3d(1,1,1)}}
    `
}

/**
 * All CSS Selectors string to inject into iframe.
 * @returns {string} The CSS selectors string.
 */
function allSelectors() {
  return `
    [data-ani="fade-in"].ani-running{animation-name:ani-fade-in}
    [data-ani="fade-up"].ani-running{animation-name:ani-fade-up}
    [data-ani="fade-up-sm"].ani-running{animation-name:ani-fade-up-sm}
    [data-ani="fade-up-lg"].ani-running{animation-name:ani-fade-up-lg}
    [data-ani="fade-down"].ani-running{animation-name:ani-fade-down}
    [data-ani="fade-down-sm"].ani-running{animation-name:ani-fade-down-sm}
    [data-ani="fade-down-lg"].ani-running{animation-name:ani-fade-down-lg}
    [data-ani="fade-left"].ani-running{animation-name:ani-fade-left}
    [data-ani="fade-left-sm"].ani-running{animation-name:ani-fade-left-sm}
    [data-ani="fade-right"].ani-running{animation-name:ani-fade-right}
    [data-ani="fade-right-sm"].ani-running{animation-name:ani-fade-right-sm}
    [data-ani="fade-up-left"].ani-running{animation-name:ani-fade-up-left}
    [data-ani="fade-up-right"].ani-running{animation-name:ani-fade-up-right}
    [data-ani="fade-down-left"].ani-running{animation-name:ani-fade-down-left}
    [data-ani="fade-down-right"].ani-running{animation-name:ani-fade-down-right}
    [data-ani="zoom-in"].ani-running{animation-name:ani-zoom-in}
    [data-ani="zoom-in-sm"].ani-running{animation-name:ani-zoom-in-sm}
    [data-ani="zoom-in-lg"].ani-running{animation-name:ani-zoom-in-lg}
    [data-ani="zoom-out"].ani-running{animation-name:ani-zoom-out}
    [data-ani="zoom-out-sm"].ani-running{animation-name:ani-zoom-out-sm}
    [data-ani="zoom-out-lg"].ani-running{animation-name:ani-zoom-out-lg}
    [data-ani="zoom-in-up"].ani-running{animation-name:ani-zoom-in-up}
    [data-ani="zoom-in-down"].ani-running{animation-name:ani-zoom-in-down}
    [data-ani="slide-in-up"].ani-running{animation-name:ani-slide-in-up}
    [data-ani="slide-in-down"].ani-running{animation-name:ani-slide-in-down}
    [data-ani="slide-in-left"].ani-running{animation-name:ani-slide-in-left}
    [data-ani="slide-in-right"].ani-running{animation-name:ani-slide-in-right}
    [data-ani="bounce-in"].ani-running{animation-name:ani-bounce-in}
    [data-ani="bounce-up"].ani-running{animation-name:ani-bounce-up}
    [data-ani="bounce-down"].ani-running{animation-name:ani-bounce-down}
    [data-ani="bounce-left"].ani-running{animation-name:ani-bounce-left}
    [data-ani="bounce-right"].ani-running{animation-name:ani-bounce-right}
    [data-ani="slide-bounce-up"].ani-running{animation-name:ani-slide-bounce-up}
    [data-ani="slide-bounce-down"].ani-running{animation-name:ani-slide-bounce-down}
    [data-ani="slide-bounce-left"].ani-running{animation-name:ani-slide-bounce-left}
    [data-ani="slide-bounce-right"].ani-running{animation-name:ani-slide-bounce-right}
    [data-ani="flip-x"].ani-running{animation-name:ani-flip-x}
    [data-ani="flip-y"].ani-running{animation-name:ani-flip-y}
    [data-ani="rotate-in-cw"].ani-running{animation-name:ani-rotate-in-cw}
    [data-ani="rotate-in-ccw"].ani-running{animation-name:ani-rotate-in-ccw}
    [data-ani="rotate-up"].ani-running{animation-name:ani-rotate-up}
    [data-ani="rotate-down"].ani-running{animation-name:ani-rotate-down}
    [data-ani="blur-in"].ani-running{animation-name:ani-blur-in}
    [data-ani="blur-in-sm"].ani-running{animation-name:ani-blur-in-sm}
    [data-ani="blur-in-lg"].ani-running{animation-name:ani-blur-in-lg}
    [data-ani="blur-out"].ani-running{animation-name:ani-blur-out}
    [data-ani="shake-h"].ani-running{animation-name:ani-shake-h}
    [data-ani="shake-v"].ani-running{animation-name:ani-shake-v}
    [data-ani="pulse"].ani-running{animation-name:ani-pulse}
    [data-ani="swing"].ani-running{animation-name:ani-swing}
    [data-ani="jello"].ani-running{animation-name:ani-jello}
    [data-ani="wobble"].ani-running{animation-name:ani-wobble}
    [data-ani="rubber-band"].ani-running{animation-name:ani-rubber-band}
    `
}

/**
 * Loads a predefined example into the playground editor and runs it.
 * @param {string} k - The key of the example to load ('hero', 'stagger', 'mixed').
 */
export function loadEx(k) {
  const pgi = document.getElementById('pgi');
  if (pgi) {
    pgi.value = exs[k];
  }

  document.querySelectorAll('.pgtab').forEach((t, i) => {
    t.classList.toggle('active', ['hero', 'stagger', 'mixed'][i] === k);
  });

  runPG();
}

/**
 * Compiles the text from the playground editor and updates the iframe preview.
 */
export function runPG() {
  const iframe = document.getElementById('pgp');
  const pgi = document.getElementById('pgi');
  if (!iframe || !pgi) return;

  const inputVal = pgi.value;
  // Use the installed aniscript package to compile
  const compiled = compile(inputVal);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
  html,body{font-family:'DM Sans',sans-serif;background:#f8fafc;padding:32px;line-height:1.6;color:#1e293b;font-size:16px}
  h1,h2,h3,h4,h5,h6{font-family:'Syne',sans-serif;letter-spacing:-.02em;line-height:1.2;margin-top:0;margin-bottom:12px}
  h2{font-size:1.8rem;font-weight:800;color:#1e293b}
  h3{font-size:1.1rem;font-weight:700;color:#1e293b;margin-bottom:6px}
  p{color:#475569;margin-top:0;margin-bottom:16px;font-size:.95rem;line-height:1.6}
  button{background:#3b82f6;color:white;border:none;padding:10px 22px;border-radius:7px;font-weight:600;cursor:pointer;font-size:.9rem;font-family:'DM Sans',sans-serif;margin-top:4px}
  .card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
  .card p{margin:0;color:#64748b;font-size:.875rem}
  .tag{display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:.75rem;font-weight:600;padding:3px 10px;border-radius:100px;margin-bottom:16px}
  ${allKeyframes()}
  [data-ani]{animation-duration:.7s;animation-timing-function:cubic-bezier(.4,0,.2,1);animation-fill-mode:forwards}
  [data-ani].ani-paused{opacity:0}
  [data-ani].ani-running{pointer-events:auto}
  ${allSelectors()}
</style></head><body>${compiled}</body></html>`);
  doc.close();

  // run observer inside iframe
  const w = iframe.contentWindow;
  let obs = new w.IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('ani-paused');
        e.target.classList.add('ani-running');
        o.unobserve(e.target);
      }
    });
  }, { threshold: .05 });

  w.document.querySelectorAll('[data-ani-stagger]').forEach(c => {
    const ms = parseFloat(c.dataset.aniStagger) || 100;
    c.querySelectorAll('[data-ani]').forEach((ch, i) => {
      const base = parseFloat(ch.dataset.aniDelay) || 0;
      ch.style.animationDelay = `${base + i * ms}ms`;
      if (ch.dataset.aniDuration) ch.style.animationDuration = ch.dataset.aniDuration;
      ch.classList.add('ani-paused');
    });
  });

  w.document.querySelectorAll('[data-ani]').forEach(el => {
    if (!el.classList.contains('ani-paused')) {
      if (el.dataset.aniDelay) el.style.animationDelay = el.dataset.aniDelay;
      if (el.dataset.aniDuration) el.style.animationDuration = el.dataset.aniDuration;
      el.classList.add('ani-paused');
    }
    obs.observe(el);
  });
}

/**
 * Initializes the playground component, adding necessary event listeners.
 */
export function initPlayground() {
  const pgrun = document.querySelector('.pgrun');
  if (pgrun) {
    pgrun.addEventListener('click', runPG);
  }
  const pgi = document.getElementById('pgi');
  if (pgi) {
    pgi.addEventListener('input', runPG);
  }

  // Attach event listeners to tabs
  document.querySelectorAll('.pgtab').forEach(tab => {
    tab.addEventListener('click', function () {
      let k = 'hero';
      if (this.textContent === 'Stagger') k = 'stagger';
      if (this.textContent === 'Mixed') k = 'mixed';
      loadEx(k);
    });
  });

  loadEx('hero');
}
