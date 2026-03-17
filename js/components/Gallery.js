/**
 * @file Gallery.js
 * @description Handles the animation gallery preview and filtering.
 */

const anis=[
  {n:'fade-in',c:'fade'},{n:'fade-up',c:'fade'},{n:'fade-down',c:'fade'},{n:'fade-left',c:'fade'},{n:'fade-right',c:'fade'},
  {n:'fade-up-sm',c:'fade'},{n:'fade-up-lg',c:'fade'},{n:'fade-down-sm',c:'fade'},{n:'fade-down-lg',c:'fade'},
  {n:'fade-left-sm',c:'fade'},{n:'fade-right-sm',c:'fade'},{n:'fade-up-left',c:'fade'},{n:'fade-up-right',c:'fade'},
  {n:'fade-down-left',c:'fade'},{n:'fade-down-right',c:'fade'},
  {n:'zoom-in',c:'zoom'},{n:'zoom-in-sm',c:'zoom'},{n:'zoom-in-lg',c:'zoom'},{n:'zoom-out',c:'zoom'},
  {n:'zoom-out-sm',c:'zoom'},{n:'zoom-out-lg',c:'zoom'},{n:'zoom-in-up',c:'zoom'},{n:'zoom-in-down',c:'zoom'},
  {n:'slide-in-up',c:'slide'},{n:'slide-in-down',c:'slide'},{n:'slide-in-left',c:'slide'},{n:'slide-in-right',c:'slide'},
  {n:'bounce-in',c:'bounce'},{n:'bounce-up',c:'bounce'},{n:'bounce-down',c:'bounce'},{n:'bounce-left',c:'bounce'},{n:'bounce-right',c:'bounce'},
  {n:'slide-bounce-up',c:'bounce'},{n:'slide-bounce-down',c:'bounce'},{n:'slide-bounce-left',c:'bounce'},{n:'slide-bounce-right',c:'bounce'},
  {n:'blur-in',c:'blur'},{n:'blur-in-sm',c:'blur'},{n:'blur-in-lg',c:'blur'},{n:'blur-out',c:'blur'},
  {n:'shake-h',c:'attention'},{n:'shake-v',c:'attention'},{n:'pulse',c:'attention'},{n:'swing',c:'attention'},
  {n:'jello',c:'attention'},{n:'wobble',c:'attention'},{n:'rubber-band',c:'attention'},
  {n:'flip-x',c:'flip'},{n:'flip-y',c:'flip'},{n:'rotate-in-cw',c:'flip'},{n:'rotate-in-ccw',c:'flip'},{n:'rotate-up',c:'flip'},{n:'rotate-down',c:'flip'},
];

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
        g.addEventListener('click', (e) => {
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
