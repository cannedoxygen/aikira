/**
 * Aikira ($AIKIRA) - Circuit Background Animations
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles the dynamic circuit board animation in the background
 */

// Animation states
let activeCircuitAnimations = true;

// Create circuit board elements that animate on scroll
function createCircuitBoard() {
    console.log("Creating circuit board elements...");
    const circuitBackground = document.querySelector('.circuit-background');
    
    if (!circuitBackground) {
        console.error("Circuit background element not found!");
        return;
    }
    
    const numLines = 20;
    const numNodes = 40;
    
    // Clear any existing circuit elements
    const existingLines = circuitBackground.querySelectorAll('.circuit-line');
    const existingNodes = circuitBackground.querySelectorAll('.circuit-node');
    
    existingLines.forEach(line => line.remove());
    existingNodes.forEach(node => node.remove());
    
    console.log(`Creating ${numLines} lines and ${numNodes} nodes...`);
    
    // Create circuit lines
    for (let i = 0; i < numLines; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line');
        
        // Random positioning and sizing
        const width = Math.random() * 150 + 50;
        const left = Math.random() * 90 + 5; // Keep away from edges (5-95%)
        const top = Math.random() * 90 + 5;  // Keep away from edges (5-95%)
        
        line.style.width = `${width}px`;
        line.style.left = `${left}%`;
        line.style.top = `${top}%`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        line.style.transform = `rotate(${rotation}deg)`;
        
        circuitBackground.appendChild(line);
        
        // Force reflow and apply initial opacity
        line.getBoundingClientRect();
        
        // Stagger the appearance
        setTimeout(() => {
            line.style.opacity = '0.6';
        }, i * 100);
    }
    
    // Create circuit nodes
    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.classList.add('circuit-node');
        
        // Random positioning
        const left = Math.random() * 90 + 5; // Keep away from edges (5-95%)
        const top = Math.random() * 90 + 5;  // Keep away from edges (5-95%)
        
        node.style.left = `${left}%`;
        node.style.top = `${top}%`;
        
        circuitBackground.appendChild(node);
        
        // Force reflow and apply initial opacity
        node.getBoundingClientRect();
        
        // Stagger the appearance
        setTimeout(() => {
            node.style.opacity = '0.8';
        }, i * 100);
    }
    
    // Create a few circuit paths (lines with pulses)
    createCircuitPaths(circuitBackground);
    
    console.log("Circuit elements created.");
}

// Create circuit paths with pulse animations
function createCircuitPaths(container) {
    // Create multiple circuit paths
    for (let i = 0; i < 6; i++) {
        createSingleCircuitPath(container, i);
    }
}

// Create a single circuit path with pulse animation
function createSingleCircuitPath(container, index) {
    // Create a circuit path
    const path = document.createElement('div');
    path.classList.add('circuit-path');
    path.style.position = 'absolute';
    path.style.height = '1px';
    path.style.zIndex = '3';
    
    // Random path properties
    const length = Math.random() * 200 + 100;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const angle = Math.random() * 360;
    
    path.style.width = `${length}px`;
    path.style.left = `${startX}px`;
    path.style.top = `${startY}px`;
    path.style.transform = `rotate(${angle}deg)`;
    path.style.background = 'rgba(166, 255, 181, 0.2)';
    
    container.appendChild(path);
    
    // Create pulse animation
    animateCircuitPulse(path, length, index);
}

// Animate circuit pulse
function animateCircuitPulse(path, length, index) {
    // Only run if animations are active
    if (!activeCircuitAnimations) return;
    
    const pulse = document.createElement('div');
    pulse.classList.add('circuit-pulse');
    pulse.style.position = 'absolute';
    pulse.style.width = '5px';
    pulse.style.height = '3px';
    pulse.style.top = '-1px';
    pulse.style.left = '0';
    pulse.style.borderRadius = '2px';
    pulse.style.background = 'var(--neon-green)';
    pulse.style.boxShadow = '0 0 8px var(--neon-green)';
    pulse.style.opacity = '0.8';
    pulse.style.transition = 'left 3s linear';
    
    path.appendChild(pulse);
    
    // Start pulse animation with random delay
    const startDelay = Math.random() * 1000;
    
    setTimeout(() => {
        pulse.style.left = `${length}px`;
        
        // Remove pulse after animation completes
        setTimeout(() => {
            if (pulse.parentNode) {
                pulse.parentNode.removeChild(pulse);
            }
            
            // Schedule next pulse if animations are still active
            if (activeCircuitAnimations) {
                // Each path has a different timing
                const nextPulseDelay = Math.random() * 5000 + 2000;
                setTimeout(() => {
                    animateCircuitPulse(path, length, index);
                }, nextPulseDelay);
            }
        }, 3000);
    }, startDelay);
}

// Initialize circuit pulse animations
function initCircuitPulses() {
    const circuitContainer = document.querySelector('.circuit-background');
    if (!circuitContainer) return;
    
    // Circuit paths already created in createCircuitBoard()
    // This function is kept separate for cleaner initialization
}

// Handle window resize
function handleCircuitResize() {
    // Recreate the circuit board when window size changes
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createCircuitBoard();
        }, 300);
    });
}

// Pause animations for better performance
function pauseCircuitAnimations() {
    activeCircuitAnimations = false;
    console.log("Circuit animations paused for better performance");
}

// Resume animations
function resumeCircuitAnimations() {
    activeCircuitAnimations = true;
    console.log("Circuit animations resumed");
    
    // Restart all circuit paths
    const circuitContainer = document.querySelector('.circuit-background');
    if (circuitContainer) {
        const paths = circuitContainer.querySelectorAll('.circuit-path');
        paths.forEach((path, index) => {
            const length = parseFloat(path.style.width);
            animateCircuitPulse(path, length, index);
        });
    }
}

// Export functions for use in main.js
export {
    createCircuitBoard,
    initCircuitPulses,
    handleCircuitResize,
    pauseCircuitAnimations,
    resumeCircuitAnimations
};