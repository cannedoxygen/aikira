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
});

// Main initialization function that calls all module initializers
function initializeAll() {
    // Initialize Components
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
    document.addEventListener('DOMContentLoaded', function() {
        function alignBottoms() {
            const terminal = document.querySelector('.ai-terminal');
            const mascot = document.querySelector('.mascot-container');
            const heroLeft = document.querySelector('.hero-left');
            const logoArea = document.querySelector('.hero-logo-area');
            
            if (terminal && mascot && heroLeft && logoArea && window.innerWidth > 768) {
                // Get heights
                const mascotHeight = mascot.offsetHeight;
                const logoHeight = logoArea.offsetHeight;
                const terminalHeight = terminal.offsetHeight;
                
                // Space needed between logo and terminal
                const spacingNeeded = mascotHeight - logoHeight - terminalHeight;
                
                // Add margin if needed
                if (spacingNeeded > 0) {
                    terminal.style.marginTop = spacingNeeded + 'px';
                } else {
                    terminal.style.marginTop = '20px';
                }
            } else if (terminal) {
                // Reset on mobile
                terminal.style.marginTop = '20px';
            }
        }
        
        // Initial alignment
        setTimeout(alignBottoms, 500);
        
        // Realign on resize
        window.addEventListener('resize', alignBottoms);
    });
}

// Call the smooth scrolling setup
setupSmoothScrolling();