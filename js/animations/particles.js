/**
 * Aikira ($AIKIRA) - Particles Animation System
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles the floating particle effects in the background
 */

// Animation states
let activeParticleSystem = true;
let particles = [];
let canvas;
let ctx;
let mousePosition = { x: null, y: null };

// Parameters for the particle system
const params = {
    particleCount: 30,
    connectionDistance: 100,
    movementSpeed: 0.5,
    interactiveRadius: 150,
    colors: [
        'rgba(194, 163, 255, 0.6)', // Lavender
        'rgba(255, 182, 225, 0.6)', // Pink
        'rgba(167, 216, 247, 0.6)', // Blue
        'rgba(166, 255, 181, 0.6)', // Green
        'rgba(126, 226, 255, 0.6)'  // Cyan
    ]
};

// Create floating particles
function createParticles() {
    console.log("Creating particle system...");
    const container = document.querySelector('.particles');
    
    if (!container) {
        console.error("Particles container not found!");
        return;
    }

    // Clear any existing particles
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    particles = [];
    
    // Create basic particles for lower-end devices
    if (window.innerWidth <= 768 || detectLowPerformance()) {
        createBasicParticles(container);
        return;
    }
    
    // Create advanced interactive particles for better devices
    createAdvancedParticles(container);
}

// Create basic non-interactive particles for better performance
function createBasicParticles(container) {
    console.log("Creating basic particle system for better performance");
    
    const numParticles = 20; // Reduced count for performance
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        
        // Random animation delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random color
        const colors = [
            'var(--primary)',
            'var(--accent)',
            'var(--blue-pastel)',
            'var(--neon-green)',
            'var(--neon-blue)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        container.appendChild(particle);
    }
}

// Create advanced interactive particles with canvas connections
function createAdvancedParticles(container) {
    console.log("Creating advanced interactive particle system");
    
    // Create particles
    for (let i = 0; i < params.particleCount; i++) {
        const particle = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * params.movementSpeed,
            speedY: (Math.random() - 0.5) * params.movementSpeed,
            color: params.colors[Math.floor(Math.random() * params.colors.length)]
        };
        
        particles.push(particle);
        
        // Create DOM element for the particle
        const element = document.createElement('div');
        element.classList.add('advanced-particle');
        element.style.position = 'absolute';
        element.style.width = `${particle.size}px`;
        element.style.height = `${particle.size}px`;
        element.style.backgroundColor = particle.color;
        element.style.borderRadius = '50%';
        element.style.top = `${particle.y}px`;
        element.style.left = `${particle.x}px`;
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        element.style.transition = 'transform 0.3s ease-out';
        
        container.appendChild(element);
        particle.element = element;
    }
    
    // Create particle connections canvas
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    container.appendChild(canvas);
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Get context
    ctx = canvas.getContext('2d');
    
    // Setup mouse interaction
    setupMouseInteraction();
    
    // Start animation loop
    if (activeParticleSystem) {
        requestAnimationFrame(animateParticles);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}

// Setup mouse interaction with particles
function setupMouseInteraction() {
    window.addEventListener('mousemove', (e) => {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
        mousePosition.x = null;
        mousePosition.y = null;
    });
}

// Animate the particles
function animateParticles() {
    if (!activeParticleSystem || !ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update particles
    particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.speedY *= -1;
        }
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        
        // Update DOM element position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        
        // Mouse interaction
        if (mousePosition.x !== null && mousePosition.y !== null) {
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < params.interactiveRadius) {
                const angle = Math.atan2(dy, dx);
                const repelForce = (params.interactiveRadius - distance) / params.interactiveRadius;
                
                // Repel particles from mouse
                particle.speedX -= Math.cos(angle) * repelForce * 0.2;
                particle.speedY -= Math.sin(angle) * repelForce * 0.2;
                
                // Glow effect
                particle.element.style.transform = 'scale(1.5)';
                particle.element.style.boxShadow = `0 0 10px ${particle.color}`;
            } else {
                // Reset effects
                particle.element.style.transform = 'scale(1)';
                particle.element.style.boxShadow = 'none';
            }
        }
        
        // Limit speed
        const maxSpeed = 1.5;
        const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        
        if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
        }
        
        // Apply drag/friction
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
    });
    
    // Draw connections
    drawParticleConnections();
    
    // Request next frame
    requestAnimationFrame(animateParticles);
}

// Draw connections between particles that are close to each other
function drawParticleConnections() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < params.connectionDistance) {
                // Calculate opacity based on distance
                const opacity = 1 - (distance / params.connectionDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                
                // Draw line
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[j].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Simple low performance detection
function detectLowPerformance() {
    // Check for mobile or tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check screen size (smaller screens typically have less powerful GPUs)
    const isSmallScreen = window.innerWidth <= 768;
    
    // Detect older browsers that might not handle canvas well
    const isOlderBrowser = !window.requestAnimationFrame || !window.cancelAnimationFrame;
    
    return isMobile || isSmallScreen || isOlderBrowser;
}

// Pause animation for better performance
function pauseParticles() {
    activeParticleSystem = false;
    console.log("Particle system paused for better performance");
}

// Resume animation
function resumeParticles() {
    if (!activeParticleSystem) {
        activeParticleSystem = true;
        console.log("Particle system resumed");
        requestAnimationFrame(animateParticles);
    }
}

// Export functions for use in main.js
export {
    createParticles,
    pauseParticles,
    resumeParticles
};