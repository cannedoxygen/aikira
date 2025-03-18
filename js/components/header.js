/**
 * Aikira ($AIKIRA) - Enhanced Interactive Header
 * Adds dynamic interactive effects to the header
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing enhanced header interactions');
    
    // Elements
    const header = document.querySelector('header');
    const navItems = document.querySelectorAll('nav ul li');
    const connectWalletBtn = document.querySelector('.connect-wallet');
    const logo = document.querySelector('.logo');
    const ticker = document.querySelector('.ticker');
    
    // Add mouse movement effect to connect wallet button
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the button
            const y = e.clientY - rect.top;  // y position within the button
            
            // Calculate rotation based on mouse position (subtle effect)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10; // Divide by higher number for more subtle effect
            const rotateY = (centerX - x) / 10;
            
            // Apply transform
            this.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.03)`;
            
            // Add glowing effect that follows the mouse
            const percentX = x / rect.width * 100;
            const percentY = y / rect.height * 100;
            this.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, var(--primary), var(--blue-pastel))`;
        });
        
        // Reset transform when mouse leaves
        connectWalletBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = 'var(--gradient-primary)';
        });
        
        // Scale down slightly on click
        connectWalletBtn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        // Return to hover state after click
        connectWalletBtn.addEventListener('mouseup', function() {
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const percentX = x / rect.width * 100;
            const percentY = y / rect.height * 100;
            this.style.transform = 'translateY(-5px) scale(1.03)';
            this.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, var(--primary), var(--blue-pastel))`;
        });
    }
    
    // Add index to nav items for staggered animation in mobile view
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    // Add hover effect to logo
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.textShadow = '0 0 8px rgba(194, 163, 255, 0.5)';
            
            // Find the ticker and give it extra pulse
            if (ticker) {
                ticker.style.animation = 'none'; // Reset animation
                void ticker.offsetWidth; // Trigger reflow
                ticker.style.animation = 'ticker-pulse 1.5s infinite';
            }
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            
            // Reset ticker animation
            if (ticker) {
                ticker.style.animation = 'none';
                void ticker.offsetWidth;
                ticker.style.animation = 'ticker-pulse 3s infinite';
            }
        });
    }
    
    // Advanced scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for visual change
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scrolling down & past threshold
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at top
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Toggle mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('open') && 
                !nav.contains(e.target) && 
                !navToggle.contains(e.target)) {
                
                nav.classList.remove('open');
                navToggle.classList.remove('active');
            }
        });
    }
});