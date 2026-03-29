// Prediction Module
class PredictionManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const predictionForm = document.getElementById('predictionForm');
        if (predictionForm) {
            predictionForm.addEventListener('submit', (e) => this.handlePrediction(e));
        }
    }

    async handlePrediction(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const predictionData = {
            examType: formData.get('examType'),
            rank: parseInt(formData.get('rank')),
            category: formData.get('category'),
            branch: formData.get('branch') || '',
            location: formData.get('location') || ''
        };

        try {
            // Show loading state
            this.showLoadingState();
            
            // Make API call to backend
            const response = await fetch('http://localhost:8080/api/colleges/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(predictionData)
            });

            if (!response.ok) {
                throw new Error('Prediction failed');
            }

            const predictions = await response.json();
            
            // Store results and navigate to results page
            localStorage.setItem('predictionResults', JSON.stringify(predictions));
            localStorage.setItem('predictionData', JSON.stringify(predictionData));
            
            this.showResultsSection(predictions);
            
        } catch (error) {
            console.error('Prediction error:', error);
            // Fallback to demo data
            this.showDemoResults(predictionData);
        }
    }

    showLoadingState() {
        const submitBtn = document.querySelector('#predictionForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';
        }
    }

    hideLoadingState() {
        const submitBtn = document.querySelector('#predictionForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-search"></i> Predict Colleges';
        }
    }

    showResultsSection(predictions) {
        this.hideLoadingState();
        
        // Hide predict section, show results section
        const predictSection = document.getElementById('predictSection');
        const resultsSection = document.getElementById('resultsSection');
        
        if (predictSection) predictSection.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'block';
        
        // Update navigation
        window.authManager.updateNavigation('results');
        
        // Display results
        this.displayResults(predictions);
    }

    displayResults(predictions) {
        const resultsGrid = document.getElementById('resultsGrid');
        const resultsCount = document.getElementById('resultsCount');
        
        if (!resultsGrid) return;
        
        // Update count
        if (resultsCount) {
            resultsCount.textContent = `${predictions.length} colleges found based on your preferences`;
        }
        
        // Clear existing results
        resultsGrid.innerHTML = '';
        
        if (predictions.length === 0) {
            resultsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No colleges found</h3>
                    <p>Try adjusting your filters or rank range</p>
                </div>
            `;
            return;
        }
        
        // Display prediction results
        predictions.forEach((college, index) => {
            const collegeCard = this.createResultCard(college, index);
            resultsGrid.appendChild(collegeCard);
        });
    }

    createResultCard(college, index) {
        const card = document.createElement('div');
        card.className = 'result-card';
        
        const chance = this.calculateChance(college);
        const chanceColor = chance === 'high' ? '#10b981' : chance === 'medium' ? '#f59e0b' : '#ef4444';
        
        card.innerHTML = `
            <div class="college-header">
                <div>
                    <div class="college-name">${college.name}</div>
                    <div class="college-location">
                        <i class="fas fa-map-marker-alt"></i> ${college.location || 'Location not available'}
                    </div>
                </div>
                ${college.nirfRank ? `<div class="college-rank">#${college.nirfRank}</div>` : ''}
            </div>
            <div class="college-details">
                <div class="college-info">
                    <span class="college-type">${college.type || 'N/A'}</span>
                    <span class="college-established">Est. ${college.establishedYear || 'N/A'}</span>
                </div>
                <div class="prediction-details">
                    <div class="chance-indicator">
                        <span class="chance-label">Chance:</span>
                        <span class="chance-value" style="color: ${chanceColor}">${chance.toUpperCase()}</span>
                    </div>
                    <div class="cutoff-info">
                        <span class="cutoff-label">Expected Cutoff:</span>
                        <span class="cutoff-value">${this.estimateCutoff(college)}</span>
                    </div>
                </div>
                <div class="college-actions">
                    <button class="website-btn" onclick="window.open('${college.website || '#'}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> Website
                    </button>
                    <button class="compare-btn" onclick="saveCollege(${JSON.stringify(college).replace(/"/g, '&quot;')})">
                        <i class="fas fa-bookmark"></i> Save
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    calculateChance(college) {
        // Simple chance calculation based on college type and rank
        const collegeType = college.type?.toUpperCase();
        const nirfRank = college.nirfRank;
        
        if (collegeType === 'IIT' && nirfRank <= 10) return 'low';
        if (collegeType === 'IIT' && nirfRank > 20) return 'medium';
        if (collegeType === 'NIT' && nirfRank <= 15) return 'low';
        if (collegeType === 'NIT' && nirfRank > 30) return 'medium';
        if (collegeType === 'Private') return 'high';
        if (collegeType === 'State') return 'high';
        
        return 'medium';
    }

    estimateCutoff(college) {
        const collegeType = college.type?.toUpperCase();
        const nirfRank = college.nirfRank;
        
        if (collegeType === 'IIT') {
            if (nirfRank <= 5) return '1-5000';
            if (nirfRank <= 15) return '5000-10000';
            return '10000-15000';
        }
        
        if (collegeType === 'NIT') {
            if (nirfRank <= 10) return '10000-20000';
            if (nirfRank <= 25) return '20000-50000';
            return '50000-80000';
        }
        
        if (collegeType === 'Private') return '50000-100000';
        if (collegeType === 'State') return '100000-200000';
        
        return 'N/A';
    }

    showDemoResults(predictionData) {
        // Generate demo results for testing
        const demoColleges = this.generateDemoColleges(predictionData);
        this.showResultsSection(demoColleges);
    }

    generateDemoColleges(predictionData) {
        const colleges = [
            {
                id: 1,
                name: 'Indian Institute of Technology Madras',
                location: 'Chennai, Tamil Nadu',
                type: 'IIT',
                establishedYear: 1959,
                nirfRank: 1,
                website: 'https://www.iitm.ac.in'
            },
            {
                id: 2,
                name: 'Indian Institute of Technology Delhi',
                location: 'New Delhi, Delhi',
                type: 'IIT',
                establishedYear: 1961,
                nirfRank: 2,
                website: 'https://www.iitd.ac.in'
            },
            {
                id: 3,
                name: 'National Institute of Technology Tiruchirappalli',
                location: 'Tiruchirappalli, Tamil Nadu',
                type: 'NIT',
                establishedYear: 1964,
                nirfRank: 9,
                website: 'https://www.nitt.edu'
            },
            {
                id: 4,
                name: 'Vellore Institute of Technology',
                location: 'Vellore, Tamil Nadu',
                type: 'Private',
                establishedYear: 1984,
                nirfRank: 40,
                website: 'https://www.vit.ac.in'
            },
            {
                id: 5,
                name: 'College of Engineering Guindy',
                location: 'Chennai, Tamil Nadu',
                type: 'State',
                establishedYear: 1794,
                nirfRank: 45,
                website: 'https://www.annauniv.edu'
            }
        ];
        
        // Filter based on prediction data
        return colleges.filter(college => {
            if (predictionData.location && !college.location.toLowerCase().includes(predictionData.location.toLowerCase())) {
                return false;
            }
            if (predictionData.branch && !college.name.toLowerCase().includes('computer')) {
                return false;
            }
            return true;
        });
    }
}

// Helper function to save college
window.saveCollege = function(college) {
    const savedColleges = JSON.parse(localStorage.getItem('savedColleges') || '[]');
    
    if (!savedColleges.find(c => c.id === college.id)) {
        savedColleges.push(college);
        localStorage.setItem('savedColleges', JSON.stringify(savedColleges));
        window.authManager.showNotification('College saved successfully!', 'success');
    } else {
        window.authManager.showNotification('College already saved!', 'info');
    }
};

// Initialize prediction manager
window.predictionManager = new PredictionManager();
