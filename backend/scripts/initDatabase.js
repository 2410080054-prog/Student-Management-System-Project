const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create tables
const createTables = () => {
    // Colleges table
    db.run(`CREATE TABLE IF NOT EXISTS colleges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT NOT NULL,
        nirf_rank INTEGER,
        type TEXT CHECK(type IN ('IIT', 'NIT', 'IIIT', 'GFTI', 'Private', 'State')) DEFAULT 'GFTI',
        established_year INTEGER,
        website TEXT,
        description TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating colleges table:', err.message);
        } else {
            console.log('Colleges table created successfully.');
        }
    });

    // Exams table
    db.run(`CREATE TABLE IF NOT EXISTS exams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        short_name TEXT NOT NULL,
        description TEXT,
        max_marks INTEGER,
        duration_hours INTEGER
    )`, (err) => {
        if (err) {
            console.error('Error creating exams table:', err.message);
        } else {
            console.log('Exams table created successfully.');
        }
    });

    // Branches table
    db.run(`CREATE TABLE IF NOT EXISTS branches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        short_name TEXT NOT NULL,
        description TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating branches table:', err.message);
        } else {
            console.log('Branches table created successfully.');
        }
    });

    // Cutoffs table
    db.run(`CREATE TABLE IF NOT EXISTS cutoffs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        college_id INTEGER NOT NULL,
        exam_id INTEGER NOT NULL,
        branch_id INTEGER NOT NULL,
        category TEXT NOT NULL,
        rank INTEGER NOT NULL,
        year INTEGER NOT NULL,
        round INTEGER DEFAULT 1,
        FOREIGN KEY (college_id) REFERENCES colleges (id),
        FOREIGN KEY (exam_id) REFERENCES exams (id),
        FOREIGN KEY (branch_id) REFERENCES branches (id)
    )`, (err) => {
        if (err) {
            console.error('Error creating cutoffs table:', err.message);
        } else {
            console.log('Cutoffs table created successfully.');
        }
    });

    // Categories table
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating categories table:', err.message);
        } else {
            console.log('Categories table created successfully.');
        }
    });
};

