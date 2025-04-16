/**
 * Cookie Consent Management Script
 * This script handles the cookie consent banner and user preferences
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookieConsent');
    
    // If no choice has been made, show the banner
    if (!consentGiven) {
        createConsentBanner();
    }
    
    // Function to create and add the consent banner to the page
    function createConsentBanner() {
        // Create banner elements
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        
        const message = document.createElement('p');
        message.textContent = 'This website uses cookies to enhance your browsing experience. By continuing to use this site, you consent to our use of cookies in accordance with our Privacy Policy.';
        
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'cookie-buttons';
        
        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Accept';
        acceptButton.className = 'accept-cookies';
        acceptButton.addEventListener('click', function() {
            acceptCookies();
        });
        
        const rejectButton = document.createElement('button');
        rejectButton.textContent = 'Reject';
        rejectButton.className = 'reject-cookies';
        rejectButton.style.marginLeft = '10px';
        rejectButton.style.backgroundColor = '#6c757d';
        rejectButton.addEventListener('click', function() {
            rejectCookies();
        });
        
        const privacyLink = document.createElement('a');
        privacyLink.href = 'privacy-policy.html';
        privacyLink.textContent = 'Privacy Policy';
        privacyLink.style.marginLeft = '20px';
        privacyLink.style.color = 'white';
        
        // Assemble the banner
        buttonGroup.appendChild(acceptButton);
        buttonGroup.appendChild(rejectButton);
        buttonGroup.appendChild(privacyLink);
        
        banner.appendChild(message);
        banner.appendChild(buttonGroup);
        
        // Add the banner to the page
        document.body.appendChild(banner);
    }
    
    // Function to handle cookie acceptance
    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        removeBanner();
        enableCookies();
    }
    
    // Function to handle cookie rejection
    function rejectCookies() {
        localStorage.setItem('cookieConsent', 'rejected');
        removeBanner();
        disableCookies();
    }
    
    // Remove the banner from the page
    function removeBanner() {
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.remove();
        }
    }
    
    // Enable cookies and tracking (for demonstration - would be expanded in a real implementation)
    function enableCookies() {
        // This would typically enable analytics, etc.
        console.log('Cookies and tracking enabled');
    }
    
    // Disable cookies and tracking
    function disableCookies() {
        // This would typically disable analytics, etc.
        console.log('Cookies and tracking disabled');
    }
}); 