// Authentication Module
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.token = null;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            // For demo purposes, simulate login
            if (this.validateDemoAccount(email, password)) {
                this.setAuthSession(email);
                this.showMainApp();
                this.showNotification('Login successful!', 'success');
            } else {
                this.showNotification('Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        }
    }

    validateDemoAccount(email, password) {
        const demoAccounts = [
            { email: 'student@demo.com', password: 'demo123' },
            { email: 'admin@demo.com', password: 'admin123' }
        ];

        return demoAccounts.some(account => 
            account.email === email && account.password === password
        );
    }

    setAuthSession(email) {
        this.currentUser = { email, name: email.split('@')[0] };
        this.token = 'demo-token-' + Date.now();
        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        localStorage.setItem('authToken', this.token);
    }

    checkAuthStatus() {
        const storedUser = localStorage.getItem('currentUser');
        const storedToken = localStorage.getItem('authToken');

        if (storedUser && storedToken) {
            this.currentUser = JSON.parse(storedUser);
            this.token = storedToken;
            this.showMainApp();
        } else {
            this.showLoginSection();
        }
    }

    showMainApp() {
        const loginSection = document.getElementById('loginSection');
        const predictSection = document.getElementById('predictSection');
        const userEmail = document.getElementById('userEmail');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginSection) loginSection.style.display = 'none';
        if (predictSection) predictSection.style.display = 'block';
        if (userEmail) userEmail.textContent = this.currentUser.email;
        if (logoutBtn) logoutBtn.style.display = 'block';

        // Update navigation
        this.updateNavigation('predict');
    }

    showLoginSection() {
        const loginSection = document.getElementById('loginSection');
        const predictSection = document.getElementById('predictSection');
        const userEmail = document.getElementById('userEmail');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginSection) loginSection.style.display = 'flex';
        if (predictSection) predictSection.style.display = 'none';
        if (userEmail) userEmail.textContent = 'Guest';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }

    handleLogout() {
        this.currentUser = null;
        this.token = null;
        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        
        this.showLoginSection();
        this.showNotification('Logged out successfully', 'success');
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

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'slideIn 0.3s ease'
        });

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    isAuthenticated() {
        return this.currentUser !== null && this.token !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getToken() {
        return this.token;
    }
}

// Global instance
window.authManager = new AuthManager();

// Helper function for demo accounts
window.fillDemoAccount = function(email, password) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
