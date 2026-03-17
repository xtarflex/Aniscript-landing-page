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

    // Mobile Nav Dock Scroll Indicator & Active Section Logic
    const navDock = document.querySelector('.nav-dock');
    const nlinks = document.getElementById('nlinks');

    if (navDock && nlinks) {
        const updateScrollAuth = () => {
            const maxScrollLeft = nlinks.scrollWidth - nlinks.clientWidth;
            if (nlinks.scrollLeft > 0) {
                navDock.classList.add('scroll-left');
            } else {
                navDock.classList.remove('scroll-left');
            }

            if (Math.ceil(nlinks.scrollLeft) < maxScrollLeft) {
                navDock.classList.add('scroll-right');
            } else {
                navDock.classList.remove('scroll-right');
            }
        };

        nlinks.addEventListener('scroll', updateScrollAuth, { passive: true });
        window.addEventListener('resize', updateScrollAuth, { passive: true });
        // Delay initial check to ensure layout is complete
        setTimeout(updateScrollAuth, 100);

        // Active Section Observer
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nlinks a[href^="#"]');

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // trigger closer to the top of viewport
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            // Find the intersecting entry
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    let activeLink = null;

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                            activeLink = link;
                        }
                    });

                    // Scroll the active link into view in the dock
                    if (activeLink && window.innerWidth <= 768) {
                        const linkRect = activeLink.getBoundingClientRect();
                        const containerRect = nlinks.getBoundingClientRect();
                        // If link is outside the visible area, scroll to center it
                        if (linkRect.left < containerRect.left || linkRect.right > containerRect.right) {
                            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
