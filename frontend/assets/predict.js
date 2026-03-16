// Prediction Page JavaScript
class PredictionManager {
    constructor() {
        this.apiBase = 'http://localhost:5000/api';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadExamData();
    }

    setupEventListeners() {
        const form = document.getElementById('examForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePrediction();
            });
        }

        // Reset button
        const resetBtn = document.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.clearResults();
            });
        }
    }

    async loadExamData() {
        try {
            // Load exams
            const exams = await this.fetchData('/exams');
            this.populateExamSelect(exams);
            
            // Load branches
            const branches = await this.fetchData('/branches');
            this.populateBranchSelect(branches);
            
        } catch (error) {
            console.error('Error loading exam data:', error);
        }
    }

    async fetchData(endpoint) {
        const response = await fetch(this.apiBase + endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    }

    populateExamSelect(exams) {
        const select = document.getElementById('examType');
        if (!select) return;
        
        // Keep the default option
        const defaultOption = select.querySelector('option[value=""]');
        
        // Clear existing options except default
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        
        // Add exam options
        exams.forEach(exam => {
            const option = document.createElement('option');
            option.value = exam.short_name.toLowerCase().replace(' ', '_');
            option.textContent = exam.name;
            select.appendChild(option);
        });
    }

    populateBranchSelect(branches) {
        const select = document.getElementById('preferredBranch');
        if (!select) return;
        
        // Keep the default option
        const defaultOption = select.querySelector('option[value=""]');
        
        // Clear existing options except default
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        
        // Add branch options
        branches.forEach(branch => {
            const option = document.createElement('option');
            option.value = branch.short_name.toLowerCase().replace(' ', '_');
            option.textContent = branch.name;
            select.appendChild(option);
        });
    }

    async handlePrediction() {
        const form = document.getElementById('examForm');
        const formData = new FormData(form);
        
        const predictionData = {
            examType: formData.get('examType'),
            rank: parseInt(formData.get('rank')),
            category: formData.get('category'),
            state: formData.get('state') || null,
            preferredBranch: formData.get('preferredBranch') || null,
            preferredLocation: formData.get('preferredLocation') || null
        };

        // Validate data
        if (!this.validatePredictionData(predictionData)) {
            return;
        }

        // Show loading state
        this.showLoadingState();

        try {
            // Store prediction data in localStorage for results page
            localStorage.setItem('lastPrediction', JSON.stringify(predictionData));
            
            // Call API for prediction
            const predictions = await this.getPredictions(predictionData);
            
            // Store results and redirect
            localStorage.setItem('predictionResults', JSON.stringify(predictions));
            window.location.href = 'pages/results.html';
            
        } catch (error) {
            console.error('Prediction error:', error);
            this.showError('Failed to get predictions. Please try again.');
        } finally {
            this.hideLoadingState();
        }
    }

    validatePredictionData(data) {
        if (!data.examType) {
            this.showError('Please select an exam type');
            return false;
        }
        
        if (!data.rank || data.rank <= 0) {
            this.showError('Please enter a valid rank');
            return false;
        }
        
        if (!data.category) {
            this.showError('Please select your category');
            return false;
        }
        
        return true;
    }

    async getPredictions(data) {
        const response = await fetch(this.apiBase + '/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to get predictions');
        }
        
        return await response.json();
    }

    showLoadingState() {
        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';
        submitBtn.disabled = true;
        
        // Store original text for later
        submitBtn.dataset.originalText = originalText;
    }

    hideLoadingState() {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn.dataset.originalText) {
            submitBtn.innerHTML = submitBtn.dataset.originalText;
            submitBtn.disabled = false;
            delete submitBtn.dataset.originalText;
        }
    }

    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button class="error-close"><i class="fas fa-times"></i></button>
        `;
        
        // Insert after form
        const form = document.getElementById('examForm');
        form.parentNode.insertBefore(errorDiv, form.nextSibling);
        
        // Show error
        setTimeout(() => {
            errorDiv.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            errorDiv.classList.remove('show');
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 300);
        }, 5000);
        
        // Handle close button
        errorDiv.querySelector('.error-close').addEventListener('click', () => {
            errorDiv.classList.remove('show');
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 300);
        });
    }

    clearResults() {
        // Clear any stored prediction data
        localStorage.removeItem('lastPrediction');
        localStorage.removeItem('predictionResults');
        
        // Clear any error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
}

// Initialize prediction manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PredictionManager();
});
