// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const examForm = document.getElementById('examForm');
const resultsSection = document.getElementById('results');
const collegeList = document.getElementById('collegeList');
const topCollegesList = document.getElementById('topCollegesList');
const loadingSpinner = '<div class="loading"><i class="fas fa-spinner"></i><p>Loading...</p></div>';

// Sample data for demonstration (will be replaced with API calls)
const sampleColleges = [
    {
        id: 1,
        name: "Indian Institute of Technology Bombay",
        location: "Mumbai, Maharashtra",
        exam: "JEE Advanced",
        branch: "Computer Science Engineering",
        cutoffRank: 100,
        nirfRank: 3
    },
    {
        id: 2,
        name: "Indian Institute of Technology Delhi",
        location: "New Delhi",
        exam: "JEE Advanced",
        branch: "Computer Science Engineering",
        cutoffRank: 150,
        nirfRank: 2
    },
    {
        id: 3,
        name: "National Institute of Technology Warangal",
        location: "Warangal, Telangana",
        exam: "JEE Main",
        branch: "Computer Science Engineering",
        cutoffRank: 5000,
        nirfRank: 25
    },
    {
        id: 4,
        name: "International Institute of Information Technology Hyderabad",
        location: "Hyderabad, Telangana",
        exam: "JEE Main",
        branch: "Computer Science Engineering",
        cutoffRank: 8000,
        nirfRank: 45
    },
    {
        id: 5,
        name: "Jawaharlal Nehru Technological University Hyderabad",
        location: "Hyderabad, Telangana",
        exam: "EAMCET",
        branch: "Computer Science Engineering",
        cutoffRank: 1000,
        nirfRank: 60
    }
];

