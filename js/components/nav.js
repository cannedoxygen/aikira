/**
 * Aikira ($AIKIRA) - Navigation Component
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles navigation functionality:
 * - Mobile navigation toggle
 * - Active link highlighting
 * - Smooth scrolling
 * - Header behavior
 */

// Initialize navigation functionality
function initializeNavigation() {
    console.log("Initializing navigation");
    
    // Initialize mobile navigation toggle
    initializeMobileNav();
    
    // Set up navigation link highlighting
    initializeNavHighlighting();
    
    // Set up navigation observation for section changes
    observeNavigationLinks();
}

// Mobile navigation functionality
function initializeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (!navToggle || !nav) {
        console.log("Mobile navigation elements not found");
        return;
    }
    
    console.log("Setting up mobile navigation toggle");
    
    // Toggle mobile navigation when hamburger icon is clicked
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        this.classList.toggle('active');
        
        // Add aria-expanded attribute for accessibility
        const isExpanded = nav.classList.contains('open');
        this.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scrolling when nav is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        const isNavOpen = nav.classList.contains('open');
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (isNavOpen && !isClickInsideNav && !isClickOnToggle) {
            nav.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile nav when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('open')) {
            nav.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile nav when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            }
        });
    });
}

// Handle navigation link highlighting
function initializeNavHighlighting() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Special case for index.html
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        // For homepage, we'll handle highlighting based on scroll position
        // This will be handled by the scroll.js module
        return;
    }
    
    // For other pages, highlight based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove all active classes first
        link.classList.remove('active');
        
        // Add active class if href matches current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Observe navigation links for intersection with sections
function observeNavigationLinks() {
    // Skip this function on sub-pages
    if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        return;
    }
    
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) {
        return;
    }
    
    // Create intersection observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink(entry.target.id);
            }
        });
    }, { threshold: 0.4 }); // Require 40% of section to be visible
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Update active navigation link based on visible section
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Initialize dropdown menus if they exist
function initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (dropdownToggles.length === 0) {
        return;
    }
    
    console.log("Setting up dropdown menus");
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            const isOpen = dropdown.classList.contains('show');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('show');
                }
            });
            
            // Toggle this dropdown
            dropdown.classList.toggle('show');
            
            // Set aria-expanded
            this.setAttribute('aria-expanded', !isOpen);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
        
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.setAttribute('aria-expanded', false);
        });
    });
}

// Create breadcrumbs for pages
function createBreadcrumbs() {
    // Skip on homepage
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        return;
    }
    
    const breadcrumbContainer = document.querySelector('.breadcrumbs');
    if (!breadcrumbContainer) {
        return;
    }
    
    console.log("Creating breadcrumbs");
    
    // Get current page
    const currentPage = window.location.pathname.split('/').pop();
    const pageName = currentPage.replace('.html', '');
    
    // Create breadcrumb items
    breadcrumbContainer.innerHTML = `
        <a href="index.html">Home</a> 
        <span class="breadcrumb-separator">›</span> 
        <span class="current">${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</span>
    `;
}

// Add accessibility features to navigation
function enhanceNavigationAccessibility() {
    // Add aria attributes to nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('role', 'button');
        navToggle.setAttribute('tabindex', '0');
        
        // Allow toggle with keyboard
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Add aria attributes to dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', 'false');
    });
    
    // Add skip to content link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Export functions for use in main.js
export {
    initializeNavigation,
    initializeDropdowns,
    createBreadcrumbs,
    enhanceNavigationAccessibility
};