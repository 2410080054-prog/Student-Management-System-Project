// Top Colleges Page JavaScript
class TopCollegesManager {
    constructor() {
        this.apiBase = 'http://localhost:5000/api';
        this.colleges = [];
        this.filteredColleges = [];
        this.currentView = 'grid';
        this.selectedColleges = [];
        this.init();
    }

    init() {
        this.loadTopColleges();
        this.setupEventListeners();
        this.updateStats();
    }

    async loadTopColleges() {
        try {
            this.colleges = await this.fetchData('/colleges/top75');
            this.filteredColleges = [...this.colleges];
            this.displayColleges();
            this.updateStats();
        } catch (error) {
            console.error('Error loading top colleges:', error);
            this.showError('Failed to load colleges. Please try again.');
        }
    }

    async fetchData(endpoint) {
        const response = await fetch(this.apiBase + endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    }

    setupEventListeners() {
        // View toggle buttons
        document.querySelectorAll('[data-view]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.filterByType(e.target.dataset.filter);
            });
        });

        // State filter
        const stateFilter = document.getElementById('stateFilter');
        if (stateFilter) {
            stateFilter.addEventListener('change', () => this.applyFilters());
        }

        // Establishment filter
        const establishmentFilter = document.getElementById('establishmentFilter');
        if (establishmentFilter) {
            establishmentFilter.addEventListener('change', () => this.applyFilters());
        }

        // Search
        const searchInput = document.getElementById('collegeSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchColleges(e.target.value);
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreColleges());
        }

        // Compare button
        const compareBtn = document.getElementById('compareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.compareSelectedColleges());
        }
    }

    switchView(view) {
        this.currentView = view;
        
        // Update button states
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Update display
        const container = document.getElementById('topCollegesList');
        if (container) {
            container.className = view === 'grid' ? 'college-grid' : 'college-list';
        }
        
        this.displayColleges();
    }

    displayColleges() {
        const container = document.getElementById('topCollegesList');
        if (!container) return;
        
        if (this.filteredColleges.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No colleges found matching your criteria.</p>
                </div>
            `;
            return;
        }
        
        const collegesHTML = this.filteredColleges.map(college => 
            this.createCollegeCard(college)
        ).join('');
        
        container.innerHTML = collegesHTML;
        
        // Show load more button if there are more colleges
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = this.filteredColleges.length < this.colleges.length ? 'block' : 'none';
        }
    }

    createCollegeCard(college) {
        const isSelected = this.selectedColleges.some(c => c.id === college.id);
        const nirfRank = college.nirf_rank || college.nirfRank;
        
        return `
            <div class="college-card ${isSelected ? 'selected' : ''}" data-college-id="${college.id}">
                <div class="college-header">
                    <div class="college-rank">
                        <span class="rank-number">${nirfRank || 'N/A'}</span>
                        <span class="rank-label">NIRF Rank</span>
                    </div>
                    <div class="college-type-badge ${college.type?.toLowerCase()}">
                        ${college.type || 'N/A'}
                    </div>
                </div>
                
                <div class="college-content">
                    <h3 class="college-name" onclick="topCollegesManager.openCollegeWebsite('${college.website || '#'}')">
                        ${college.name}
                        <i class="fas fa-external-link-alt"></i>
                    </h3>
                    
                    <div class="college-details">
                        <div class="college-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${college.location}</span>
                        </div>
                        
                        <div class="college-info">
                            <div class="college-established">
                                <i class="fas fa-calendar"></i>
                                <span>Est. ${college.established_year || 'N/A'}</span>
                            </div>
                            
                            <div class="college-exam">
                                <i class="fas fa-file-alt"></i>
                                <span>${college.exam_short_name || college.exam || 'Various'}</span>
                            </div>
                        </div>
                    </div>
                    
                    ${this.currentView === 'list' ? `
                        <div class="college-description">
                            <p>${college.description || 'Premier engineering institution known for academic excellence and research.'}</p>
                        </div>
                    ` : ''}
                </div>
                
                <div class="college-actions">
                    <button class="btn-small btn-secondary" onclick="topCollegesManager.viewDetails(${college.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn-small btn-primary" onclick="topCollegesManager.toggleSelection(${college.id})">
                        <i class="fas fa-${isSelected ? 'check-square' : 'square'}"></i> 
                        ${isSelected ? 'Selected' : 'Compare'}
                    </button>
                </div>
            </div>
        `;
    }

    filterByType(type) {
        // Update tab states
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === type);
        });
        
        if (type === 'all') {
            this.filteredColleges = [...this.colleges];
        } else {
            this.filteredColleges = this.colleges.filter(college => 
                college.type === type
            );
        }
        
        this.applyFilters();
    }

    applyFilters() {
        const stateFilter = document.getElementById('stateFilter').value;
        const establishmentFilter = document.getElementById('establishmentFilter').value;
        
        this.filteredColleges = this.filteredColleges.filter(college => {
            // State filter
            if (stateFilter && !college.location.includes(stateFilter)) {
                return false;
            }
            
            // Establishment filter
            if (establishmentFilter && college.established_year) {
                const year = college.established_year;
                switch (establishmentFilter) {
                    case 'pre-1960':
                        if (year >= 1960) return false;
                        break;
                    case '1960-1990':
                        if (year < 1960 || year > 1990) return false;
                        break;
                    case '1990-2010':
                        if (year < 1990 || year > 2010) return false;
                        break;
                    case 'post-2010':
                        if (year <= 2010) return false;
                        break;
                }
            }
            
            return true;
        });
        
        this.displayColleges();
        this.updateStats();
    }

    searchColleges(query) {
        if (!query.trim()) {
            this.filteredColleges = [...this.colleges];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredColleges = this.colleges.filter(college => 
                college.name.toLowerCase().includes(searchTerm) ||
                college.location.toLowerCase().includes(searchTerm) ||
                (college.type && college.type.toLowerCase().includes(searchTerm))
            );
        }
        
        this.displayColleges();
        this.updateStats();
    }

    loadMoreColleges() {
        // In a real app, this would load more colleges from the API
        // For now, we'll just show all colleges
        this.filteredColleges = [...this.colleges];
        this.displayColleges();
        
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    updateStats() {
        const totalCollegesCount = document.getElementById('totalCollegesCount');
        const iitCount = document.getElementById('iitCount');
        const nitCount = document.getElementById('nitCount');
        const otherCount = document.getElementById('otherCount');
        
        if (totalCollegesCount) {
            totalCollegesCount.textContent = this.filteredColleges.length;
        }
        
        if (iitCount) {
            const iits = this.filteredColleges.filter(c => c.type === 'IIT');
            iitCount.textContent = iits.length;
        }
        
        if (nitCount) {
            const nits = this.filteredColleges.filter(c => c.type === 'NIT');
            nitCount.textContent = nits.length;
        }
        
        if (otherCount) {
            const others = this.filteredColleges.filter(c => c.type !== 'IIT' && c.type !== 'NIT');
            otherCount.textContent = others.length;
        }
    }

    toggleSelection(collegeId) {
        const college = this.colleges.find(c => c.id === collegeId);
        if (!college) return;
        
        const index = this.selectedColleges.findIndex(c => c.id === collegeId);
        
        if (index > -1) {
            this.selectedColleges.splice(index, 1);
        } else {
            if (this.selectedColleges.length < 5) {
                this.selectedColleges.push(college);
            } else {
                authManager.showNotification('You can compare up to 5 colleges at a time', 'warning');
                return;
            }
        }
        
        this.updateSelectedCollegesDisplay();
        this.displayColleges();
    }

    updateSelectedCollegesDisplay() {
        const container = document.getElementById('selectedColleges');
        const compareBtn = document.getElementById('compareBtn');
        
        if (!container) return;
        
        if (this.selectedColleges.length === 0) {
            container.innerHTML = '<p>Select colleges to compare</p>';
            if (compareBtn) compareBtn.disabled = true;
        } else {
            container.innerHTML = this.selectedColleges.map(college => `
                <div class="selected-college">
                    <span>${college.name}</span>
                    <button class="remove-selected" onclick="topCollegesManager.toggleSelection(${college.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
            if (compareBtn) compareBtn.disabled = false;
        }
    }

    compareSelectedColleges() {
        if (this.selectedColleges.length < 2) {
            authManager.showNotification('Please select at least 2 colleges to compare', 'warning');
            return;
        }
        
        localStorage.setItem('comparisonColleges', JSON.stringify(this.selectedColleges));
        // In a real app, this would navigate to a comparison page
        authManager.showNotification(`Comparing ${this.selectedColleges.length} colleges`, 'success');
    }

    viewDetails(collegeId) {
        const college = this.colleges.find(c => c.id === collegeId);
        if (college) {
            localStorage.setItem('selectedCollege', JSON.stringify(college));
            // Navigate to college details page
            window.location.href = 'college-details.html';
        }
    }

    openCollegeWebsite(website) {
        if (website && website !== '#') {
            window.open(website, '_blank');
        } else {
            authManager.showNotification('Website not available for this college', 'warning');
        }
    }

    showError(message) {
        const container = document.getElementById('topCollegesList');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize top colleges manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.topCollegesManager = new TopCollegesManager();
});
