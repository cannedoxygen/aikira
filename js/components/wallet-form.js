/**
 * Aikira ($AIKIRA) - Wallet Form Handler
 * Base's #1 100% AI-Governed DAO
 * 
 * This file handles the wallet address submission form in the airdrop section
 */

// Initialize the wallet address form
function setupWalletForm() {
    console.log("Initializing wallet form");
    
    const walletForm = document.querySelector('.wallet-form');
    
    if (!walletForm) {
        console.log("Wallet form not found");
        return;
    }
    
    // Find form elements
    const submitBtn = walletForm.querySelector('.submit-button');
    const walletInput = walletForm.querySelector('.wallet-input');
    
    if (!submitBtn || !walletInput) {
        console.error("Wallet form elements not found");
        return;
    }
    
    // Add submit event handler
    submitBtn.addEventListener('click', handleWalletSubmit);
    
    // Also handle form submit for when user presses Enter
    walletForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleWalletSubmit(e);
    });
    
    // Add input validation as user types
    walletInput.addEventListener('input', function() {
        // Remove any existing validation styles
        this.classList.remove('input-error');
        
        // Remove any existing error messages
        const existingError = this.parentNode.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Basic validation as user types (optional)
        const walletAddress = this.value.trim();
        if (walletAddress && !isValidEthereumAddress(walletAddress)) {
            this.classList.add('input-error');
        }
    });
}

// Handle wallet form submission
function handleWalletSubmit(e) {
    e.preventDefault();
    
    // Get form container
    const walletForm = e.target.closest('.wallet-form');
    const walletInput = walletForm.querySelector('.wallet-input');
    
    // Validate input
    const walletAddress = walletInput.value.trim();
    
    if (!walletAddress) {
        showFormError(walletInput, 'Please enter a wallet address');
        return;
    }
    
    if (!isValidEthereumAddress(walletAddress)) {
        showFormError(walletInput, 'Please enter a valid wallet address (0x...)');
        return;
    }
    
    // If we get here, the form is valid
    
    // In a real application, we would submit the wallet address to a backend API
    // For demonstration purposes, we'll show a success message
    showFormSuccess(walletForm, walletAddress);
    
    // Clear the input
    walletInput.value = '';
}

// Check if a string is a valid Ethereum address
function isValidEthereumAddress(address) {
    // Ethereum addresses start with 0x followed by 40 hex characters
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Show form error message
function showFormError(inputElement, message) {
    // Add error class to input
    inputElement.classList.add('input-error');
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Remove existing error messages
    const existingError = inputElement.parentNode.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add the error message after the input group
    inputElement.parentNode.after(errorElement);
    
    // Remove error after delay
    setTimeout(() => {
        errorElement.style.opacity = '0';
        errorElement.style.transition = 'opacity 0.5s';
        inputElement.classList.remove('input-error');
        
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        }, 500);
    }, 3000);
}

// Show form success message
function showFormSuccess(formElement, walletAddress) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.position = 'absolute';
    successMessage.style.top = '-50px';
    successMessage.style.left = '50%';
    successMessage.style.transform = 'translateX(-50%)';
    successMessage.style.padding = '10px 20px';
    successMessage.style.background = 'var(--success)';
    successMessage.style.color = 'var(--text)';
    successMessage.style.borderRadius = '5px';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.opacity = '0';
    successMessage.style.transition = 'all 0.5s';
    
    // Show abbreviated wallet address
    const shortAddress = walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4);
    successMessage.textContent = `Thank you! Wallet address ${shortAddress} submitted for airdrop.`;
    
    // Ensure form has relative positioning for absolute message placement
    formElement.style.position = 'relative';
    formElement.appendChild(successMessage);
    
    // Animate success message
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.top = '-70px';
    }, 100);
    
    // Update the airdrop progress if applicable
    updateAirdropProgress();
    
    // Remove message after delay
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.top = '-50px';
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 500);
    }, 4000);
}

// Update airdrop progress bars (simulation)
function updateAirdropProgress() {
    // This would typically come from a backend API
    // For demonstration, we'll simulate a small increment
    
    const airdropItems = document.querySelectorAll('.airdrop-item');
    
    // If no items found, exit
    if (!airdropItems.length) return;
    
    // Choose the first non-full airdrop tier
    let targetItem = null;
    
    for (let item of airdropItems) {
        const progressInfo = item.querySelector('[style*="display: flex; justify-content: space-between"]');
        
        if (progressInfo) {
            const spans = progressInfo.querySelectorAll('span');
            if (spans.length >= 1) {
                const claimedText = spans[0].textContent;
                const match = claimedText.match(/(\d+)\/(\d+)/);
                
                if (match && match.length >= 3) {
                    const claimed = parseInt(match[1]);
                    const total = parseInt(match[2]);
                    
                    if (claimed < total) {
                        targetItem = item;
                        
                        // Update the text
                        const newClaimed = claimed + 1;
                        spans[0].textContent = `${newClaimed}/${total}`;
                        
                        // Update the progress bar
                        const percent = (newClaimed / total) * 100;
                        const progressFill = item.querySelector('.progress-fill');
                        if (progressFill) {
                            progressFill.style.width = `${percent}%`;
                        }
                        
                        break;
                    }
                }
            }
        }
    }
}

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
    setupWalletForm,
    setupConnectWalletButton,
    showNotification
};