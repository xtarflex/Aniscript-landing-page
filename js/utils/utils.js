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
        const originalContent = this.innerHTML;
        this.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sky)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        this.classList.add('active');
        setTimeout(() => {
          this.innerHTML = originalContent;
          this.classList.remove('active');
        }, 2000);
      });
    });
  });
}