// Insert initial data
const insertInitialData = () => {
    // Insert exams
    const exams = [
        { name: 'Joint Entrance Examination Main', short_name: 'JEE Main', description: 'National level engineering entrance exam', max_marks: 300, duration_hours: 3 },
        { name: 'Joint Entrance Examination Advanced', short_name: 'JEE Advanced', description: 'For admission to IITs', max_marks: 360, duration_hours: 3 },
        { name: 'Engineering Agricultural and Medical Common Entrance Test', short_name: 'EAMCET', description: 'Andhra Pradesh/Telangana state entrance exam', max_marks: 160, duration_hours: 3 },
        { name: 'Birla Institute of Technology and Science Admission Test', short_name: 'BITSAT', description: 'For admission to BITS campuses', max_marks: 450, duration_hours: 3 },
        { name: 'Maharashtra Common Entrance Test', short_name: 'MHCET', description: 'Maharashtra state entrance exam', max_marks: 200, duration_hours: 3 },
        { name: 'Karnataka Common Entrance Test', short_name: 'KCET', description: 'Karnataka state entrance exam', max_marks: 180, duration_hours: 3 },
        { name: 'West Bengal Joint Entrance Examination', short_name: 'WBJEE', description: 'West Bengal state entrance exam', max_marks: 200, duration_hours: 3 }
    ];

    const examStmt = db.prepare('INSERT OR IGNORE INTO exams (name, short_name, description, max_marks, duration_hours) VALUES (?, ?, ?, ?, ?)');
    exams.forEach(exam => {
        examStmt.run([exam.name, exam.short_name, exam.description, exam.max_marks, exam.duration_hours]);
    });
    examStmt.finalize();

    // Insert branches
    const branches = [
        { name: 'Computer Science Engineering', short_name: 'CSE', description: 'Computer Science and Engineering' },
        { name: 'Electronics and Communication Engineering', short_name: 'ECE', description: 'Electronics and Communication Engineering' },
        { name: 'Mechanical Engineering', short_name: 'ME', description: 'Mechanical Engineering' },
        { name: 'Civil Engineering', short_name: 'CE', description: 'Civil Engineering' },
        { name: 'Electrical Engineering', short_name: 'EE', description: 'Electrical Engineering' },
        { name: 'Chemical Engineering', short_name: 'CHE', description: 'Chemical Engineering' },
        { name: 'Information Technology', short_name: 'IT', description: 'Information Technology' },
        { name: 'Artificial Intelligence', short_name: 'AI', description: 'Artificial Intelligence and Machine Learning' },
        { name: 'Data Science', short_name: 'DS', description: 'Data Science and Engineering' },
        { name: 'Biotechnology', short_name: 'BT', description: 'Biotechnology Engineering' }
    ];

    const branchStmt = db.prepare('INSERT OR IGNORE INTO branches (name, short_name, description) VALUES (?, ?, ?)');
    branches.forEach(branch => {
        branchStmt.run([branch.name, branch.short_name, branch.description]);
    });
    branchStmt.finalize();

    // Insert categories
    const categories = [
        { name: 'General', description: 'General category' },
        { name: 'OBC-NCL', description: 'Other Backward Classes - Non Creamy Layer' },
        { name: 'SC', description: 'Scheduled Castes' },
        { name: 'ST', description: 'Scheduled Tribes' },
        { name: 'EWS', description: 'Economically Weaker Sections' },
        { name: 'General-PWD', description: 'General - Persons with Disabilities' },
        { name: 'OBC-NCL-PWD', description: 'OBC-NCL - Persons with Disabilities' },
        { name: 'SC-PWD', description: 'SC - Persons with Disabilities' },
        { name: 'ST-PWD', description: 'ST - Persons with Disabilities' }
    ];

    const categoryStmt = db.prepare('INSERT OR IGNORE INTO categories (name, description) VALUES (?, ?)');
    categories.forEach(category => {
        categoryStmt.run([category.name, category.description]);
    });
    categoryStmt.finalize();

    // Insert top 75 colleges
    const colleges = [
        { name: 'Indian Institute of Technology Madras', location: 'Chennai, Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', nirf_rank: 1, type: 'IIT', established_year: 1959 },
        { name: 'Indian Institute of Technology Delhi', location: 'New Delhi, Delhi', state: 'Delhi', city: 'New Delhi', nirf_rank: 2, type: 'IIT', established_year: 1961 },
        { name: 'Indian Institute of Technology Bombay', location: 'Mumbai, Maharashtra', state: 'Maharashtra', city: 'Mumbai', nirf_rank: 3, type: 'IIT', established_year: 1958 },
        { name: 'Indian Institute of Technology Kanpur', location: 'Kanpur, Uttar Pradesh', state: 'Uttar Pradesh', city: 'Kanpur', nirf_rank: 4, type: 'IIT', established_year: 1959 },
        { name: 'Indian Institute of Technology Roorkee', location: 'Roorkee, Uttarakhand', state: 'Uttarakhand', city: 'Roorkee', nirf_rank: 5, type: 'IIT', established_year: 1847 },
        { name: 'Indian Institute of Technology Kharagpur', location: 'Kharagpur, West Bengal', state: 'West Bengal', city: 'Kharagpur', nirf_rank: 6, type: 'IIT', established_year: 1951 },
        { name: 'Indian Institute of Technology Guwahati', location: 'Guwahati, Assam', state: 'Assam', city: 'Guwahati', nirf_rank: 7, type: 'IIT', established_year: 1994 },
        { name: 'Indian Institute of Technology Hyderabad', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 8, type: 'IIT', established_year: 2008 },
        { name: 'National Institute of Technology Tiruchirappalli', location: 'Trichy, Tamil Nadu', state: 'Tamil Nadu', city: 'Tiruchirappalli', nirf_rank: 9, type: 'NIT', established_year: 1964 },
        { name: 'National Institute of Technology Rourkela', location: 'Rourkela, Odisha', state: 'Odisha', city: 'Rourkela', nirf_rank: 10, type: 'NIT', established_year: 1961 }
    ];

    const collegeStmt = db.prepare('INSERT OR IGNORE INTO colleges (name, location, state, city, nirf_rank, type, established_year) VALUES (?, ?, ?, ?, ?, ?, ?)');
    colleges.forEach(college => {
        collegeStmt.run([college.name, college.location, college.state, college.city, college.nirf_rank, college.type, college.established_year]);
    });
    collegeStmt.finalize();

    console.log('Initial data inserted successfully.');
};

// Initialize database
const initDatabase = () => {
    createTables();
    
    setTimeout(() => {
        insertInitialData();
        console.log('Database initialization completed.');
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    }, 1000);
};

// Run initialization
initDatabase();
