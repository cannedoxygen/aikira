/**
 * Aikira ($AIKIRA) - Performance Monitoring and Optimization
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles monitoring of performance metrics and
 * adjusts animation complexity for better user experience
 * across different devices and browsers.
 */

// Performance settings
const performanceSettings = {
    // FPS threshold below which optimizations will be applied
    fpsThreshold: 30,
    
    // Number of consecutive low FPS readings needed before reducing animations
    lowPerformanceThreshold: 3,
    
    // Current active animations
    activeAnimations: {
        particles: true,
        circuitEffects: true,
        terminalAnimations: true,
        hoverEffects: true
    },
    
    // Has performance been reduced?
    reducedPerformance: false,
    
    // Debug mode
    debugMode: false
};

// Initialize performance monitoring
function monitorPerformance() {
    // Skip on extremely low-end devices - just use reduced settings immediately
    if (detectVeryLowEndDevice()) {
        reduceAnimationComplexity(true);
        return;
    }
    
    console.log("Initializing performance monitoring");
    
    // FPS monitoring variables
    let lastTime = 0;
    let frameCount = 0;
    let lowPerformanceCount = 0;
    
    // Create debug panel if in debug mode
    if (performanceSettings.debugMode) {
        createDebugPanel();
    }
    
    // Start checking FPS
    requestAnimationFrame(checkFPS);
    
    // Function to check FPS on each animation frame
    function checkFPS(timestamp) {
        // Increment frame count
        frameCount++;
        
        // Calculate FPS every second
        if (timestamp - lastTime >= 1000) {
            const fps = frameCount;
            frameCount = 0;
            lastTime = timestamp;
            
            // Update debug panel if enabled
            if (performanceSettings.debugMode) {
                updateDebugPanel(fps);
            }
            
            // Check if FPS is below threshold
            if (fps < performanceSettings.fpsThreshold) {
                lowPerformanceCount++;
                
                // If we've had multiple low FPS readings, reduce animations
                if (lowPerformanceCount >= performanceSettings.lowPerformanceThreshold) {
                    reduceAnimationComplexity();
                    lowPerformanceCount = 0; // Reset counter
                }
            } else {
                // Reset counter if performance is good
                lowPerformanceCount = Math.max(0, lowPerformanceCount - 1);
            }
        }
        
        // Continue monitoring
        requestAnimationFrame(checkFPS);
    }
}

// Reduce animation complexity based on performance
function reduceAnimationComplexity(immediate = false) {
    // Skip if we've already reduced animations
    if (performanceSettings.reducedPerformance) {
        return;
    }
    
    console.log(`${immediate ? 'Immediately reducing' : 'Reducing'} animation complexity for better performance`);
    
    // Mark as reduced
    performanceSettings.reducedPerformance = true;
    
    // Disable the most demanding animations
    const particleSystem = performanceSettings.activeAnimations.particles;
    const circuitEffects = performanceSettings.activeAnimations.circuitEffects;
    
    // Disable particle system (most demanding)
    if (particleSystem && typeof window.pauseParticles === 'function') {
        console.log("Disabling particle system");
        performanceSettings.activeAnimations.particles = false;
        window.pauseParticles();
    }
    
    // Reduce circuit animation complexity
    if (circuitEffects && typeof window.pauseCircuitAnimations === 'function') {
        console.log("Reducing circuit animation complexity");
        performanceSettings.activeAnimations.circuitEffects = false;
        window.pauseCircuitAnimations();
    }
    
    // Notify user if not immediate (immediate is silent as it happens on load)
    if (!immediate) {
        showPerformanceNotification();
    }
}

// Show a notification about reduced animations
function showPerformanceNotification() {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '10px';
    notification.style.right = '10px';
    notification.style.background = 'rgba(0, 0, 0, 0.7)';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '5px';
    notification.style.fontSize = '12px';
    notification.style.zIndex = '9999';
    notification.textContent = 'Animations reduced for better performance';
    
    document.body.appendChild(notification);
    
    // Remove notification after a few seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 1s';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 1000);
    }, 3000);
}

// Create a performance debug panel
function createDebugPanel() {
    const debugPanel = document.createElement('div');
    debugPanel.id = 'performance-debug';
    debugPanel.style.position = 'fixed';
    debugPanel.style.top = '10px';
    debugPanel.style.right = '10px';
    debugPanel.style.background = 'rgba(0, 0, 0, 0.7)';
    debugPanel.style.color = 'white';
    debugPanel.style.padding = '10px';
    debugPanel.style.borderRadius = '5px';
    debugPanel.style.fontSize = '12px';
    debugPanel.style.zIndex = '9999';
    debugPanel.style.fontFamily = 'monospace';
    debugPanel.innerHTML = `
        <div>FPS: <span id="fps-counter">--</span></div>
        <div>Device: <span id="device-info">--</span></div>
        <div>Animations: <span id="animation-status">All enabled</span></div>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Update device info
    const deviceInfo = document.getElementById('device-info');
    if (deviceInfo) {
        deviceInfo.textContent = `${getDeviceType()} (${navigator.platform})`;
    }
}

// Update the debug panel with performance metrics
function updateDebugPanel(fps) {
    const fpsCounter = document.getElementById('fps-counter');
    const animationStatus = document.getElementById('animation-status');
    
    if (fpsCounter) {
        // Color code the FPS counter
        let color;
        if (fps >= 50) color = 'lightgreen';
        else if (fps >= 30) color = 'yellow';
        else color = 'red';
        
        fpsCounter.textContent = fps;
        fpsCounter.style.color = color;
    }
    
    if (animationStatus) {
        if (performanceSettings.reducedPerformance) {
            animationStatus.textContent = 'Reduced';
            animationStatus.style.color = 'yellow';
        }
    }
}

// Detect if device is very low-end to skip monitoring and immediately reduce
function detectVeryLowEndDevice() {
    // Check for mobile or tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check for low memory (not widely supported)
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 2;
    
    // Check for low-end CPU (inferred by cores)
    const hasLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    // Check for older browsers that might struggle with animations
    const isOlderBrowser = !window.requestAnimationFrame || !window.cancelAnimationFrame;
    
    // Small screen combined with mobile is often a low-end device
    const isSmallScreenMobile = isMobile && window.innerWidth <= 360;
    
    return (hasLowMemory && isMobile) || (hasLowCPU && isMobile) || isOlderBrowser || isSmallScreenMobile;
}

// Get device type for debugging
function getDeviceType() {
    const userAgent = navigator.userAgent;
    
    if (/Android/i.test(userAgent)) {
        return 'Android';
    }
    
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return 'iOS';
    }
    
    if (/Windows/i.test(userAgent)) {
        return 'Windows';
    }
    
    if (/Mac/i.test(userAgent)) {
        return 'Mac';
    }
    
    if (/Linux/i.test(userAgent)) {
        return 'Linux';
    }
    
    return 'Unknown';
}

// Expose functions for pauseParticles and pauseCircuitAnimations
// This allows these functions to be called before they're properly loaded
window.pauseParticles = function() {
    console.log("Placeholder pauseParticles called before module loaded");
    
    // The real implementation will override this once loaded
    performanceSettings.activeAnimations.particles = false;
};

window.pauseCircuitAnimations = function() {
    console.log("Placeholder pauseCircuitAnimations called before module loaded");
    
    // The real implementation will override this once loaded
    performanceSettings.activeAnimations.circuitEffects = false;
};

// Expose performance settings to check from other modules
function getPerformanceSettings() {
    return { ...performanceSettings };
}

// Export functions for use in main.js
export {
    monitorPerformance,
    reduceAnimationComplexity,
    getPerformanceSettings
};