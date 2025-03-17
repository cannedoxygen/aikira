/**
 * Aikira ($AIKIRA) - Scroll Utilities
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles all scroll-related functionality:
 * - Scroll animations for sections and elements
 * - Header style changes on scroll
 * - Scroll to top button
 * - Navigation highlighting based on scroll position
 */

// Initialize all scroll-based animations
function handleScrollAnimations() {
    console.log("Initializing scroll animations");
    
    // Animate sections on scroll
    animateSectionsOnScroll();
    
    // Animate specific elements like roadmap items
    animateRoadmapItems();
    
    // Initialize scroll reveal for cards and features
    initScrollReveal();
}

// Section animations on scroll
function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('section');
    
    if (sections.length === 0) {
        console.log("No sections found");
        return;
    }
    
    console.log(`Found ${sections.length} sections to animate`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Animate roadmap items with staggered effect
function animateRoadmapItems() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    if (roadmapItems.length === 0) {
        return;
    }
    
    console.log(`Found ${roadmapItems.length} roadmap items to animate`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for a cascading effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 200 * index);
            }
        });
    }, { threshold: 0.1 });
    
    roadmapItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize scroll reveal for cards and features
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.card, .feature-item');
    
    if (revealElements.length === 0) {
        return;
    }
    
    console.log(`Found ${revealElements.length} elements for scroll reveal`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fadeIn');
                    entry.target.style.opacity = 1;
                }, 100 * (index % 3)); // Group by 3s for staggered effect
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(element => {
        // Set initial state for animation
        element.style.opacity = 0;
        observer.observe(element);
    });
}

// Handle header style changes on scroll
function handleHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) {
        console.log("Header not found");
        return;
    }
    
    console.log("Initializing header scroll effect");
    
    // Initial check on page load
    checkHeaderScroll(header);
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        checkHeaderScroll(header);
    });
}

// Check header scroll position and apply classes
function checkHeaderScroll(header) {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Handle scroll to top button visibility and functionality
function handleScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (!scrollTopBtn) {
        console.log("Scroll to top button not found");
        return;
    }
    
    console.log("Initializing scroll to top button");
    
    // Initial check on page load
    checkScrollToTopVisibility(scrollTopBtn);
    
    // Show or hide button based on scroll position
    window.addEventListener('scroll', () => {
        checkScrollToTopVisibility(scrollTopBtn);
    });
    
    // Add click event to scroll back to top
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Check scroll position for scroll-to-top button visibility
function checkScrollToTopVisibility(scrollTopBtn) {
    // Show button when user scrolls down 300px
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

// Highlight active navigation links based on scroll position
function handleNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (sections.length === 0 || navLinks.length === 0) {
        return;
    }
    
    console.log("Initializing navigation highlight on scroll");
    
    // Initial check on page load
    highlightNavLinks(sections, navLinks);
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        highlightNavLinks(sections, navLinks);
    });
}

// Determine which section is currently in view and highlight nav link
function highlightNavLinks(sections, navLinks) {
    let current = '';
    const scrollPosition = window.scrollY + 200; // Adding offset for better UX
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === `#${current}` || (href.endsWith(`${current}.html`))) {
            link.classList.add('active');
        }
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    if (anchorLinks.length === 0) {
        return;
    }
    
    console.log("Setting up smooth scrolling for anchor links");
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile navigation if it's open
                const nav = document.querySelector('nav');
                if (nav && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                }
                
                // Scroll to the target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Export functions for use in main.js
export {
    handleScrollAnimations,
    handleHeaderScroll,
    handleScrollToTop,
    handleNavHighlight,
    setupSmoothScrolling
};