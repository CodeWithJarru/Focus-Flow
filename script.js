// Function to load HTML components
async function loadComponent(id, url, callback) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        if (callback) callback();
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Load Navbar and Footer
    loadComponent('navbar', 'navbar.html', initNavbarLogic);
    loadComponent('footer', 'footer.html');

    function initNavbarLogic() {
        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');

                // Prevent scrolling when menu is open
                if (navLinks.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Active link highlighting
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active-link');
            }
        });
    }

    // Hero image placeholder - Productivity themed
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        heroImage.src = 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=2070';
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements (using a small timeout strings newly fetched elements can be caught)
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .pricing-card, .cta-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }, 500);
});
