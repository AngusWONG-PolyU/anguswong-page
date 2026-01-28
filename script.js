// Dark Mode Toggle & Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;
    
    // Icon elements
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
        darkIconMobile.classList.remove('hidden');
        lightIconMobile.classList.add('hidden');
    } else {
        htmlElement.classList.remove('dark');
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
        darkIconMobile.classList.add('hidden');
        lightIconMobile.classList.remove('hidden');
    }
    
    // Toggle theme function
    function toggleTheme() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            darkIconMobile.classList.add('hidden');
            lightIconMobile.classList.remove('hidden');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
            darkIconMobile.classList.remove('hidden');
            lightIconMobile.classList.add('hidden');
        }
    }
    
    // Add click event listeners
    themeToggleBtn.addEventListener('click', toggleTheme);
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation link on scroll
    function highlightNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('text-primary');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Skill Progress Bar Animation
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const targetWidth = entry.target.dataset.progress || '80';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 200);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
    
    // Navbar hide on scroll down, show on scroll up
    let lastScroll = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
    // Skill cards animation on hover
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #2563eb';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
    
    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTop = '4px solid #2563eb';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTop = 'none';
        });
    });
    
    // Add typing effect to the hero title (optional enhancement)
    // Implementation: preserve element nodes (e.g. <span class="...">) and only type text nodes
    const heroTitle = document.querySelector('.animate-fade-in');
    if (heroTitle) {
        const originalNodes = Array.from(heroTitle.childNodes);
        // clear container
        heroTitle.innerHTML = '';

        // collect targets: leaf text nodes to be typed into
        const targets = [];

        function buildPlaceholder(node, parent) {
            if (node.nodeType === Node.TEXT_NODE) {
                const textNode = document.createTextNode('');
                parent.appendChild(textNode);
                targets.push({ node: textNode, text: node.textContent });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const clone = node.cloneNode(false); // shallow clone (attributes preserved)
                parent.appendChild(clone);
                node.childNodes.forEach(child => buildPlaceholder(child, clone));
            } else {
                // other node types: ignore but preserve structure
            }
        }

        originalNodes.forEach(n => buildPlaceholder(n, heroTitle));

        // typing loop across targets
        let tIndex = 0;
        let cIndex = 0;

        function typeStep() {
            if (tIndex >= targets.length) return;
            const target = targets[tIndex];
            if (cIndex < target.text.length) {
                target.node.nodeValue += target.text.charAt(cIndex);
                cIndex++;
                setTimeout(typeStep, 35);
            } else {
                tIndex++;
                cIndex = 0;
                setTimeout(typeStep, 35);
            }
        }

        // start after a short delay
        setTimeout(typeStep, 400);
    }
    
    // Back to top button (optional)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-primary dark:bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-secondary dark:hover:bg-blue-700 transition-all opacity-0 pointer-events-none z-50 hover:scale-110';
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Console message for developers
    console.log('%c👋 Welcome to Angus WONG\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%c✨ Dark mode available - click the theme toggle button!', 'font-size: 14px; color: #7c3aed;');
    console.log('%c🚀 Enjoy exploring!', 'font-size: 12px; color: #10b981;');
});
