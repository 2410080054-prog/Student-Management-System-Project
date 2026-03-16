// College Details Page JavaScript
class CollegeDetailsManager {
    constructor() {
        this.college = null;
        this.init();
    }

    init() {
        this.loadCollegeDetails();
        this.setupEventListeners();
        this.setupTabSwitching();
    }

    loadCollegeDetails() {
        const storedCollege = localStorage.getItem('selectedCollege');
        
        if (!storedCollege) {
            // No college data, redirect back
            window.location.href = 'top-colleges.html';
            return;
        }
        
        this.college = JSON.parse(storedCollege);
        this.displayCollegeDetails();
        this.loadAdditionalData();
    }

    displayCollegeDetails() {
        if (!this.college) return;

        // Basic information
        document.getElementById('collegeName').textContent = this.college.name;
        document.getElementById('collegeLocation').innerHTML = `
            <i class="fas fa-map-marker-alt"></i> ${this.college.location}
        `;
        document.getElementById('collegeType').innerHTML = `
            <i class="fas fa-university"></i> ${this.college.type || 'N/A'}
        `;
        
        const nirfRank = this.college.nirf_rank || this.college.nirfRank;
        document.getElementById('collegeRank').innerHTML = `
            <i class="fas fa-trophy"></i> NIRF Rank: ${nirfRank || 'N/A'}
        `;

        // Overview tab
        document.getElementById('establishedYear').textContent = 
            this.college.established_year || 'Not available';
        
        document.getElementById('accreditation').textContent = 
            this.getAccreditation();
        
        document.getElementById('website').innerHTML = this.college.website ? 
            `<a href="${this.college.website}" target="_blank">${this.college.website}</a>` : 
            'Not available';
        
        document.getElementById('contact').textContent = 
            this.getContactInfo();
        
        document.getElementById('collegeDescription').textContent = 
            this.college.description || this.generateDescription();
    }

    loadAdditionalData() {
        // Load fee structure
        this.loadFeeStructure();
        
        // Load facilities
        this.loadFacilities();
        
        // Load faculty information
        this.loadFacultyInfo();
        
        // Load admission information
        this.loadAdmissionInfo();
    }

    loadFeeStructure() {
        const feeData = this.generateFeeData();
        const tableBody = document.getElementById('feeTableBody');
        
        if (tableBody) {
            tableBody.innerHTML = feeData.map(fee => `
                <tr>
                    <td>${fee.program}</td>
                    <td>₹${fee.tuition.toLocaleString('en-IN')}</td>
                    <td>₹${fee.hostel.toLocaleString('en-IN')}</td>
                    <td>₹${fee.total.toLocaleString('en-IN')}</td>
                </tr>
            `).join('');
        }
        
        // Scholarship info
        document.getElementById('scholarshipInfo').textContent = 
            this.getScholarshipInfo();
    }

    loadFacilities() {
        const facilities = this.generateFacilityData();
        
        document.getElementById('hostelInfo').textContent = facilities.hostel;
        document.getElementById('libraryInfo').textContent = facilities.library;
        document.getElementById('labInfo').textContent = facilities.labs;
        document.getElementById('sportsInfo').textContent = facilities.sports;
        document.getElementById('messInfo').textContent = facilities.mess;
        document.getElementById('transportInfo').textContent = facilities.transport;
        document.getElementById('medicalInfo').textContent = facilities.medical;
    }

    loadFacultyInfo() {
        const faculty = this.generateFacultyData();
        
        document.getElementById('totalFaculty').textContent = faculty.total;
        document.getElementById('professors').textContent = faculty.professors;
        document.getElementById('assistantProfessors').textContent = faculty.assistantProfessors;
        document.getElementById('facultyRatio').textContent = faculty.ratio;
        
        // Departments
        const departmentsList = document.getElementById('departmentsList');
        if (departmentsList) {
            departmentsList.innerHTML = faculty.departments.map(dept => `
                <div class="department-item">
                    <i class="fas fa-building"></i>
                    <span>${dept}</span>
                </div>
            `).join('');
        }
    }

    loadAdmissionInfo() {
        const admission = this.generateAdmissionData();
        
        document.getElementById('acceptedExams').textContent = admission.exams;
        document.getElementById('cutoffInfo').textContent = admission.cutoffs;
        document.getElementById('importantDates').textContent = admission.dates;
    }

