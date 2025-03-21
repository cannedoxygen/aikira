/**
 * Aikira ($AIKIRA) - Wallet Form Handler
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles the wallet connection button functionality
 */

// Connect wallet button functionality
function setupConnectWalletButton() {
    const connectWalletBtn = document.querySelector('.connect-wallet');
    
    if (!connectWalletBtn) {
        console.log("Connect wallet button not found");
        return;
    }
    
    connectWalletBtn.addEventListener('click', function() {
        showNotification("Wallet connection coming soon!", 3000);
    });
}

// Display a notification
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '15px 25px';
    notification.style.background = 'var(--gradient-primary)';
    notification.style.color = 'white';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    notification.style.fontWeight = 'bold';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, duration);
}

// Export functions for use in main.js
export {
    setupConnectWalletButton,
    showNotification
};