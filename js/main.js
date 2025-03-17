/**
 * Aikira ($AIKIRA) - Main JavaScript
 * Base's #1 100% AI-Governed DAO
 * 
 * This is the main JS file that imports all modules
 */

// Import Component Behaviors
import './components/terminal.js';
import './components/progress-bars.js';
import './components/wallet-form.js';
import './components/nav.js';

// Import Animations
import './animations/particles.js';
import './animations/circuit.js';
import './animations/hover-effects.js';

// Import Utilities
import './utils/performance.js';
import './utils/scroll.js';

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aikira ($AIKIRA) - JavaScript initialized');
    
    // Initialize all modules
    initializeAll();
});

// Main initialization function that calls all module initializers
function initializeAll() {
    // Initialize Components
    initializeTerminals();
    initializeProgressBars();
    initializeWalletForm();
    initializeNavigation();
    
    // Initialize Animations
    initializeParticles();
    initializeCircuitAnimations();
    initializeHoverEffects();
    
    // Initialize Utilities
    initializePerformanceMonitoring();
    initializeScrollEffects();
}

// Component initializers
function initializeTerminals() {
    console.log('Initializing Terminals');
    // This will be implemented in components/terminal.js
    if (typeof startTypingAnimation === 'function') {
        startTypingAnimation();
    }
}

function initializeProgressBars() {
    console.log('Initializing Progress Bars');
    // This will be implemented in components/progress-bars.js
    if (typeof animateProgressBars === 'function') {
        animateProgressBars();
    }
}

function initializeWalletForm() {
    console.log('Initializing Wallet Form');
    // This will be implemented in components/wallet-form.js
    if (typeof setupWalletForm === 'function') {
        setupWalletForm();
    }
}

function initializeNavigation() {
    console.log('Initializing Navigation');
    // This will be implemented in components/nav.js
    if (typeof handleNavHighlight === 'function') {
        handleNavHighlight();
    }
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
}

// Animation initializers
function initializeParticles() {
    console.log('Initializing Particles');
    // This will be implemented in animations/particles.js
    if (typeof createParticles === 'function') {
        createParticles();
    }
}

function initializeCircuitAnimations() {
    console.log('Initializing Circuit Animations');
    // This will be implemented in animations/circuit.js
    if (typeof createCircuitBoard === 'function') {
        createCircuitBoard();
    }
}

function initializeHoverEffects() {
    console.log('Initializing Hover Effects');
    // This will be implemented in animations/hover-effects.js
    if (typeof initHoverEffects === 'function') {
        initHoverEffects();
    }
}

// Utility initializers
function initializePerformanceMonitoring() {
    console.log('Initializing Performance Monitoring');
    // This will be implemented in utils/performance.js
    if (typeof monitorPerformance === 'function') {
        monitorPerformance();
    }
}

function initializeScrollEffects() {
    console.log('Initializing Scroll Effects');
    // This will be implemented in utils/scroll.js
    if (typeof handleScrollAnimations === 'function') {
        handleScrollAnimations();
    }
    
    if (typeof handleScrollToTop === 'function') {
        handleScrollToTop();
    }
    
    if (typeof handleHeaderScroll === 'function') {
        handleHeaderScroll();
    }
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
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

// Call the smooth scrolling setup
setupSmoothScrolling();