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
import { initNavDock } from './components/Nav.js';
import { cpyCode, initUrlCopier  } from './utils/utils.js';

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
    initUrlCopier();

    // Mobile Nav Dock Scroll Indicator & Active Section Logic
    initNavDock();
}

document.addEventListener('DOMContentLoaded', initializeApp);
