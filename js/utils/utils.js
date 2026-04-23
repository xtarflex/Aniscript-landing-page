/**
 * Utilities
 */

/**
 * Copies the text content of the parent element of the provided button,
 * excluding the "copy" text itself.
 *
 * @param {HTMLElement} btn - The button element that was clicked.
 * @returns {void}
 */
export function cpyCode(btn) {
  const text = btn.parentElement.innerText.replace(/^copy\n?/, '').trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'copied!';
    setTimeout(() => { btn.textContent = 'copy'; }, 1600);
  });
}

/**
 * Initializes the copy URL buttons on the page.
 * Attaches click event listeners to elements with the '.copy-url-btn' class.
 *
 * @returns {void}
 */
export function initUrlCopier() {
  document.querySelectorAll('.copy-url-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        // Securely preserve original nodes to avoid re-parsing HTML
        const originalNodes = Array.from(this.childNodes);

        // Create the success SVG element securely
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const attrs = {
          width: '18',
          height: '18',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'var(--sky)',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        };
        for (const [key, value] of Object.entries(attrs)) {
          svg.setAttribute(key, value);
        }

        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '20 6 9 17 4 12');
        svg.appendChild(polyline);

        // Replace children without using innerHTML
        this.replaceChildren(svg);
        this.classList.add('active');

        setTimeout(() => {
          this.replaceChildren(...originalNodes);
          this.classList.remove('active');
        }, 2000);
      });
    });
  });
}

/**
 * Throttles a function using requestAnimationFrame.
 * This is useful for performance-heavy tasks like scroll and resize event handlers.
 *
 * @param {Function} fn - The function to throttle.
 * @returns {Function} - The throttled function.
 */
export function rafThrottle(fn) {
    let ticking = false;
    return (...args) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                fn(...args);
                ticking = false;
            });
            ticking = true;
        }
    };
}
