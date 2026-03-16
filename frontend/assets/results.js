// Results Page JavaScript
class ResultsManager {
    constructor() {
        this.apiBase = 'http://localhost:5000/api';
        this.predictions = [];
        this.filteredPredictions = [];
        this.init();
    }

    init() {
        this.loadPredictionResults();
        this.setupEventListeners();
        this.updateSummary();
    }

    loadPredictionResults() {
        const storedResults = localStorage.getItem('predictionResults');
        const storedPrediction = localStorage.getItem('lastPrediction');
        
        if (storedResults) {
            this.predictions = JSON.parse(storedResults);
            this.filteredPredictions = [...this.predictions];
            this.displayResults();
            this.populateFilters();
        } else {
            // No results found, redirect to predict page
            authManager.showNotification('No prediction results found. Please enter your details first.', 'info');
            setTimeout(() => {
                window.location.href = 'predict.html';
            }, 2000);
        }
        
        if (storedPrediction) {
            this.updatePredictionInfo(JSON.parse(storedPrediction));
        }
    }

    setupEventListeners() {
        // Filter dropdowns
        ['filterExam', 'filterBranch', 'filterLocation', 'filterType', 'sortBy'].forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
            }
        });

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportResults());
        }

        // Save button
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePrediction());
        }

        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareResults());
        }
    }

    updatePredictionInfo(predictionData) {
        const userRankEl = document.getElementById('userRank');
        const userExamEl = document.getElementById('userExam');
        
        if (userRankEl) {
            userRankEl.textContent = predictionData.rank;
        }
        
        if (userExamEl) {
            const examNames = {
                'jee_main': 'JEE Main',
                'jee_advanced': 'JEE Advanced',
                'eamcet': 'EAMCET',
                'bitsat': 'BITSAT',
                'mhcet': 'MHCET',
                'kcet': 'KCET',
                'wbjee': 'WBJEE'
            };
            userExamEl.textContent = examNames[predictionData.examType] || predictionData.examType;
        }
    }

    updateSummary() {
        const totalCollegesEl = document.getElementById('totalColleges');
        const topCollegesEl = document.getElementById('topColleges');
        const highChanceEl = document.getElementById('highChance');
        
        if (totalCollegesEl) {
            totalCollegesEl.textContent = this.predictions.length;
        }
        
        if (topCollegesEl) {
            const topColleges = this.predictions.filter(college => college.nirfRank && college.nirfRank <= 50);
            topCollegesEl.textContent = topColleges.length;
        }
        
        if (highChanceEl) {
            // Consider high chance if cutoff rank is significantly higher than user's rank
            const highChance = this.predictions.filter(college => {
                const storedPrediction = JSON.parse(localStorage.getItem('lastPrediction') || '{}');
                return college.cutoffRank > storedPrediction.rank * 1.5;
            });
            highChanceEl.textContent = highChance.length;
        }
    }

    displayResults() {
        const collegeList = document.getElementById('collegeList');
        if (!collegeList) return;
        
        if (this.filteredPredictions.length === 0) {
            collegeList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No colleges found matching your criteria.</p>
                    <p>Try adjusting your filters.</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = this.filteredPredictions.map(college => this.createCollegeCard(college)).join('');
        collegeList.innerHTML = resultsHTML;
        
        // Show recommendations if we have results
        const recommendationsSection = document.getElementById('recommendations');
        if (recommendationsSection && this.filteredPredictions.length > 0) {
            recommendationsSection.style.display = 'block';
        }
    }

    createCollegeCard(college) {
        const chanceLevel = this.getChanceLevel(college);
        const chanceColor = this.getChanceColor(chanceLevel);
        
        return `
            <div class="college-card" data-college-id="${college.id}">
                <div class="college-header">
                    <h3 class="college-name">${college.name}</h3>
                    <div class="college-rank-badge">
                        <i class="fas fa-trophy"></i>
                        <span>NIRF Rank: ${college.nirfRank || 'N/A'}</span>
                    </div>
                </div>
                
                <div class="college-details">
                    <div class="college-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${college.location}</span>
                    </div>
                    
                    <div class="college-info">
                        <div class="college-exam">
                            <i class="fas fa-file-alt"></i>
                            <span>${college.exam}</span>
                        </div>
                        
                        <div class="college-branch">
                            <i class="fas fa-book"></i>
                            <span>${college.branch}</span>
                        </div>
                        
                        <div class="college-type">
                            <i class="fas fa-university"></i>
                            <span>${college.type || 'N/A'}</span>
                        </div>
                    </div>
                    
                    <div class="college-cutoff">
                        <div class="cutoff-rank">
                            <i class="fas fa-chart-line"></i>
                            <span>Cutoff Rank: ${college.cutoffRank}</span>
                        </div>
                        
                        <div class="chance-indicator ${chanceColor}">
                            <i class="fas fa-${this.getChanceIcon(chanceLevel)}"></i>
                            <span>${chanceLevel} Chance</span>
                        </div>
                    </div>
                </div>
                
                <div class="college-actions">
                    <button class="btn-small btn-secondary" onclick="resultsManager.viewCollegeDetails(${college.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn-small btn-primary" onclick="resultsManager.compareCollege(${college.id})">
                        <i class="fas fa-balance-scale"></i> Compare
                    </button>
                </div>
            </div>
        `;
    }

    getChanceLevel(college) {
        const storedPrediction = JSON.parse(localStorage.getItem('lastPrediction') || '{}');
        const userRank = storedPrediction.rank || 0;
        const cutoffRank = college.cutoffRank || 0;
        
        if (userRank <= cutoffRank * 0.8) return 'High';
        if (userRank <= cutoffRank) return 'Medium';
        return 'Low';
    }

    getChanceColor(level) {
        switch (level) {
            case 'High': return 'chance-high';
            case 'Medium': return 'chance-medium';
            case 'Low': return 'chance-low';
            default: return 'chance-unknown';
        }
    }

    getChanceIcon(level) {
        switch (level) {
            case 'High': return 'check-circle';
            case 'Medium': return 'exclamation-circle';
            case 'Low': return 'times-circle';
            default: return 'question-circle';
        }
    }

    populateFilters() {
        // Populate exam filter
        const exams = [...new Set(this.predictions.map(c => c.exam))];
        this.populateDropdown('filterExam', exams);
        
        // Populate branch filter
        const branches = [...new Set(this.predictions.map(c => c.branch))];
        this.populateDropdown('filterBranch', branches);
        
        // Populate location filter
        const locations = [...new Set(this.predictions.map(c => c.location))];
        this.populateDropdown('filterLocation', locations);
    }

    populateDropdown(dropdownId, options) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;
        
        const currentValue = dropdown.value;
        
        // Clear existing options except the first one
        while (dropdown.children.length > 1) {
            dropdown.removeChild(dropdown.lastChild);
        }
        
        // Add new options
        options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option;
            optionEl.textContent = option;
            dropdown.appendChild(optionEl);
        });
        
        dropdown.value = currentValue;
    }

    applyFilters() {
        const examFilter = document.getElementById('filterExam').value;
        const branchFilter = document.getElementById('filterBranch').value;
        const locationFilter = document.getElementById('filterLocation').value;
        const typeFilter = document.getElementById('filterType').value;
        const sortBy = document.getElementById('sortBy').value;
        
        // Apply filters
        this.filteredPredictions = this.predictions.filter(college => {
            if (examFilter && college.exam !== examFilter) return false;
            if (branchFilter && !college.branch.includes(branchFilter)) return false;
            if (locationFilter && !college.location.includes(locationFilter)) return false;
            if (typeFilter && college.type !== typeFilter) return false;
            return true;
        });
        
        // Apply sorting
        this.sortResults(sortBy);
        
        // Display filtered results
        this.displayResults();
    }

    sortResults(sortBy) {
        switch (sortBy) {
            case 'rank':
                this.filteredPredictions.sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999));
                break;
            case 'cutoff':
                this.filteredPredictions.sort((a, b) => a.cutoffRank - b.cutoffRank);
                break;
            case 'name':
                this.filteredPredictions.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'location':
                this.filteredPredictions.sort((a, b) => a.location.localeCompare(b.location));
                break;
        }
    }

    exportResults() {
        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `college-predictions-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
        window.URL.revokeObjectURL(url);
        authManager.showNotification('Results exported successfully!', 'success');
    }

    generateCSV() {
        const headers = ['College Name', 'Location', 'Exam', 'Branch', 'Cutoff Rank', 'NIRF Rank', 'Type', 'Chance Level'];
        const rows = this.filteredPredictions.map(college => {
            const chanceLevel = this.getChanceLevel(college);
            return [
                college.name,
                college.location,
                college.exam,
                college.branch,
                college.cutoffRank,
                college.nirfRank || 'N/A',
                college.type || 'N/A',
                chanceLevel
            ];
        });
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    savePrediction() {
        const predictionData = {
            timestamp: new Date().toISOString(),
            prediction: JSON.parse(localStorage.getItem('lastPrediction') || '{}'),
            results: this.predictions
        };
        
        // Get existing saved predictions
        const savedPredictions = JSON.parse(localStorage.getItem('savedPredictions') || '[]');
        savedPredictions.push(predictionData);
        
        // Keep only last 10 predictions
        if (savedPredictions.length > 10) {
            savedPredictions.shift();
        }
        
        localStorage.setItem('savedPredictions', JSON.stringify(savedPredictions));
        authManager.showNotification('Prediction saved successfully!', 'success');
    }

    shareResults() {
        const shareText = `Check out my college predictions!\n\n` +
            `Rank: ${JSON.parse(localStorage.getItem('lastPrediction') || '{}').rank}\n` +
            `Colleges found: ${this.predictions.length}\n` +
            `Top 50 colleges: ${this.predictions.filter(c => c.nirfRank <= 50).length}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My College Predictions',
                text: shareText
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                authManager.showNotification('Results copied to clipboard!', 'success');
            });
        }
    }

    viewCollegeDetails(collegeId) {
        // Store selected college and redirect to details page
        const college = this.predictions.find(c => c.id === collegeId);
        if (college) {
            localStorage.setItem('selectedCollege', JSON.stringify(college));
            // In a real app, this would navigate to a college details page
            authManager.showNotification(`Viewing details for ${college.name}`, 'info');
        }
    }

    compareCollege(collegeId) {
        // Add to comparison list
        const college = this.predictions.find(c => c.id === collegeId);
        if (college) {
            let comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
            
            if (!comparisonList.find(c => c.id === collegeId)) {
                comparisonList.push(college);
                localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
                authManager.showNotification(`${college.name} added to comparison`, 'success');
            } else {
                authManager.showNotification('College already in comparison list', 'info');
            }
        }
    }
}

// Initialize results manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.resultsManager = new ResultsManager();
});
