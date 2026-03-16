// Authentication System
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.sessionTimeout = null;
        this.SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.startSessionTimer();
    }

    // Check if user is authenticated
    checkAuthStatus() {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('currentUser');
        
        if (token && user) {
            this.currentUser = JSON.parse(user);
            this.updateUI();
            return true;
        }
        
        // Redirect to login if not on login page
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return false;
    }

    // Login user
    async login(email, password, remember = false) {
        try {
            // In production, this would be an API call
            const response = await this.authenticateUser(email, password);
            
            if (response.success) {
                this.currentUser = response.user;
                const token = this.generateToken();
                
                // Store authentication data
                localStorage.setItem('authToken', token);
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                
                if (remember) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                this.updateUI();
                this.startSessionTimer();
                
                // Redirect to predict page
                window.location.href = 'predict.html';
                return { success: true };
            } else {
                return { success: false, message: response.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    }

    // Authenticate user (mock implementation)
    async authenticateUser(email, password) {
        // Mock user database
        const users = [
            { email: 'student@demo.com', password: 'demo123', name: 'Student User', role: 'student' },
            { email: 'admin@demo.com', password: 'admin123', name: 'Admin User', role: 'admin' }
        ];
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            return {
                success: true,
                user: {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    loginTime: new Date().toISOString()
                }
            };
        }
        
        return { success: false, message: 'Invalid email or password' };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        window.location.href = 'login.html';
    }

    // Generate authentication token
    generateToken() {
        return btoa(Date.now() + Math.random().toString(36));
    }

    // Start session timer
    startSessionTimer() {
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        this.sessionTimeout = setTimeout(() => {
            this.showSessionWarning();
        }, this.SESSION_DURATION - 5 * 60 * 1000); // Show warning 5 minutes before expiry
    }

    // Show session warning
    showSessionWarning() {
        const warning = confirm('Your session will expire in 5 minutes. Do you want to extend it?');
        
        if (warning) {
            this.extendSession();
        } else {
            this.logout();
        }
    }

    // Extend session
    extendSession() {
        this.startSessionTimer();
        this.showNotification('Session extended successfully', 'success');
    }

    // Update UI based on auth status
    updateUI() {
        if (this.currentUser) {
            // Update user email in navigation
            const userEmailElements = document.querySelectorAll('#userEmail');
            userEmailElements.forEach(el => {
                el.textContent = this.currentUser.email;
            });
            
            // Show/hide auth-specific elements
            const authElements = document.querySelectorAll('.auth-required');
            authElements.forEach(el => {
                el.style.display = 'block';
            });
            
            const noAuthElements = document.querySelectorAll('.no-auth');
            noAuthElements.forEach(el => {
                el.style.display = 'none';
            });
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Logout buttons
        const logoutBtns = document.querySelectorAll('#logoutBtn');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.logout();
            });
        });

        // Navigation toggle for mobile
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
        }
    }

    // Handle login form submission
    async handleLogin() {
        const form = document.getElementById('loginForm');
        const email = form.email.value;
        const password = form.password.value;
        const remember = form.remember.checked;
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;
        
        try {
            const result = await this.login(email, password, remember);
            
            if (!result.success) {
                this.showNotification(result.message, 'error');
            }
        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Handle close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // Check if user has specific role
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
