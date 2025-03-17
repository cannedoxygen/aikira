/**
 * Aikira ($AIKIRA) - Progress Bars Animation
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles the animation of progress bars used across the site
 */

// Animate progress bars when they become visible in viewport
function animateProgressBars() {
    console.log("Initializing progress bar animations");
    
    const progressBars = document.querySelectorAll('.progress-fill');
    
    if (progressBars.length === 0) {
        console.log("No progress bars found");
        return;
    }
    
    console.log(`Found ${progressBars.length} progress bars to animate`);
    
    // Create intersection observer to detect when progress bars are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the progress bar element
                const progressFill = entry.target;
                
                // Get the parent distribution item for percentage data
                const parentItem = findParentDistributionItem(progressFill);
                
                if (parentItem) {
                    // Extract percentage from the title spans
                    const percentValue = extractPercentageValue(parentItem);
                    
                    if (percentValue) {
                        // Delay the animation slightly for a nice effect
                        setTimeout(() => {
                            progressFill.style.width = percentValue;
                        }, 300);
                    }
                } else {
                    // If no parent found (custom progress bars), use data attribute
                    const width = progressFill.getAttribute('data-value') || '100%';
                    
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 300);
                }
                
                // Unobserve after animation starts
                observer.unobserve(progressFill);
            }
        });
    }, { threshold: 0.2 });
    
    // Start observing all progress bars
    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    // Additionally, specifically animate the roadmap item progress bars
    animateRoadmapItems();
}

// Find the parent distribution item element
function findParentDistributionItem(element) {
    let parent = element.parentElement;
    
    while (parent) {
        if (parent.classList.contains('distribution-item') || 
            parent.classList.contains('airdrop-item')) {
            return parent;
        }
        parent = parent.parentElement;
    }
    
    return null;
}

// Extract percentage value from the parent item
function extractPercentageValue(parentItem) {
    // Try finding percentage in distribution title
    const titleElement = parentItem.querySelector('.distribution-title');
    
    if (titleElement) {
        const spans = titleElement.querySelectorAll('span');
        // The percentage is usually in the second span
        if (spans.length >= 2) {
            const percentText = spans[spans.length - 1].textContent.trim();
            return percentText;
        }
    }
    
    // Try finding percentage in a custom data attribute
    if (parentItem.getAttribute('data-percentage')) {
        return parentItem.getAttribute('data-percentage');
    }
    
    // For airdrop items, we need to calculate based on claimed count
    const progressInfo = parentItem.querySelector('[style*="display: flex; justify-content: space-between"]');
    
    if (progressInfo) {
        const spans = progressInfo.querySelectorAll('span');
        if (spans.length >= 1) {
            const claimedText = spans[0].textContent;
            const match = claimedText.match(/(\d+)\/(\d+)/);
            
            if (match && match.length >= 3) {
                const claimed = parseInt(match[1]);
                const total = parseInt(match[2]);
                
                if (!isNaN(claimed) && !isNaN(total) && total > 0) {
                    const percentage = (claimed / total) * 100;
                    return `${percentage}%`;
                }
            }
        }
    }
    
    // Default to zero if we couldn't find a percentage
    return '0%';
}

// Animate roadmap items with proper visibility
function animateRoadmapItems() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    if (roadmapItems.length === 0) {
        console.log("No roadmap items found");
        return;
    }
    
    console.log(`Found ${roadmapItems.length} roadmap items to animate`);
    
    // Create an intersection observer for roadmap items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                
                // Add visible class with staggered delay
                setTimeout(() => {
                    item.classList.add('visible');
                    item.style.opacity = 1;
                    item.style.transform = 'translateY(0)';
                }, 200 * index);
                
                observer.unobserve(item);
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and start observing
    roadmapItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(item);
    });
}

// Reset progress bars to zero (for reanimation)
function resetProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Re-animate after a short delay
    setTimeout(() => {
        animateProgressBars();
    }, 500);
}

// Manually set a progress bar's value
function setProgressBarValue(selector, value) {
    const progressFill = document.querySelector(selector);
    
    if (progressFill) {
        // Ensure value is a string with % sign
        const valueStr = typeof value === 'number' ? `${value}%` : value;
        
        // Animate to the new value
        progressFill.style.transition = 'width 1s ease-out';
        progressFill.style.width = valueStr;
    }
}

// Create a striped progress bar effect
function createStripedEffect(selector) {
    const progressBar = document.querySelector(selector);
    
    if (progressBar) {
        const progressFill = progressBar.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.classList.add('progress-striped');
        }
    }
}

// Add animated stripes to a progress bar
function animateStripedEffect(selector) {
    const progressBar = document.querySelector(selector);
    
    if (progressBar) {
        const progressFill = progressBar.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.classList.add('progress-striped', 'animated');
        }
    }
}

// Create a custom progress bar programmatically
function createProgressBar(parentSelector, value, color = null, animated = true) {
    const parent = document.querySelector(parentSelector);
    
    if (!parent) return null;
    
    // Create progress bar container
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    // Create progress fill element
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.setAttribute('data-value', value);
    
    // Set custom color if provided
    if (color) {
        progressFill.style.background = color;
    }
    
    // Add to DOM
    progressBar.appendChild(progressFill);
    parent.appendChild(progressBar);
    
    // Animate after a short delay
    if (animated) {
        setTimeout(() => {
            progressFill.style.width = value;
        }, 300);
    }
    
    return progressBar;
}

// Ensure distribution progress bars are populated with the correct percentages
function populateDistributionPercentages() {
    const distributionItems = document.querySelectorAll('.distribution-item');
    
    distributionItems.forEach(item => {
        const titleSpans = item.querySelectorAll('.distribution-title span');
        if (titleSpans.length >= 2) {
            const percentText = titleSpans[1].textContent.trim();
            const progressFill = item.querySelector('.progress-fill');
            
            if (progressFill) {
                setTimeout(() => {
                    progressFill.style.width = percentText;
                }, 500);
            }
        }
    });
}

// Initialize roadmap section specifically
function initializeRoadmap() {
    console.log("Initializing roadmap section");
    
    // Make sure the roadmap section is visible
    const roadmapSection = document.getElementById('roadmap');
    if (roadmapSection) {
        roadmapSection.style.display = 'block';
    }
    
    // Animate the roadmap items
    animateRoadmapItems();
    
    // Attach scroll event to ensure roadmap is visible
    window.addEventListener('scroll', () => {
        if (isElementInViewport(roadmapSection)) {
            animateRoadmapItems();
        }
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// On DOM Content Loaded, ensure roadmap is properly initialized
document.addEventListener('DOMContentLoaded', function() {
    populateDistributionPercentages();
    initializeRoadmap();
});

// Export functions for use in main.js
export {
    animateProgressBars,
    resetProgressBars,
    setProgressBarValue,
    createStripedEffect,
    animateStripedEffect,
    createProgressBar,
    initializeRoadmap
};