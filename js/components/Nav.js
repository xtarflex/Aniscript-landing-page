/**
 * @file Nav.js
 * @description Logic for the navigation bar, including the mobile dock scroll indicator and active section scroll-spy.
 */

export function initNavDock() {
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
