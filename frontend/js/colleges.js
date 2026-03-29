// Colleges Module
class CollegesManager {
    constructor() {
        this.colleges = [];
        this.filteredColleges = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }

    async init() {
        await this.loadColleges();
        this.setupEventListeners();
    }

    async loadColleges() {
        try {
            const response = await fetch('http://localhost:8080/api/colleges/top75');
            if (response.ok) {
                this.colleges = await response.json();
                this.filteredColleges = [...this.colleges];
                this.displayColleges();
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
        this.colleges = [
            {
                id: 1,
                name: 'Indian Institute of Technology Madras',
                location: 'Chennai, Tamil Nadu',
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
                type: 'IIT',
                establishedYear: 1961,
                nirfRank: 2,
                website: 'https://www.iitd.ac.in',
                examShortName: 'JEE Advanced'
            },
            {
                id: 3,
                name: 'Indian Institute of Technology Bombay',
                location: 'Mumbai, Maharashtra',
                type: 'IIT',
                establishedYear: 1958,
                nirfRank: 3,
                website: 'https://www.iitb.ac.in',
                examShortName: 'JEE Advanced'
            },
            {
                id: 4,
                name: 'Indian Institute of Technology Kanpur',
                location: 'Kanpur, Uttar Pradesh',
                type: 'IIT',
                establishedYear: 1959,
                nirfRank: 4,
                website: 'https://www.iitk.ac.in',
                examShortName: 'JEE Advanced'
            },
            {
                id: 5,
                name: 'Indian Institute of Technology Roorkee',
                location: 'Roorkee, Uttarakhand',
                type: 'IIT',
                establishedYear: 1847,
                nirfRank: 5,
                website: 'https://www.iitr.ac.in',
                examShortName: 'JEE Advanced'
            },
            {
                id: 6,
                name: 'National Institute of Technology Tiruchirappalli',
                location: 'Tiruchirappalli, Tamil Nadu',
                type: 'NIT',
                establishedYear: 1964,
                nirfRank: 9,
                website: 'https://www.nitt.edu',
                examShortName: 'JEE Main'
            },
            {
                id: 7,
                name: 'National Institute of Technology Surathkal',
                location: 'Mangalore, Karnataka',
                type: 'NIT',
                establishedYear: 1960,
                nirfRank: 11,
                website: 'https://www.nitk.edu.in',
                examShortName: 'JEE Main'
            },
            {
                id: 8,
                name: 'Vellore Institute of Technology',
                location: 'Vellore, Tamil Nadu',
                type: 'Private',
                establishedYear: 1984,
                nirfRank: 40,
                website: 'https://www.vit.ac.in',
                examShortName: 'VITEEE'
            },
            {
                id: 9,
                name: 'Birla Institute of Technology and Science Pilani',
                location: 'Pilani, Rajasthan',
                type: 'Private',
                establishedYear: 1964,
                nirfRank: 39,
                website: 'https://www.bits-pilani.ac.in',
                examShortName: 'BITSAT'
            },
            {
                id: 10,
                name: 'College of Engineering Guindy',
                location: 'Chennai, Tamil Nadu',
                type: 'State',
                establishedYear: 1794,
                nirfRank: 45,
                website: 'https://www.annauniv.edu',
                examShortName: 'TNEA'
            }
        ];
        
        this.filteredColleges = [...this.colleges];
        this.displayColleges();
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.filterByType(type);
                
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Search input
        const searchInput = document.getElementById('collegeSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchColleges(e.target.value);
            });
        }
    }

    filterByType(type) {
        this.currentFilter = type;
        this.applyFilters();
    }

    searchColleges(searchTerm) {
        this.searchTerm = searchTerm.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        this.filteredColleges = this.colleges.filter(college => {
            // Filter by type
            if (this.currentFilter !== 'all' && college.type !== this.currentFilter) {
                return false;
            }
            
            // Filter by search term
            if (this.searchTerm) {
                const searchMatch = college.name.toLowerCase().includes(this.searchTerm) ||
                                 college.location.toLowerCase().includes(this.searchTerm);
                if (!searchMatch) return false;
            }
            
            return true;
        });
        
        this.displayColleges();
    }

    displayColleges() {
        const collegesGrid = document.getElementById('collegesGrid');
        if (!collegesGrid) return;
        
        collegesGrid.innerHTML = '';
        
        if (this.filteredColleges.length === 0) {
            collegesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No colleges found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `;
            return;
        }
        
        this.filteredColleges.forEach(college => {
            const collegeCard = this.createCollegeCard(college);
            collegesGrid.appendChild(collegeCard);
        });
    }

    createCollegeCard(college) {
        const card = document.createElement('div');
        card.className = 'college-card';
        
        card.innerHTML = `
            <div class="college-header">
                <div>
                    <div class="college-name">${college.name}</div>
                    <div class="college-location">
                        <i class="fas fa-map-marker-alt"></i> ${college.location}
                    </div>
                </div>
                ${college.nirfRank ? `<div class="college-rank">#${college.nirfRank}</div>` : ''}
            </div>
            <div class="college-details">
                <div class="college-info">
                    <span class="college-type">${college.type}</span>
                    <span class="college-established">Est. ${college.establishedYear}</span>
                </div>
                <div class="college-exam">
                    <span class="exam-label">Entrance Exam:</span>
                    <span class="exam-value">${college.examShortName || 'N/A'}</span>
                </div>
                <div class="college-actions">
                    <button class="website-btn" onclick="window.open('${college.website || '#'}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> Website
                    </button>
                    <button class="compare-btn" onclick="addToComparison(${JSON.stringify(college).replace(/"/g, '&quot;')})">
                        <i class="fas fa-balance-scale"></i> Compare
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
}

// Helper function to add to comparison
window.addToComparison = function(college) {
    const comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    
    if (!comparisonList.find(c => c.id === college.id)) {
        if (comparisonList.length < 5) {
            comparisonList.push(college);
            localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
            window.authManager.showNotification('College added to comparison!', 'success');
        } else {
            window.authManager.showNotification('Maximum 5 colleges can be compared!', 'warning');
        }
    } else {
        window.authManager.showNotification('College already in comparison list!', 'info');
    }
};

// Initialize colleges manager
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the colleges page
    const collegesSection = document.getElementById('collegesSection');
    if (collegesSection && collegesSection.style.display !== 'none') {
        window.collegesManager = new CollegesManager();
    }
});