    setupEventListeners() {
        // Website button
        const websiteBtn = document.getElementById('websiteBtn');
        if (websiteBtn) {
            websiteBtn.addEventListener('click', () => {
                if (this.college.website) {
                    window.open(this.college.website, '_blank');
                }
            });
        }

        // Save button
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveCollege());
        }

        // Compare button
        const compareBtn = document.getElementById('compareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.addToComparison());
        }
    }

    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all tabs and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding pane
                button.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');
            });
        });
    }

    // Helper methods to generate realistic data
    generateDescription() {
        const descriptions = {
            'IIT': `Indian Institute of Technology (IIT) is a premier autonomous public technical university in India. IITs are known for their excellence in engineering education, research, and innovation. The institute offers undergraduate, postgraduate, and doctoral programs in various engineering disciplines.`,
            'NIT': `National Institute of Technology (NIT) is a premier public engineering institution in India. NITs are known for their quality education, research facilities, and strong industry connections. The institute offers comprehensive engineering programs with excellent placement records.`,
            'IIIT': `Indian Institute of Information Technology (IIIT) is a specialized institution focusing on information technology and computer science education. Known for its cutting-edge curriculum and strong industry partnerships.`,
            'Private': `A leading private engineering institution known for its modern infrastructure, industry-oriented curriculum, and excellent placement record. The institute focuses on practical learning and skill development.`,
            'State': `A reputed state government engineering institution offering quality technical education with affordable fees. Known for its experienced faculty and strong alumni network.`
        };
        
        return descriptions[this.college.type] || 'A premier engineering institution committed to academic excellence and research innovation.';
    }

    getAccreditation() {
        const accreditations = {
            'IIT': 'AICTE Approved, NBA Accredited',
            'NIT': 'AICTE Approved, NBA Accredited, NAAC A+',
            'IIIT': 'AICTE Approved, NBA Accredited',
            'Private': 'AICTE Approved, NBA Accredited, NAAC A',
            'State': 'AICTE Approved, NBA Accredited, NAAC B+'
        };
        
        return accreditations[this.college.type] || 'AICTE Approved';
    }

    getContactInfo() {
        // Generate realistic contact info based on college name
        const phone = '+91-80-XXXX-XXXX';
        const email = 'info@' + this.college.name.toLowerCase().replace(/\s+/g, '') + '.edu';
        
        return `Phone: ${phone} | Email: ${email}`;
    }

    generateFeeData() {
        const baseFees = {
            'IIT': { tuition: 90000, hostel: 20000 },
            'NIT': { tuition: 60000, hostel: 15000 },
            'IIIT': { tuition: 120000, hostel: 25000 },
            'Private': { tuition: 200000, hostel: 30000 },
            'State': { tuition: 40000, hostel: 12000 }
        };
        
        const fees = baseFees[this.college.type] || baseFees['State'];
        
        return [
            {
                program: 'B.Tech Computer Science',
                tuition: fees.tuition * 1.2,
                hostel: fees.hostel,
                total: (fees.tuition * 1.2) + fees.hostel
            },
            {
                program: 'B.Tech Electronics',
                tuition: fees.tuition * 1.1,
                hostel: fees.hostel,
                total: (fees.tuition * 1.1) + fees.hostel
            },
            {
                program: 'B.Tech Mechanical',
                tuition: fees.tuition,
                hostel: fees.hostel,
                total: fees.tuition + fees.hostel
            },
            {
                program: 'B.Tech Civil',
                tuition: fees.tuition * 0.9,
                hostel: fees.hostel,
                total: (fees.tuition * 0.9) + fees.hostel
            }
        ];
    }

    generateFacilityData() {
        return {
            hostel: 'Separate hostels for boys and girls with modern amenities, Wi-Fi, and 24/7 security.',
            library: 'Central library with over 100,000 books, digital resources, and study spaces.',
            labs: 'State-of-the-art computer labs, electronics labs, and workshop facilities.',
            sports: 'Sports complex with cricket ground, football field, basketball courts, and indoor games.',
            mess: 'Hygienic mess facilities serving nutritious vegetarian and non-vegetarian food.',
            transport: 'College bus services connecting major parts of the city.',
            medical: 'On-campus medical center with qualified doctors and emergency services.'
        };
    }

    generateFacultyData() {
        return {
            total: '250+',
            professors: '50+',
            assistantProfessors: '120+',
            ratio: '15:1',
            departments: [
                'Computer Science & Engineering',
                'Electronics & Communication Engineering',
                'Mechanical Engineering',
                'Civil Engineering',
                'Electrical Engineering',
                'Applied Mathematics',
                'Physics',
                'Chemistry'
            ]
        };
    }

    generateAdmissionData() {
        const exams = {
            'IIT': 'JEE Advanced, JEE Main',
            'NIT': 'JEE Main',
            'IIIT': 'JEE Main, BITSAT',
            'Private': 'JEE Main, State CET, Management',
            'State': 'State CET, JEE Main'
        };
        
        return {
            exams: exams[this.college.type] || 'JEE Main',
            cutoffs: 'Previous year cutoffs available on official website. Varies by category and branch.',
            dates: 'Application: Jan-Mar | Exam: April | Result: May'
        };
    }

    getScholarshipInfo() {
        return 'Various scholarships available including merit-based, need-based, and government schemes. Students can apply for state and central government scholarships. Meritorious students eligible for tuition fee waivers.';
    }

    saveCollege() {
        let savedColleges = JSON.parse(localStorage.getItem('savedColleges') || '[]');
        
        if (!savedColleges.find(c => c.id === this.college.id)) {
            savedColleges.push(this.college);
            localStorage.setItem('savedColleges', JSON.stringify(savedColleges));
            authManager.showNotification(`${this.college.name} saved successfully!`, 'success');
        } else {
            authManager.showNotification('College already saved!', 'info');
        }
    }

    addToComparison() {
        let comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
        
        if (!comparisonList.find(c => c.id === this.college.id)) {
            if (comparisonList.length < 5) {
                comparisonList.push(this.college);
                localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
                authManager.showNotification(`${this.college.name} added to comparison!`, 'success');
            } else {
                authManager.showNotification('Maximum 5 colleges can be compared!', 'warning');
            }
        } else {
            authManager.showNotification('College already in comparison list!', 'info');
        }
    }
}

// Initialize college details manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CollegeDetailsManager();
});
