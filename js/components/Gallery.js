/**
 * @file Gallery.js
 * @description Handles the animation gallery preview and filtering.
 */

import { anis } from '../data/animations.js';

let cf = 'all';

/**
 * Previews the animation on the specific card.
 * @param {string} name - Name of the animation.
 * @param {HTMLElement} card - The element to preview the animation on.
 */
export function prvAni(name, card) {
  const b = card.querySelector('.aprev');
  b.style.animationName = 'none';
  void b.offsetWidth; // trigger reflow
  b.style.cssText += `;animation-name:ani-${name};animation-duration:.7s;animation-timing-function:cubic-bezier(.4,0,.2,1);animation-fill-mode:both`;
}

/**
 * Renders the gallery grid based on current filter.
 */
export function rGal() {
  const g = document.getElementById('ggrid');
  if(!g) return;
  const list = cf === 'all' ? anis : anis.filter(a => a.c === cf);
  g.innerHTML = list.map(a => `<div class="acard" data-ani-name="${a.n}"><div class="aprev"></div><div class="aname">${a.n}</div></div>`).join('');
}

/**
 * Filters the gallery based on a given category.
 * @param {string} cat - Category to filter by.
 * @param {HTMLElement} btn - Button element that was clicked.
 */
export function fGal(cat, btn) {
  cf = cat;
  document.querySelectorAll('.gfbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  rGal();
}

/**
 * Initializes the gallery component.
 */
export function initGallery() {
    rGal();

    const g = document.getElementById('ggrid');
    if (g) {
        g.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.acard');
            if (card) {
                prvAni(card.dataset.aniName, card);
            }
        });
    }

    document.querySelectorAll('.gfbtn').forEach(btn => {
        btn.addEventListener('click', function() {
            fGal(this.dataset.filter, this);
        });
    });
}