const top75Colleges = [
    { id: 1, name: "IIT Madras", location: "Chennai, Tamil Nadu", nirfRank: 1, exam: "JEE Advanced" },
    { id: 2, name: "IIT Delhi", location: "New Delhi", nirfRank: 2, exam: "JEE Advanced" },
    { id: 3, name: "IIT Bombay", location: "Mumbai, Maharashtra", nirfRank: 3, exam: "JEE Advanced" },
    { id: 4, name: "IIT Kanpur", location: "Kanpur, Uttar Pradesh", nirfRank: 4, exam: "JEE Advanced" },
    { id: 5, name: "IIT Roorkee", location: "Roorkee, Uttarakhand", nirfRank: 5, exam: "JEE Advanced" },
    { id: 6, name: "IIT Kharagpur", location: "Kharagpur, West Bengal", nirfRank: 6, exam: "JEE Advanced" },
    { id: 7, name: "IIT Guwahati", location: "Guwahati, Assam", nirfRank: 7, exam: "JEE Advanced" },
    { id: 8, name: "IIT Hyderabad", location: "Hyderabad, Telangana", nirfRank: 8, exam: "JEE Advanced" },
    { id: 9, name: "IIT Indore", location: "Indore, Madhya Pradesh", nirfRank: 9, exam: "JEE Advanced" },
    { id: 10, name: "IIT Gandhinagar", location: "Gandhinagar, Gujarat", nirfRank: 10, exam: "JEE Advanced" }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTopColleges();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    examForm.addEventListener('submit', handleFormSubmit);
    
    // View toggle buttons
    document.querySelectorAll('[data-view]').forEach(button => {
        button.addEventListener('click', handleViewToggle);
    });
    
    // Filter dropdowns
    ['filterExam', 'filterBranch', 'filterLocation'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', applyFilters);
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(examForm);
    const examData = {
        examType: formData.get('examType'),
        rank: parseInt(formData.get('rank')),
        category: formData.get('category'),
        preferredBranch: formData.get('preferredBranch') || null,
        preferredLocation: formData.get('preferredLocation') || null
    };
    
    // Show loading state
    resultsSection.style.display = 'block';
    collegeList.innerHTML = loadingSpinner;
    
    try {
        // In a real application, this would be an API call
        // const response = await fetch(`${API_BASE_URL}/predict`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(examData)
        // });
        // const colleges = await response.json();
        
        // For now, use sample data and filter based on input
        const colleges = predictColleges(examData);
        displayColleges(colleges);
        populateFilters(colleges);
        
    } catch (error) {
        console.error('Error predicting colleges:', error);
        collegeList.innerHTML = '<div class="no-results"><i class="fas fa-exclamation-triangle"></i><p>Error loading predictions. Please try again.</p></div>';
    }
}

// Predict colleges based on exam data (mock implementation)
function predictColleges(examData) {
    return sampleColleges.filter(college => {
        // Filter by exam type
        if (examData.examType && college.exam.toLowerCase().includes(examData.examType.replace('_', ' '))) {
            // Check if rank is within cutoff (with some buffer)
            const rankBuffer = examData.rank * 1.2; // 20% buffer
            if (examData.rank <= rankBuffer) {
                // Filter by preferred branch if specified
                if (examData.preferredBranch && !college.branch.toLowerCase().includes(examData.preferredBranch.replace('_', ' '))) {
                    return false;
                }
                // Filter by preferred location if specified
                if (examData.preferredLocation && !college.location.toLowerCase().includes(examData.preferredLocation.replace('_', ' '))) {
                    return false;
                }
                return true;
            }
        }
        return false;
    });
}

// Display colleges in the results section
function displayColleges(colleges) {
    if (colleges.length === 0) {
        collegeList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No colleges found matching your criteria.</p>
                <p>Try adjusting your rank or preferences.</p>
            </div>
        `;
        return;
    }
    
    const collegesHTML = colleges.map(college => `
        <div class="college-card">
            <h3 class="college-name">${college.name}</h3>
            <div class="college-location">
                <i class="fas fa-map-marker-alt"></i>
                ${college.location}
            </div>
            <div class="college-exam">${college.exam}</div>
            <div class="college-branch">${college.branch}</div>
            <div class="college-rank">Expected Cutoff Rank: ${college.cutoffRank}</div>
            ${college.nirfRank ? `<div class="college-nirf">NIRF Rank: ${college.nirfRank}</div>` : ''}
        </div>
    `).join('');
    
    collegeList.innerHTML = collegesHTML;
}

// Load and display top 75 colleges
function loadTopColleges() {
    // In a real application, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/colleges/top75`);
    // const colleges = await response.json();
    
    displayTopColleges(top75Colleges);
}

// Display top colleges
function displayTopColleges(colleges) {
    const collegesHTML = colleges.map(college => `
        <div class="college-card">
            <h3 class="college-name">${college.name}</h3>
            <div class="college-location">
                <i class="fas fa-map-marker-alt"></i>
                ${college.location}
            </div>
            <div class="college-exam">${college.exam}</div>
            <div class="college-nirf">NIRF Rank: ${college.nirfRank}</div>
        </div>
    `).join('');
    
    topCollegesList.innerHTML = collegesHTML;
}

// Handle view toggle (grid/list)
function handleViewToggle(e) {
    const view = e.currentTarget.dataset.view;
    
    // Update active button
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Update view
    if (view === 'list') {
        topCollegesList.className = 'college-list';
    } else {
        topCollegesList.className = 'college-grid';
    }
}

// Populate filter dropdowns
function populateFilters(colleges) {
    const exams = [...new Set(colleges.map(c => c.exam))];
    const branches = [...new Set(colleges.map(c => c.branch))];
    const locations = [...new Set(colleges.map(c => c.location))];
    
    populateDropdown('filterExam', exams);
    populateDropdown('filterBranch', branches);
    populateDropdown('filterLocation', locations);
}

// Populate a single dropdown
function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    const currentValue = dropdown.value;
    
    dropdown.innerHTML = '<option value="">All</option>';
    options.forEach(option => {
        dropdown.innerHTML += `<option value="${option}">${option}</option>`;
    });
    
    dropdown.value = currentValue;
}

// Apply filters to college list
function applyFilters() {
    const examFilter = document.getElementById('filterExam').value;
    const branchFilter = document.getElementById('filterBranch').value;
    const locationFilter = document.getElementById('filterLocation').value;
    
    // Get current colleges (in a real app, this would come from the API)
    const currentColleges = Array.from(collegeList.children).map(card => {
        const name = card.querySelector('.college-name').textContent;
        const exam = card.querySelector('.college-exam').textContent;
        const branch = card.querySelector('.college-branch')?.textContent || '';
        const location = card.querySelector('.college-location').textContent;
        
        return { name, exam, branch, location, element: card };
    });
    
    // Apply filters
    currentColleges.forEach(college => {
        let show = true;
        
        if (examFilter && college.exam !== examFilter) show = false;
        if (branchFilter && !college.branch.includes(branchFilter)) show = false;
        if (locationFilter && !college.location.includes(locationFilter)) show = false;
        
        college.element.style.display = show ? 'block' : 'none';
    });
}

// Utility function to show loading state
function showLoading(element) {
    element.innerHTML = loadingSpinner;
}

// Utility function to show error message
function showError(element, message) {
    element.innerHTML = `
        <div class="no-results">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
}
