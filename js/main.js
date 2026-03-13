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

    // Attach cpyCode listeners to copy buttons
    document.querySelectorAll('.cpybtn').forEach(btn => {
        btn.addEventListener('click', function() {
            cpyCode(this);
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);
