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
