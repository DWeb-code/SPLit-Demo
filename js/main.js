// Main JavaScript for Coming Soon Page

// Translations object
const translations = {
    en: {
        title: "Coming Soon",
        subtitle: "A new platform connecting architecture studios and professionals for inspections, consulting, and renovation projects.",
        emailPlaceholder: "Enter your email",
        notifyBtn: "Notify Me",
        launching: "Launching Soon"
    },
    it: {
        title: "Prossimamente",
        subtitle: "Una nuova piattaforma che collega studi di architettura e professionisti per ispezioni, consulenze e progetti di ristrutturazione.",
        emailPlaceholder: "Inserisci la tua email",
        notifyBtn: "Avvisami",
        launching: "In Arrivo"
    }
};

// Current language (default: English)
let currentLang = localStorage.getItem('language') || 'en';

// DOM elements
const langButtons = {
    en: document.getElementById('lang-en'),
    it: document.getElementById('lang-it')
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    setLanguage(currentLang);
    
    // Add event listeners for language buttons
    langButtons.en.addEventListener('click', () => setLanguage('en'));
    langButtons.it.addEventListener('click', () => setLanguage('it'));
    
    // Add email form interaction
    setupEmailForm();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Set language function
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update button states
    Object.keys(langButtons).forEach(key => {
        langButtons[key].classList.toggle('active', key === lang);
    });
    
    // Update text content
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Email form setup
function setupEmailForm() {
    const emailInput = document.querySelector('input[type="email"]');
    const notifyButton = document.querySelector('[data-key="notifyBtn"]');
    
    // Add input validation styling
    emailInput.addEventListener('input', function() {
        const isValid = this.checkValidity();
        this.classList.toggle('is-valid', isValid && this.value.length > 0);
        this.classList.toggle('is-invalid', !isValid && this.value.length > 0);
    });
    
    // Handle notify button click
    notifyButton.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!email) {
            emailInput.focus();
            return;
        }
        
        if (!emailInput.checkValidity()) {
            emailInput.classList.add('is-invalid');
            return;
        }
        
        // Simulate success (UI only)
        showNotification();
        emailInput.value = '';
        emailInput.classList.remove('is-valid', 'is-invalid');
    });
    
    // Handle Enter key
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            notifyButton.click();
        }
    });
}

// Show notification function
function showNotification() {
    const message = currentLang === 'en' 
        ? 'Thank you! We\'ll notify you when we launch.' 
        : 'Grazie! Ti avviseremo quando saremo online.';
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to email form
    const emailForm = document.querySelector('.email-form');
    if (emailForm) {
        emailForm.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        emailForm.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});