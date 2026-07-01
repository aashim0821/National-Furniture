/* =============================================
   NATIONAL HOME APPLIANCES — PITCH DEMO
   Interactive Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isActive);
            
            // Hamburger animation class could go here if needed
            mobileToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // --- Intersection Observer for Animations ---
    const animateElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Staggering effect for siblings
                    const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
                    let delay = 0;
                    siblings.forEach((sibling, index) => {
                        if (sibling === entry.target) delay = index * 150; // 150ms delay between items
                    });
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animateElements.forEach(el => el.classList.add('animate-in'));
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
