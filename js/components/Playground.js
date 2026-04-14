/**
 * @file Playground.js
 * @description Handles the interactive Playground section using aniscript.
 */
import { compile } from 'aniscript';
import aniStyles from '../../css/components/aniscript_keyframes.css?raw';

const exs = {
  hero: `:: fade-down | @100ms | dur:0.8s :: {\n  <h2>Experience Motion</h2>\n}\n:: fade-up | @400ms :: {\n  <p>A declarative DSL for modern web animations.</p>\n}\n:: zoom-in-sm | @700ms :: {\n  <button>Get Started Free</button>\n}`,
  stagger: `[[ stagger: 150ms ]]\n  :: zoom-in-sm :: { <div class="card"><h3>Card One</h3><p>Stagger is automatic.</p></div> }\n  :: zoom-in-sm :: { <div class="card"><h3>Card Two</h3><p>Each child is offset.</p></div> }\n  :: zoom-in-sm :: { <div class="card"><h3>Card Three</h3><p>No math required.</p></div> }\n[[/]]`,
  mixed: `:: blur-in | @0ms | dur:1s :: {\n  <div class="tag">New Release</div>\n}\n:: fade-down | @300ms :: {\n  <h2>AniScript v1.1.3</h2>\n}\n:: fade-up | @550ms :: {\n  <p>The animation DSL is now on npm.</p>\n}\n[[ stagger: 130ms ]]\n  :: fade-left :: { <div class="card"><h3>Compiler</h3><p>DSL to HTML</p></div> }\n  :: fade-left :: { <div class="card"><h3>Runtime</h3><p>Observer-based triggers</p></div> }\n[[/]]`
};


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
  const pgo = document.getElementById('pgo');
  if (!iframe || !pgi || !pgo) return;

  const inputVal = pgi.value;

  // update URL with query param
  const url = new URL(window.location.href);
  url.searchParams.set('dsl', encodeURIComponent(inputVal));
  window.history.replaceState({}, '', url);

  const compiled = compile(inputVal);
  pgo.value = compiled;

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
  ${aniStyles}
  [data-ani]{animation-duration:.7s;animation-timing-function:cubic-bezier(.4,0,.2,1);animation-fill-mode:both}
  [data-ani].ani-paused:not([data-ani^="hover:"]):not([data-ani^="click:"]){opacity:0;pointer-events:none}
  [data-ani].ani-running{pointer-events:auto}
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
  const toggleBtn = document.getElementById("pg_toggle_btn");
  const copyBtn = document.getElementById("pg_copy_btn");
  const pgp = document.getElementById("pgp");
  const pgo = document.getElementById("pgo");
  if (toggleBtn && pgp && pgo) {
    toggleBtn.addEventListener("click", () => {
      if (pgo.style.display === "none") {
        pgo.style.display = "block";
        pgp.style.display = "none";
        toggleBtn.textContent = "Show Preview";
        if (copyBtn) copyBtn.style.display = "inline-block";
      } else {
        pgo.style.display = "none";
        pgp.style.display = "block";
        toggleBtn.textContent = "Show HTML";
        if (copyBtn) copyBtn.style.display = "none";
      }
    });
  }
  if (copyBtn && pgo) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(pgo.value).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
      });
    });
  }

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
