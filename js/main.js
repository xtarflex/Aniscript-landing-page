/**
 * @file main.js
 * @description Main entry point for the application. Initializes components and AniScript.
 */

// Import AniScript from node_modules
import { init } from 'aniscript';

// Import CSS mapping node_modules aniscript.css


// Import Components
import { initPlayground } from './components/Playground.js';
import { initGallery } from './components/Gallery.js';
import { cpyCode } from './utils/utils.js';

/**
 * Expose necessary functions to the global scope if needed by inline scripts (though we are refactoring to remove them).
 * Kept here just in case they are bound somewhere else dynamically.
 */
window.cpyCode = cpyCode;

/**
 * Initializes the application.
 */
function initializeApp() {
    // Initialize AniScript Runtime from npm package
    init({ threshold: 0.1 });

    // Initialize UI components
    initGallery();
    initPlayground();

    // Smooth scroll for internal links without changing URL hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Clean up URL if there is an existing hash
                history.replaceState('', document.title, window.location.pathname + window.location.search);
            }
        });
    });

    // Attach cpyCode listeners to copy buttons
    document.querySelectorAll('.cpybtn').forEach(btn => {
        btn.addEventListener('click', function () {
            cpyCode(this);
        });
    });
    // URL Copy Logic
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

document.addEventListener('DOMContentLoaded', initializeApp);
