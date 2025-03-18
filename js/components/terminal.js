/**
 * Aikira ($AIKIRA) - Terminal Component
 * Base's #1 100% AI-Governed DAO
 */

// Terminal typing effect
function startTypingAnimation() {
    console.log("Starting terminal typing animation");
    
    // Get all terminals
    const terminals = document.querySelectorAll('.ai-terminal');
    
    // Process each terminal
    terminals.forEach(terminal => {
        // First run - process immediately
        processTerminal(terminal);
        
        // Set up observer to restart animation when terminal scrolls into view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    processTerminal(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(terminal);
    });
    
    // Log for debugging
    console.log(`Found ${terminals.length} terminals to animate`);
}

// Process a single terminal for typing animation
function processTerminal(terminal) {
    // Get all the output elements
    const outputElements = terminal.querySelectorAll('.terminal-output');
    
    // Check if this is the manifesto terminal
    const isManifesto = terminal.classList.contains('manifesto-terminal');
    
    // For each output element
    outputElements.forEach((element, i) => {
        // Store original text if not already stored
        if (!element.hasAttribute('data-text')) {
            element.setAttribute('data-text', element.innerHTML);
        }
        
        // Reset element content
        element.innerHTML = '';
        element.style.opacity = '1';
        
        // Clear any existing animations
        if (element._typingAnimation) {
            clearTimeout(element._typingAnimation);
        }
    });
    
    // Now start typing animation for first element
    animateElement(outputElements, 0);
}

// Animate a single element
function animateElement(elements, index) {
    // If we've animated all elements, we're done
    if (index >= elements.length) return;
    
    const element = elements[index];
    const text = element.getAttribute('data-text');
    
    // Start typing animation for this element
    let charIndex = 0;
    
    function typeNextChar() {
        // If we've typed the full text
        if (charIndex >= text.length) {
            // Remove cursor and move to next element after a delay
            element.innerHTML = text; // Set the full text without cursor
            
            setTimeout(() => {
                animateElement(elements, index + 1);
            }, 300); // Pause between lines
            return;
        }
        
        // Add next character
        charIndex++;
        
        // To prevent word truncation, always show the full text with only part visible
        const visibleText = text.substring(0, charIndex);
        element.innerHTML = visibleText + 
                          (charIndex < text.length ? '<span class="cursor">|</span>' : '');
        
        // Schedule next character with consistent timing
        element._typingAnimation = setTimeout(typeNextChar, 15); // Typing speed
    }
    
    // Start typing this element
    setTimeout(() => {
        typeNextChar();
    }, 200); // Initial delay
}

// Initialize terminal cursors
function initTerminalCursors() {
    const cursors = document.querySelectorAll('.terminal-cursor');
    
    cursors.forEach(cursor => {
        // Remove default animation
        cursor.style.animation = 'none';
        
        // Make sure it's visible
        cursor.style.opacity = '1';
        
        // Create custom blink function
        function blinkCursor() {
            cursor.style.opacity = cursor.style.opacity === '1' ? '0' : '1';
            setTimeout(blinkCursor, Math.random() * 200 + 300); // Random blink timing for more natural look
        }
        
        // Start cursor blinking
        setTimeout(blinkCursor, Math.random() * 500);
    });
}

// Manual initialization function that can be called in HTML if needed
window.initTerminals = function() {
    startTypingAnimation();
    initTerminalCursors();
};

// Export the function to be used in main.js
export { startTypingAnimation, initTerminalCursors };