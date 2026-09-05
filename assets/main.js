document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Nav Toggle (centralized — replaces inline onclick) ──
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ── Navbar Scroll Effect (centralized — replaces inline <script> on index.html) ──
    const navbar = document.getElementById('navbar');
    if (navbar && navbar.classList.contains('transparent')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('transparent');
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.add('transparent');
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Scroll Indicator ──
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const contenu = document.getElementById('contenu');
            if (contenu) {
                contenu.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ── Page Transition Fade Out ──
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            // Skip if modifier key held (Ctrl/Cmd/Shift+Click for new tab)
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
            // Only animate for internal relative links
            if (target && !target.startsWith('#') && !target.startsWith('http') && !target.startsWith('mailto') && !target.startsWith('tel') && this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = target;
                }, 300);
            }
        });
    });

    // ── Contact Form Confirmation ──
    const contactForm = document.querySelector('form[data-contact-form]');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = contactForm.querySelector('.form-success');
            if (successMsg) {
                successMsg.classList.add('visible');
                contactForm.reset();
                setTimeout(() => {
                    successMsg.classList.remove('visible');
                }, 5000);
            }
        });
    }
});

// ── Bfcache Fix: restore visibility when navigating back ──
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.classList.remove('fade-out');
    }
});
