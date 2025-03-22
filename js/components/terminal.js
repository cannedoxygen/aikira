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
          
          // Apply text wrapping styles to ensure proper display
          element.style.whiteSpace = 'normal';
          element.style.wordWrap = 'break-word';
          element.style.overflowWrap = 'break-word';
          element.style.width = 'auto';
          element.style.display = 'block';
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
          
          // Make sure text wrapping is enabled for the final result
          element.style.whiteSpace = 'normal';
          element.style.wordWrap = 'break-word';
          element.style.overflowWrap = 'break-word';
          element.style.width = 'auto';
          element.style.display = 'block';
          
          setTimeout(() => {
              animateElement(elements, index + 1);
          }, 300); // Pause between lines
          return;
      }
      
      // Add next character with special handling for HTML tags
      const nextChar = text.charAt(charIndex);
      charIndex++;
      
      if (nextChar === '<') {
          // We've encountered an HTML tag - add the whole tag at once
          const tagEnd = text.indexOf('>', charIndex);
          if (tagEnd !== -1) {
              // Add the complete tag
              const completeTag = text.substring(charIndex - 1, tagEnd + 1);
              element.innerHTML += completeTag;
              charIndex = tagEnd + 1;
          } else {
              // No closing bracket found, just add the character
              element.innerHTML += nextChar;
          }
      } else {
          // Regular character - add it
          element.innerHTML += nextChar;
      }
      
      // Add blinking cursor
      element.innerHTML += '<span class="terminal-cursor">|</span>';
      
      // Schedule next character with consistent timing
      element._typingAnimation = setTimeout(typeNextChar, 15); // Typing speed
  }
  
  // Start typing this element
  setTimeout(() => {
      // Make sure text wrapping is enabled during typing
      element.style.whiteSpace = 'normal';
      element.style.wordWrap = 'break-word';
      element.style.overflowWrap = 'break-word';
      element.style.width = 'auto';
      element.style.display = 'block';
      
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

// Fix terminal text wrapping issues for manifesto and other terminals
function fixTerminalWrapping() {
  console.log("Fixing terminal text wrapping");
  
  // Get all terminal output elements
  const terminalOutputs = document.querySelectorAll('.terminal-output');
  
  // Apply proper wrapping styles to each terminal output
  terminalOutputs.forEach(output => {
      output.style.whiteSpace = 'normal';
      output.style.wordWrap = 'break-word';
      output.style.overflowWrap = 'break-word';
      output.style.width = 'auto';
      output.style.display = 'block';
  });
  
  // Fix manifesto terminal if it exists
  const manifestoTerminal = document.querySelector('.manifesto-terminal');
  if (manifestoTerminal) {
      const manifestoOutputs = manifestoTerminal.querySelectorAll('.terminal-output');
      manifestoOutputs.forEach(output => {
          output.style.whiteSpace = 'normal';
          output.style.wordWrap = 'break-word';
          output.style.overflowWrap = 'break-word';
          output.style.width = 'auto';
          output.style.display = 'block';
      });
  }
  
  // Fix wide terminal if it exists
  const wideTerminal = document.querySelector('.wide-terminal');
  if (wideTerminal) {
      wideTerminal.style.maxWidth = '900px';
      wideTerminal.style.margin = '0 auto 50px';
  }
}

// Manual initialization function that can be called in HTML if needed
window.initTerminals = function() {
  // Fix text wrapping first
  fixTerminalWrapping();
  
  // Then start animations
  startTypingAnimation();
  initTerminalCursors();
  
  // Fix text wrapping again after animations
  setTimeout(fixTerminalWrapping, 1000);
};

// Run terminal initialization when the page loads
document.addEventListener('DOMContentLoaded', function() {
  fixTerminalWrapping();
  startTypingAnimation();
  initTerminalCursors();
  
  // Run the text wrapping fix again after a delay to ensure it applies
  setTimeout(fixTerminalWrapping, 1000);
});

// Export functions for use in main.js
export { startTypingAnimation, initTerminalCursors, fixTerminalWrapping };