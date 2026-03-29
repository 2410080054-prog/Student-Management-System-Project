// Results Module
class ResultsManager {
    constructor() {
        this.results = [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        const exportBtn = document.getElementById('exportBtn');
        const saveBtn = document.getElementById('saveBtn');
        const shareBtn = document.getElementById('shareBtn');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportResults());
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveResults());
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareResults());
        }
    }

    loadResults() {
        const storedResults = localStorage.getItem('predictionResults');
        if (storedResults) {
            this.results = JSON.parse(storedResults);
            this.displayResults();
        }
    }

    displayResults() {
        const resultsGrid = document.getElementById('resultsGrid');
        const resultsCount = document.getElementById('resultsCount');
        
        if (!resultsGrid) return;
        
        // Update count
        if (resultsCount) {
            resultsCount.textContent = `${this.results.length} colleges found based on your preferences`;
        }
        
        // Clear existing results
        resultsGrid.innerHTML = '';
        
        if (this.results.length === 0) {
            resultsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found</h3>
                    <p>Please complete the prediction form to see results.</p>
                </div>
            `;
            return;
        }
        
        // Display results
        this.results.forEach((college, index) => {
            const resultCard = this.createResultCard(college, index);
            resultsGrid.appendChild(resultCard);
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
                    <button class="compare-btn" onclick="saveResultCollege(${JSON.stringify(college).replace(/"/g, '&quot;')})">
                        <i class="fas fa-bookmark"></i> Save
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    calculateChance(college) {
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

    exportResults() {
        if (this.results.length === 0) {
            window.authManager.showNotification('No results to export!', 'warning');
            return;
        }

        const exportData = {
            timestamp: new Date().toISOString(),
            predictionData: JSON.parse(localStorage.getItem('predictionData') || '{}'),
            results: this.results,
            summary: {
                totalColleges: this.results.length,
                iits: this.results.filter(c => c.type === 'IIT').length,
                nits: this.results.filter(c => c.type === 'NIT').length,
                private: this.results.filter(c => c.type === 'Private').length,
                state: this.results.filter(c => c.type === 'State').length
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `college-predictions-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        window.authManager.showNotification('Results exported successfully!', 'success');
    }

    saveResults() {
        if (this.results.length === 0) {
            window.authManager.showNotification('No results to save!', 'warning');
            return;
        }

        const saveData = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            predictionData: JSON.parse(localStorage.getItem('predictionData') || '{}'),
            results: this.results
        };

        const savedPredictions = JSON.parse(localStorage.getItem('savedPredictions') || '[]');
        savedPredictions.push(saveData);
        localStorage.setItem('savedPredictions', JSON.stringify(savedPredictions));

        window.authManager.showNotification('Results saved successfully!', 'success');
    }

    shareResults() {
        if (this.results.length === 0) {
            window.authManager.showNotification('No results to share!', 'warning');
            return;
        }

        const shareText = `Check out my college predictions: ${this.results.length} colleges found!`;
        const shareUrl = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: 'College Admission Predictions',
                text: shareText,
                url: shareUrl
            }).catch(err => {
                console.log('Share failed:', err);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        const shareText = `College Admission Predictions\n${this.results.length} colleges found\n\nTop colleges:\n${this.results.slice(0, 3).map(c => `• ${c.name} (${c.type})`).join('\n')}`;
        
        navigator.clipboard.writeText(shareText).then(() => {
            window.authManager.showNotification('Results copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Copy failed:', err);
            window.authManager.showNotification('Failed to copy results', 'error');
        });
    }
}

// Helper function to save college from results
window.saveResultCollege = function(college) {
    const savedColleges = JSON.parse(localStorage.getItem('savedColleges') || '[]');
    
    if (!savedColleges.find(c => c.id === college.id)) {
        savedColleges.push(college);
        localStorage.setItem('savedColleges', JSON.stringify(savedColleges));
        window.authManager.showNotification('College saved successfully!', 'success');
    } else {
        window.authManager.showNotification('College already saved!', 'info');
    }
};

// Initialize results manager
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the results page
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection && resultsSection.style.display !== 'none') {
        window.resultsManager = new ResultsManager();
        window.resultsManager.loadResults();
    }
});
