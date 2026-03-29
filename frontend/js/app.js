// Main App Controller
class AppController {
    constructor() {
        this.currentSection = 'login';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupResponsiveMenu();
        this.initializeModules();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
            });
        });
    }

    navigateToSection(section) {
        if (!window.authManager.isAuthenticated() && section !== 'login') {
            window.authManager.showNotification('Please login first!', 'warning');
            return;
        }

        // Hide all sections
        const sections = document.querySelectorAll('.content-section, .auth-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show target section
        const targetSectionElement = document.getElementById(`${section}Section`);
        if (targetSectionElement) {
            targetSectionElement.style.display = section === 'login' ? 'flex' : 'block';
        }

        // Update navigation
        this.updateNavigation(section);
        this.currentSection = section;

        // Initialize section-specific functionality
        this.initializeSection(section);
    }

    updateNavigation(activeSection) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    initializeSection(section) {
        switch (section) {
            case 'colleges':
                this.initializeCollegesSection();
                break;
            case 'results':
                this.initializeResultsSection();
                break;
            case 'predict':
                // Predict section is handled by prediction manager
                break;
        }
    }

    initializeCollegesSection() {
        if (!window.collegesManager) {
            window.collegesManager = new CollegesManager();
        }
    }

    initializeResultsSection() {
        if (!window.resultsManager) {
            window.resultsManager = new ResultsManager();
            window.resultsManager.loadResults();
        }
    }

    setupResponsiveMenu() {
        // Add mobile menu toggle if needed
        const navMenu = document.querySelector('.nav-menu');
        const navUser = document.querySelector('.nav-user');
        
        if (window.innerWidth <= 768) {
            // Mobile navigation adjustments
            if (navMenu) navMenu.style.display = 'none';
            if (navUser) navUser.style.display = 'none';
        }
    }

    initializeModules() {
        // Modules are already initialized by their respective scripts
        // This method can be used for additional app-wide initialization
        this.setupKeyboardShortcuts();
        this.setupTheme();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for quick search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.quickSearch();
            }
            
            // Escape to go back
            if (e.key === 'Escape') {
                this.goBack();
            }
        });
    }

    quickSearch() {
        if (this.currentSection === 'colleges') {
            const searchInput = document.getElementById('collegeSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }

    goBack() {
        // Simple back navigation logic
        const sectionHistory = ['login', 'predict', 'colleges', 'results'];
        const currentIndex = sectionHistory.indexOf(this.currentSection);
        
        if (currentIndex > 0) {
            const previousSection = sectionHistory[currentIndex - 1];
            this.navigateToSection(previousSection);
        }
    }

    setupTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // Utility methods
    getCurrentSection() {
        return this.currentSection;
    }

    isLoggedIn() {
        return window.authManager.isAuthenticated();
    }

    refreshData() {
        // Refresh current section data
        this.initializeSection(this.currentSection);
    }
}

// Global utility functions
window.utils = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate random ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Copy to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },

    // Download JSON data
    downloadJSON: (data, filename) => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.appController = new AppController();
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
    });

    // Add unhandled promise rejection handling
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });

    // Show welcome message
    console.log('🎓 College Admission Predictor initialized successfully!');
});

// Add CSS for no-results state
const noResultsStyle = document.createElement('style');
noResultsStyle.textContent = `
    .no-results {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .no-results i {
        font-size: 3rem;
        color: #667eea;
        margin-bottom: 1rem;
    }
    
    .no-results h3 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .no-results p {
        color: #666;
    }
    
    .prediction-details {
        margin: 1rem 0;
        padding: 1rem 0;
        border-top: 1px solid #e9ecef;
        border-bottom: 1px solid #e9ecef;
    }
    
    .chance-indicator,
    .cutoff-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    
    .chance-label,
    .cutoff-label {
        color: #666;
        font-weight: 600;
    }
    
    .chance-value {
        font-weight: bold;
    }
    
    .cutoff-value {
        color: #333;
    }
    
    .college-exam {
        margin: 1rem 0;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e9ecef;
    }
    
    .exam-label {
        color: #666;
        font-size: 0.875rem;
    }
    
    .exam-value {
        color: #333;
        font-weight: 600;
        margin-left: 0.5rem;
    }
`;
document.head.appendChild(noResultsStyle);
