// Enhanced Search Module
class SearchManager {
    constructor() {
        this.allColleges = [];
        this.filteredColleges = [];
        this.searchTimeout = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAllColleges();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('collegeSearchInput');
        const searchBtn = document.getElementById('searchBtn');
        const clearBtn = document.getElementById('clearSearchBtn');
        const stateFilter = document.getElementById('stateFilter');
        const typeFilter = document.getElementById('typeFilter');
        const examFilter = document.getElementById('examFilter');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.performSearch();
                }, 300);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearSearch());
        }

        if (stateFilter) {
            stateFilter.addEventListener('change', () => this.performSearch());
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.performSearch());
        }

        if (examFilter) {
            examFilter.addEventListener('change', () => this.performSearch());
        }
    }

    async loadAllColleges() {
        try {
            const response = await fetch('http://localhost:8080/api/colleges');
            if (response.ok) {
                this.allColleges = await response.json();
                console.log(`Loaded ${this.allColleges.length} colleges`);
            } else {
                // Fallback to demo data
                this.loadDemoColleges();
            }
        } catch (error) {
            console.error('Error loading colleges:', error);
            this.loadDemoColleges();
        }
    }

    loadDemoColleges() {
        // Use the same demo data from colleges.js but expanded
        this.allColleges = [
            {
                id: 1,
                name: 'Indian Institute of Technology Madras',
                location: 'Chennai, Tamil Nadu',
                state: 'Tamil Nadu',
                city: 'Chennai',
                type: 'IIT',
                establishedYear: 1959,
                nirfRank: 1,
                website: 'https://www.iitm.ac.in',
                examShortName: 'JEE Advanced'
            },
            {
                id: 2,
                name: 'Indian Institute of Technology Delhi',
                location: 'New Delhi, Delhi',
                state: 'Delhi',
                city: 'New Delhi',
                type: 'IIT',
                establishedYear: 1961,
                nirfRank: 2,
                website: 'https://www.iitd.ac.in',
                examShortName: 'JEE Advanced'
            },
            {
                id: 3,
                name: 'Vellore Institute of Technology',
                location: 'Vellore, Tamil Nadu',
                state: 'Tamil Nadu',
                city: 'Vellore',
                type: 'Private',
                establishedYear: 1984,
                nirfRank: 40,
                website: 'https://www.vit.ac.in',
                examShortName: 'VITEEE'
            },
            {
                id: 4,
                name: 'National Institute of Technology Tiruchirappalli',
                location: 'Tiruchirappalli, Tamil Nadu',
                state: 'Tamil Nadu',
                city: 'Tiruchirappalli',
                type: 'NIT',
                establishedYear: 1964,
                nirfRank: 9,
                website: 'https://www.nitt.edu',
                examShortName: 'JEE Main'
            },
            {
                id: 5,
                name: 'International Institute of Information Technology Hyderabad',
                location: 'Hyderabad, Telangana',
                state: 'Telangana',
                city: 'Hyderabad',
                type: 'IIIT',
                establishedYear: 1998,
                nirfRank: 37,
                website: 'https://www.iiit.ac.in',
                examShortName: 'JEE Main'
            },
            {
                id: 6,
                name: 'College of Engineering Guindy',
                location: 'Chennai, Tamil Nadu',
                state: 'Tamil Nadu',
                city: 'Chennai',
                type: 'State',
                establishedYear: 1794,
                nirfRank: 45,
                website: 'https://www.annauniv.edu',
                examShortName: 'TNEA'
            },
            {
                id: 7,
                name: 'Birla Institute of Technology and Science Pilani',
                location: 'Pilani, Rajasthan',
                state: 'Rajasthan',
                city: 'Pilani',
                type: 'Private',
                establishedYear: 1964,
                nirfRank: 39,
                website: 'https://www.bits-pilani.ac.in',
                examShortName: 'BITSAT'
            },
            {
                id: 8,
                name: 'SRM Institute of Science and Technology',
                location: 'Chennai, Tamil Nadu',
                state: 'Tamil Nadu',
                city: 'Chennai',
                type: 'Private',
                establishedYear: 1985,
                nirfRank: 41,
                website: 'https://www.srmist.edu.in',
                examShortName: 'SRMJEEE'
            },
            {
                id: 9,
                name: 'Manipal Institute of Technology',
                location: 'Manipal, Karnataka',
                state: 'Karnataka',
                city: 'Manipal',
                type: 'Private',
                establishedYear: 1957,
                nirfRank: 43,
                website: 'https://www.manipal.edu',
                examShortName: 'MU-OET'
            },
            {
                id: 10,
                name: 'Delhi Technological University',
                location: 'Delhi, Delhi',
                state: 'Delhi',
                city: 'Delhi',
                type: 'Govt',
                establishedYear: 1941,
                nirfRank: 61,
                website: 'https://www.dtu.ac.in',
                examShortName: 'JEE Main'
            }
        ];
    }

    performSearch() {
        const searchInput = document.getElementById('collegeSearchInput');
        const stateFilter = document.getElementById('stateFilter');
        const typeFilter = document.getElementById('typeFilter');
        const examFilter = document.getElementById('examFilter');

        const searchTerm = searchInput.value.toLowerCase().trim();
        const state = stateFilter.value.toLowerCase().trim();
        const type = typeFilter.value.toLowerCase().trim();
        const exam = examFilter.value.toLowerCase().trim();

        // Filter colleges based on all criteria
        this.filteredColleges = this.allColleges.filter(college => {
            // Search term filter
            if (searchTerm) {
                const matchesSearch = college.name.toLowerCase().includes(searchTerm) ||
                                  college.location.toLowerCase().includes(searchTerm) ||
                                  college.city.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }

            // State filter
            if (state && !college.state.toLowerCase().includes(state)) {
                return false;
            }

            // Type filter
            if (type && !college.type.toLowerCase().includes(type)) {
                return false;
            }

            // Exam filter
            if (exam && !college.examShortName.toLowerCase().includes(exam)) {
                return false;
            }

            return true;
        });

        this.displaySearchResults();
    }

    displaySearchResults() {
        const searchResults = document.getElementById('searchResults');
        const searchResultsCount = document.getElementById('searchResultsCount');
        const searchResultsGrid = document.getElementById('searchResultsGrid');

        if (!searchResults || !searchResultsGrid) return;

        // Show results section
        searchResults.style.display = 'block';

        // Update count
        if (searchResultsCount) {
            searchResultsCount.textContent = this.filteredColleges.length;
        }

        // Clear existing results
        searchResultsGrid.innerHTML = '';

        if (this.filteredColleges.length === 0) {
            searchResultsGrid.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <h3>No colleges found</h3>
                    <p>Try adjusting your search criteria or filters</p>
                </div>
            `;
            return;
        }

        // Display results
        this.filteredColleges.forEach(college => {
            const resultCard = this.createSearchResultCard(college);
            searchResultsGrid.appendChild(resultCard);
        });
    }

    createSearchResultCard(college) {
        const card = document.createElement('div');
        card.className = 'search-result-card';

        const typeBadgeClass = `type-${college.type.toLowerCase()}`;
        const examBadge = college.examShortName || 'N/A';

        card.innerHTML = `
            <div class="search-result-header">
                <div class="search-result-name">${college.name}</div>
                <div class="search-result-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${college.location}
                </div>
            </div>
            <div class="search-result-details">
                <span class="search-result-badge ${typeBadgeClass}">${college.type}</span>
                <span class="search-result-badge">${examBadge}</span>
                ${college.nirfRank ? `<span class="search-result-badge">Rank #${college.nirfRank}</span>` : ''}
                <span class="search-result-badge">Est. ${college.establishedYear}</span>
            </div>
            <div class="search-result-actions">
                <button class="search-result-website-btn" onclick="window.open('${college.website || '#'}', '_blank')">
                    <i class="fas fa-external-link-alt"></i> Visit Website
                </button>
                <button class="search-result-save-btn" onclick="saveSearchCollege(${JSON.stringify(college).replace(/"/g, '&quot;')})">
                    <i class="fas fa-bookmark"></i> Save
                </button>
            </div>
        `;

        return card;
    }

    clearSearch() {
        const searchInput = document.getElementById('collegeSearchInput');
        const stateFilter = document.getElementById('stateFilter');
        const typeFilter = document.getElementById('typeFilter');
        const examFilter = document.getElementById('examFilter');
        const searchResults = document.getElementById('searchResults');

        // Clear all filters
        if (searchInput) searchInput.value = '';
        if (stateFilter) stateFilter.value = '';
        if (typeFilter) typeFilter.value = '';
        if (examFilter) examFilter.value = '';

        // Hide results
        if (searchResults) searchResults.style.display = 'none';

        // Clear filtered colleges
        this.filteredColleges = [];
    }

    searchByType(type) {
        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.value = type;
            this.performSearch();
        }
    }

    searchByLocation(location) {
        const searchInput = document.getElementById('collegeSearchInput');
        if (searchInput) {
            searchInput.value = location;
            this.performSearch();
        }
    }
}

// Helper function for quick search
window.quickSearch = function(query) {
    if (window.searchManager) {
        // Determine if it's a type or location
        const types = ['IIT', 'NIT', 'IIIT', 'Private', 'State', 'Govt'];
        
        if (types.includes(query)) {
            window.searchManager.searchByType(query);
        } else {
            window.searchManager.searchByLocation(query);
        }
    }
};

// Helper function to save college from search
window.saveSearchCollege = function(college) {
    const savedColleges = JSON.parse(localStorage.getItem('savedColleges') || '[]');
    
    if (!savedColleges.find(c => c.id === college.id)) {
        savedColleges.push(college);
        localStorage.setItem('savedColleges', JSON.stringify(savedColleges));
        window.authManager.showNotification('College saved successfully!', 'success');
    } else {
        window.authManager.showNotification('College already saved!', 'info');
    }
};

// Initialize search manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.searchManager = new SearchManager();
});
