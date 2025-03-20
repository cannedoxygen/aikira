/**
 * Aikira ($AIKIRA) - Standalone Grid Animations
 * Base's #1 100% AI-Governed DAO
 * 
 * This script creates a pulsating grid effect without using ES6 modules
 * or interfering with other parts of the website.
 */

// Wrap everything in a self-executing function to avoid globals
(function() {
    // Animation control
    let isAnimating = true;
    let animationInterval = null;
    
    // Initialize when the document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGridAnimation);
    } else {
        initGridAnimation();
    }
    
    // Main initialization function
    function initGridAnimation() {
        console.log("Grid Animation: Initializing");
        
        // Find the circuit background elements
        const circuitBg = document.querySelector('.circuit-background');
        const gridLines = document.querySelector('.grid-lines');
        
        if (!circuitBg || !gridLines) {
            console.error("Grid Animation: Required elements not found");
            return;
        }
        
        // Ensure grid is properly styled
        gridLines.style.backgroundImage = `
            linear-gradient(to right, rgba(194, 163, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(194, 163, 255, 0.1) 1px, transparent 1px)
        `;
        gridLines.style.backgroundSize = '30px 30px';
        
        // Start grid pulsation
        startGridPulsation(circuitBg);
        
        // Add a small info message just to confirm the script is running
        const infoMsg = document.createElement('div');
        infoMsg.style.position = 'fixed';
        infoMsg.style.bottom = '10px';
        infoMsg.style.left = '10px';
        infoMsg.style.background = 'rgba(0,0,0,0.7)';
        infoMsg.style.color = 'white';
        infoMsg.style.padding = '5px 10px';
        infoMsg.style.borderRadius = '5px';
        infoMsg.style.fontSize = '12px';
        infoMsg.style.opacity = '0.7';
        infoMsg.style.zIndex = '9999';
        infoMsg.textContent = 'Grid animation running';
        document.body.appendChild(infoMsg);
        
        // Remove info message after 5 seconds
        setTimeout(function() {
            infoMsg.style.opacity = '0';
            infoMsg.style.transition = 'opacity 0.5s';
            setTimeout(function() {
                document.body.removeChild(infoMsg);
            }, 500);
        }, 5000);
    }
    
    // Start the grid pulsation effect
    function startGridPulsation(container) {
        // Clear any existing animation
        if (animationInterval) {
            clearInterval(animationInterval);
        }
        
        // Create and start the first pulse
        createGridPulse(container);
        
        // Start repeating pulse
        animationInterval = setInterval(function() {
            if (isAnimating) {
                createGridPulse(container);
            }
        }, 4000); // Pulse every 4 seconds
    }
    
    // Create a single grid pulse
    function createGridPulse(container) {
        // Get center of the screen for transform origin
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create pulse overlay
        const pulse = document.createElement('div');
        pulse.className = 'grid-pulse-overlay';
        pulse.style.position = 'absolute';
        pulse.style.top = '0';
        pulse.style.left = '0';
        pulse.style.width = '100%';
        pulse.style.height = '100%';
        pulse.style.backgroundImage = `
            linear-gradient(to right, rgba(166, 255, 181, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(166, 255, 181, 0.5) 1px, transparent 1px)
        `;
        pulse.style.backgroundSize = '30px 30px';
        pulse.style.pointerEvents = 'none';
        pulse.style.zIndex = '100';
        pulse.style.transformOrigin = `${centerX}px ${centerY}px`;
        pulse.style.transform = 'scale(0.8)';
        pulse.style.opacity = '0.7';
        
        // Add to container
        container.appendChild(pulse);
        
        // Force reflow
        void pulse.offsetWidth;
        
        // Start animation
        pulse.style.transition = 'transform 2.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 2.5s cubic-bezier(0.19, 1, 0.22, 1)';
        pulse.style.transform = 'scale(1.3)';
        pulse.style.opacity = '0';
        
        // Remove after animation completes
        setTimeout(function() {
            if (pulse.parentNode) {
                pulse.parentNode.removeChild(pulse);
            }
        }, 2500);
    }
    
    // Expose minimal API
    window.aikiraPulseGrid = {
        start: function() {
            isAnimating = true;
            const container = document.querySelector('.circuit-background');
            if (container) {
                startGridPulsation(container);
            }
        },
        stop: function() {
            isAnimating = false;
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
            }
            
            // Remove any existing pulses
            document.querySelectorAll('.grid-pulse-overlay').forEach(function(pulse) {
                if (pulse.parentNode) {
                    pulse.parentNode.removeChild(pulse);
                }
            });
        }
    };
})();