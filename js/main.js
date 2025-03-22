/**
 * Aikira ($AIKIRA) - Main JavaScript
 * Base's #1 100% AI-Governed DAO
 * 
 * This is the main JS file that imports all modules
 */

// Import Component Behaviors - using named imports
import { startTypingAnimation, initTerminalCursors } from './components/terminal.js';

// Determine if this is the main index page or a section page
const isMainPage = window.location.pathname.endsWith('index.html') || 
                  window.location.pathname.endsWith('/') || 
                  window.location.pathname === '';

// Invoke terminal animation directly to ensure it runs
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aikira ($AIKIRA) - JavaScript initialized');
    
    // Initialize terminals immediately
    console.log('Initializing Terminals directly');
    startTypingAnimation();
    initTerminalCursors();
    
    // Initialize all other modules
    initializeAll();
    
    // Only run these on the specific pages they're needed
    if (document.getElementById('roadmap')) {
        ensureRoadmapVisible();
    }
    
    if (document.getElementById('constitution')) {
        initializeConstitution();
    }
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
    initializeGridAnimations();
    
    // Initialize Utilities
    initializePerformanceMonitoring();
    initializeScrollEffects();
}

// The rest of your JavaScript remains the same...