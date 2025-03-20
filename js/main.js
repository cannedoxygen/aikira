/**
 * Aikira ($AIKIRA) - Main JavaScript
 * Base's #1 100% AI-Governed DAO
 * 
 * This is the main JS file that imports all modules
 */

// Import Component Behaviors - using named imports
import { startTypingAnimation, initTerminalCursors } from './components/terminal.js';

// Invoke terminal animation directly to ensure it runs
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aikira ($AIKIRA) - JavaScript initialized');
    
    // Initialize terminals immediately
    console.log('Initializing Terminals directly');
    startTypingAnimation();
    initTerminalCursors();
    
    // Initialize all other modules
    initializeAll();
    
    // Add specific fix for roadmap section
    ensureRoadmapVisible();
    
    // Add specific fix for constitution section
    initializeConstitution();
});

// Main initialization function that calls all module initializers
function initializeAll() {
    // Initialize Components
    initializeProgressBars();
    initializeNavigation();
    
    // Initialize Animations
    initializeParticles();
    initializeCircuitAnimations();
    initializeHoverEffects();
    initializeGridAnimations(); // Add this line
    
    // Initialize Utilities
    initializePerformanceMonitoring();
    initializeScrollEffects();
}

// Component initializers
function initializeProgressBars() {
    console.log('Initializing Progress Bars');
    // This will be implemented in components/progress-bars.js
    if (typeof animateProgressBars === 'function') {
        animateProgressBars();
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
            navToggle.classList.toggle('active');
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

function initializeGridAnimations() {
    console.log('Initializing Grid Animations');
    // If the grid-animations.js file isn't properly loading, initialize directly
    if (typeof window.aikiraPulseGrid === 'undefined') {
        // Create a basic grid animation
        const circuitBg = document.querySelector('.circuit-background');
        const gridLines = document.querySelector('.grid-lines');
        
        if (circuitBg && gridLines) {
            // Make sure grid is styled
            gridLines.style.backgroundImage = `
                linear-gradient(to right, rgba(194, 163, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(194, 163, 255, 0.1) 1px, transparent 1px)
            `;
            gridLines.style.backgroundSize = '30px 30px';
        }
    } else if (typeof window.aikiraPulseGrid.start === 'function') {
        window.aikiraPulseGrid.start();
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
    
    // Fallback for scroll top button if utils/scroll.js doesn't load
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        // Show button when scrolled down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Ensure the roadmap section is visible
function ensureRoadmapVisible() {
    // Wait a short time to ensure DOM is fully loaded
    setTimeout(function() {
        console.log('Ensuring roadmap section visibility');
        const roadmapSection = document.getElementById('roadmap');
        
        if (roadmapSection) {
            // Make sure roadmap section is displayed
            roadmapSection.style.display = 'block';
            roadmapSection.style.visibility = 'visible';
            roadmapSection.style.opacity = '1';
            
            // Force progress bars to show percentages
            const distributionItems = document.querySelectorAll('.distribution-item');
            distributionItems.forEach(item => {
                const titleSpans = item.querySelectorAll('.distribution-title span');
                if (titleSpans.length >= 2) {
                    const percentText = titleSpans[1].textContent.trim();
                    const progressFill = item.querySelector('.progress-fill');
                    
                    if (progressFill) {
                        progressFill.style.width = percentText;
                    }
                }
            });
            
            // Make roadmap items visible
            const roadmapItems = document.querySelectorAll('.roadmap-item');
            roadmapItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 200 * index);
            });
        }
    }, 500);
}

// Initialize the Constitution section
function initializeConstitution() {
    setTimeout(function() {
        console.log('Initializing Constitution section');
        const constitutionSection = document.getElementById('constitution');
        
        if (constitutionSection) {
            // Ensure section is visible
            constitutionSection.style.display = 'block';
            constitutionSection.style.visibility = 'visible';
            constitutionSection.style.opacity = '1';
            
            // Make sure the terminal styling is applied
            const terminal = constitutionSection.querySelector('.constitution-terminal');
            if (terminal) {
                terminal.style.backgroundColor = 'rgba(40, 42, 54, 0.9)';
                terminal.style.color = '#f8f8f2';
                terminal.style.boxShadow = '0 0 30px rgba(194, 163, 255, 0.5)';
            }
            
            // Make commandment items visible with a staggered effect
            const commandmentItems = document.querySelectorAll('.commandment-item');
            commandmentItems.forEach((item, index) => {
                // Set initial style
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                // Animate in with delay
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 150 * index);
            });
        }
    }, 800);
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
                    const navToggle = document.querySelector('.nav-toggle');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                    }
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

// Add manual polyfill for document.addEventListener in case it's not defined
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}

// Check if the DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSmoothScrolling);
} else {
    // DOM is already loaded, run setupSmoothScrolling immediately
    setupSmoothScrolling();
}

// Additional Fallback for CSS Loading Issues
// This ensures critical CSS properties are applied
function ensureCriticalStyles() {
    // Make sure the circuit background is styled correctly
    const circuitBg = document.querySelector('.circuit-background');
    if (circuitBg) {
        circuitBg.style.position = 'fixed';
        circuitBg.style.top = '0';
        circuitBg.style.left = '0';
        circuitBg.style.width = '100%';
        circuitBg.style.height = '100%';
        circuitBg.style.overflow = 'hidden';
        circuitBg.style.zIndex = '0';
    }
    
    // Make sure the grid lines are styled correctly
    const gridLines = document.querySelector('.grid-lines');
    if (gridLines) {
        gridLines.style.position = 'absolute';
        gridLines.style.top = '0';
        gridLines.style.left = '0';
        gridLines.style.width = '100%';
        gridLines.style.height = '100%';
        gridLines.style.backgroundImage = `
            linear-gradient(to right, rgba(194, 163, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(194, 163, 255, 0.1) 1px, transparent 1px)
        `;
        gridLines.style.backgroundSize = '30px 30px';
        gridLines.style.pointerEvents = 'none';
        gridLines.style.zIndex = '-1';
    }
    
    // Ensure the container is styled correctly
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.maxWidth = '1200px';
        container.style.margin = '0 auto';
        container.style.padding = '0 20px';
        container.style.position = 'relative';
        container.style.zIndex = '5';
    });
}

// Run critical style function
document.addEventListener('DOMContentLoaded', ensureCriticalStyles);