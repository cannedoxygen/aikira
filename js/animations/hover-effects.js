/**
 * Aikira ($AIKIRA) - Interactive Hover Effects
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles advanced hover effects and interactions
 * that enhance the user experience with subtle animations
 */

// Initialize hover effects
function initHoverEffects() {
    console.log("Initializing hover effects");
    
    // Get performance settings to determine animation complexity
    const performanceReduced = window.getPerformanceSettings 
        ? window.getPerformanceSettings().reducedPerformance 
        : false;
    
    // Skip advanced effects if on reduced performance mode
    if (performanceReduced) {
        console.log("Running in reduced performance mode - limiting hover effects");
        initBasicHoverEffects();
        return;
    }
    
    // Enhanced card hover effects
    initCardHoverEffects();
    
    // Button hover effects
    initButtonHoverEffects();
    
    // Terminal hover effects
    initTerminalHoverEffects();
    
    // Roadmap hover effects
    initRoadmapHoverEffects();
    
    // Feature icon hover effects
    initFeatureIconEffects();
}

// Basic hover effects for low-performance mode
function initBasicHoverEffects() {
    // Just use CSS hover effects, no JavaScript additions
    console.log("Using only CSS-based hover effects for better performance");
}

// Enhanced card hover effects with 3D tilt
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Get card dimensions and position
            const rect = this.getBoundingClientRect();
            
            // Calculate mouse position relative to the card
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate position in percentage
            const xPercent = mouseX / rect.width;
            const yPercent = mouseY / rect.height;
            
            // Calculate rotation (limited to ±10 degrees)
            const rotateX = (0.5 - yPercent) * 10;
            const rotateY = (xPercent - 0.5) * 10;
            
            // Apply transform
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Dynamic shadow based on mouse position
            const shadowX = (xPercent - 0.5) * 20;
            const shadowY = (yPercent - 0.5) * 20;
            this.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(167, 216, 247, 0.2),
                0 15px 30px rgba(167, 216, 247, 0.2)
            `;
            
            // Add glow effect where mouse is
            const glowX = mouseX;
            const glowY = mouseY;
            
            // Create or update glow element
            let glowElement = this.querySelector('.card-glow');
            
            if (!glowElement) {
                glowElement = document.createElement('div');
                glowElement.classList.add('card-glow');
                glowElement.style.position = 'absolute';
                glowElement.style.pointerEvents = 'none';
                glowElement.style.width = '150px';
                glowElement.style.height = '150px';
                glowElement.style.borderRadius = '50%';
                glowElement.style.background = 'radial-gradient(circle, rgba(167, 216, 247, 0.3) 0%, rgba(167, 216, 247, 0) 70%)';
                glowElement.style.transform = 'translate(-50%, -50%)';
                glowElement.style.zIndex = '0';
                this.appendChild(glowElement);
            }
            
            glowElement.style.left = `${glowX}px`;
            glowElement.style.top = `${glowY}px`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            const glowElement = this.querySelector('.card-glow');
            if (glowElement) {
                glowElement.parentNode.removeChild(glowElement);
            }
        });
    });
}

// Make buttons more interactive
function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .connect-wallet, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.03)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.03)';
        });
    });
}

// Add terminal interaction effects
function initTerminalHoverEffects() {
    const terminals = document.querySelectorAll('.ai-terminal');
    
    terminals.forEach(terminal => {
        // Add subtle glow effect on hover
        terminal.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(167, 216, 247, 0.8)';
        });
        
        terminal.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Make terminal controls interactive
        const controls = terminal.querySelectorAll('.terminal-control');
        
        controls.forEach(control => {
            control.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });
            
            control.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
            
            control.addEventListener('click', function() {
                // Simulate terminal control actions
                if (this.classList.contains('minimize')) {
                    const content = terminal.querySelector('.terminal-content');
                    content.style.display = content.style.display === 'none' ? '' : 'none';
                }
                
                if (this.classList.contains('maximize')) {
                    terminal.classList.toggle('maximized');
                    
                    if (terminal.classList.contains('maximized')) {
                        terminal.style.position = 'fixed';
                        terminal.style.top = '50%';
                        terminal.style.left = '50%';
                        terminal.style.transform = 'translate(-50%, -50%)';
                        terminal.style.width = '90%';
                        terminal.style.height = '80%';
                        terminal.style.maxWidth = '1000px';
                        terminal.style.zIndex = '1000';
                    } else {
                        terminal.style.position = '';
                        terminal.style.top = '';
                        terminal.style.left = '';
                        terminal.style.transform = '';
                        terminal.style.width = '';
                        terminal.style.height = '';
                        terminal.style.maxWidth = '';
                        terminal.style.zIndex = '';
                    }
                }
            });
        });
    });
}

// Add interactive effects to roadmap elements
function initRoadmapHoverEffects() {
    const roadmapDots = document.querySelectorAll('.roadmap-dot');
    
    roadmapDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            // Pulse animation
            this.animate([
                { transform: 'translateX(-50%) scale(1)', boxShadow: '0 0 0 rgba(167, 216, 247, 0.5)' },
                { transform: 'translateX(-50%) scale(1.3)', boxShadow: '0 0 20px rgba(167, 216, 247, 0.8)' },
                { transform: 'translateX(-50%) scale(1)', boxShadow: '0 0 0 rgba(167, 216, 247, 0.5)' }
            ], {
                duration: 1000,
                iterations: 1
            });
        });
    });
}

// Feature icon hover effects
function initFeatureIconEffects() {
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach(icon => {
        // Add subtle floating animation on hover
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Export function for use in main.js
export { 
    initHoverEffects
};