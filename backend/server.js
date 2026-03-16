const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initializeAuthTables();
    }
});

// Initialize authentication tables
const initializeAuthTables = () => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'student',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active BOOLEAN DEFAULT 1
    )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully.');
            createDefaultUsers();
        }
    });

    // User sessions table
    db.run(`CREATE TABLE IF NOT EXISTS user_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`, (err) => {
        if (err) {
            console.error('Error creating user_sessions table:', err.message);
        } else {
            console.log('User sessions table created successfully.');
        }
    });
};

// Create default users
const createDefaultUsers = () => {
    const defaultUsers = [
        { email: 'student@demo.com', password: 'demo123', name: 'Student User', role: 'student' },
        { email: 'admin@demo.com', password: 'admin123', name: 'Admin User', role: 'admin' }
    ];

    defaultUsers.forEach(user => {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        db.run(
            'INSERT OR IGNORE INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
            [user.email, hashedPassword, user.name, user.role],
            (err) => {
                if (err) {
                    console.error('Error creating default user:', err.message);
                }
            }
        );
    });
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Helper function to run queries with promises
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Authentication Routes

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // Find user
        const users = await runQuery('SELECT * FROM users WHERE email = ? AND is_active = 1', [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Verify password
        const validPassword = bcrypt.compareSync(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                name: user.name, 
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Update last login
        await runQuery('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

        // Store session
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await runQuery(
            'INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
            [user.id, token, expiresAt.toISOString()]
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        
        // Deactivate session
        await runQuery('UPDATE user_sessions SET is_active = 0 WHERE token = ?', [token]);
        
        res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const users = await runQuery(
            'SELECT id, email, name, role, created_at, last_login FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(users[0]);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Register (optional - for creating new users)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name, role = 'student' } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name required' });
        }

        // Check if user already exists
        const existingUsers = await runQuery('SELECT id FROM users WHERE email = ?', [email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create user
        const result = await runQuery(
            'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, role]
        );

        res.json({
            success: true,
            message: 'User created successfully',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API Routes

// Get all colleges
app.get('/api/colleges', async (req, res) => {
    try {
        const query = `
            SELECT c.*, 
                   GROUP_CONCAT(DISTINCT b.name) as branches
            FROM colleges c
            LEFT JOIN cutoffs co ON c.id = co.college_id
            LEFT JOIN branches b ON co.branch_id = b.id
            GROUP BY c.id
            ORDER BY c.nirf_rank ASC
        `;
        const colleges = await runQuery(query);
        
        // Parse branches back to array
        const formattedColleges = colleges.map(college => ({
            ...college,
            branches: college.branches ? college.branches.split(',') : []
        }));
        
        res.json(formattedColleges);
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get top 75 colleges
app.get('/api/colleges/top75', async (req, res) => {
    try {
        const query = `
            SELECT c.*, 
                   e.name as exam_name,
                   e.short_name as exam_short_name
            FROM colleges c
            LEFT JOIN cutoffs co ON c.id = co.college_id
            LEFT JOIN exams e ON co.exam_id = e.id
            WHERE c.nirf_rank <= 75
            ORDER BY c.nirf_rank ASC
            LIMIT 75
        `;
        const colleges = await runQuery(query);
        res.json(colleges);
    } catch (error) {
        console.error('Error fetching top colleges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get supported exams
app.get('/api/exams', async (req, res) => {
    try {
        const exams = await runQuery('SELECT * FROM exams ORDER BY name');
        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get branches
app.get('/api/branches', async (req, res) => {
    try {
        const branches = await runQuery('SELECT * FROM branches ORDER BY name');
        res.json(branches);
    } catch (error) {
        console.error('Error fetching branches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Predict colleges based on exam details
app.post('/api/predict', async (req, res) => {
    try {
        const { examType, rank, category, preferredBranch, preferredLocation } = req.body;
        
        if (!examType || !rank || !category) {
            return res.status(400).json({ error: 'Missing required fields: examType, rank, category' });
        }
        
        // Build the base query
        let query = `
            SELECT DISTINCT c.*, 
                   co.branch_id,
                   co.rank as cutoff_rank,
                   b.name as branch_name,
                   e.name as exam_name,
                   e.short_name as exam_short_name,
                   co.year,
                   co.round
            FROM colleges c
            JOIN cutoffs co ON c.id = co.college_id
            JOIN branches b ON co.branch_id = b.id
            JOIN exams e ON co.exam_id = e.id
            WHERE e.short_name = ? 
            AND co.category = ?
            AND co.rank >= ?
            AND co.rank <= ?
            AND co.year = (SELECT MAX(year) FROM cutoffs WHERE exam_id = e.id)
        `;
        
        const params = [examType, category, Math.floor(rank * 0.8), Math.ceil(rank * 1.5)];
        
        // Add optional filters
        if (preferredBranch) {
            query += ` AND b.short_name = ?`;
            params.push(preferredBranch);
        }
        
        if (preferredLocation) {
            query += ` AND (c.state LIKE ? OR c.city LIKE ?)`;
            params.push(`%${preferredLocation}%`, `%${preferredLocation}%`);
        }
        
        query += ` ORDER BY co.rank ASC, c.nirf_rank ASC LIMIT 50`;
        
        const predictions = await runQuery(query, params);
        
        // Format the response
        const formattedPredictions = predictions.map(pred => ({
            id: pred.id,
            name: pred.name,
            location: pred.location,
            exam: pred.exam_short_name,
            branch: pred.branch_name,
            cutoffRank: pred.cutoff_rank,
            nirfRank: pred.nirf_rank,
            type: pred.type,
            year: pred.year,
            round: pred.round
        }));
        
        res.json(formattedPredictions);
        
    } catch (error) {
        console.error('Error predicting colleges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get college details by ID
app.get('/api/colleges/:id', async (req, res) => {
    try {
        const collegeId = req.params.id;
        
        const query = `
            SELECT c.*, 
                   GROUP_CONCAT(
                       DISTINCT b.name || '|' || co.rank || '|' || e.short_name || '|' || co.category
                   ) as cutoffs
            FROM colleges c
            LEFT JOIN cutoffs co ON c.id = co.college_id
            LEFT JOIN branches b ON co.branch_id = b.id
            LEFT JOIN exams e ON co.exam_id = e.id
            WHERE c.id = ?
            GROUP BY c.id
        `;
        
        const colleges = await runQuery(query, [collegeId]);
        
        if (colleges.length === 0) {
            return res.status(404).json({ error: 'College not found' });
        }
        
        const college = colleges[0];
        
        // Parse cutoffs
        let cutoffs = [];
        if (college.cutoffs) {
            cutoffs = college.cutoffs.split(',').map(cutoff => {
                const [branch, rank, exam, category] = cutoff.split('|');
                return { branch, rank: parseInt(rank), exam, category };
            });
        }
        
        const formattedCollege = {
            ...college,
            cutoffs,
            cutoffs: undefined // Remove the raw cutoffs string
        };
        
        res.json(formattedCollege);
        
    } catch (error) {
        console.error('Error fetching college details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search colleges
app.get('/api/colleges/search', async (req, res) => {
    try {
        const { q, exam, branch, location, state } = req.query;
        
        let query = `
            SELECT DISTINCT c.*, 
                   e.short_name as exam_short_name,
                   b.name as branch_name
            FROM colleges c
            LEFT JOIN cutoffs co ON c.id = co.college_id
            LEFT JOIN exams e ON co.exam_id = e.id
            LEFT JOIN branches b ON co.branch_id = b.id
            WHERE 1=1
        `;
        
        const params = [];
        
        if (q) {
            query += ` AND (c.name LIKE ? OR c.location LIKE ?)`;
            params.push(`%${q}%`, `%${q}%`);
        }
        
        if (exam) {
            query += ` AND e.short_name = ?`;
            params.push(exam);
        }
        
        if (branch) {
            query += ` AND b.short_name = ?`;
            params.push(branch);
        }
        
        if (location) {
            query += ` AND c.city LIKE ?`;
            params.push(`%${location}%`);
        }
        
        if (state) {
            query += ` AND c.state = ?`;
            params.push(state);
        }
        
        query += ` ORDER BY c.nirf_rank ASC LIMIT 50`;
        
        const colleges = await runQuery(query, params);
        res.json(colleges);
        
    } catch (error) {
        console.error('Error searching colleges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
    try {
        const stats = {};
        
        // Total colleges
        const totalColleges = await runQuery('SELECT COUNT(*) as count FROM colleges');
        stats.totalColleges = totalColleges[0].count;
        
        // Colleges by type
        const collegesByType = await runQuery(`
            SELECT type, COUNT(*) as count 
            FROM colleges 
            GROUP BY type
        `);
        stats.collegesByType = collegesByType;
        
        // Colleges by state
        const collegesByState = await runQuery(`
            SELECT state, COUNT(*) as count 
            FROM colleges 
            GROUP BY state 
            ORDER BY count DESC 
            LIMIT 10
        `);
        stats.collegesByState = collegesByState;
        
        res.json(stats);
        
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});
