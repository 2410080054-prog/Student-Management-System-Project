# College Admission Predictor

A full-stack web application that helps students predict college admissions based on their entrance exam scores and ranks.

## Features

- Enter exam scores/ranks for various entrance exams (EAMCET, JEE Main, JEE Advanced, BITSAT, etc.)
- Predict expected colleges based on rank and exam type
- View curated list of Top 75 engineering colleges in India
- Filter colleges by exam type, rank, location, and branch
- Real-time admission predictions based on historical cutoff data

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with CSS Grid and Flexbox
- Font Awesome for icons
- Vanilla JavaScript for interactivity

### Backend
- Node.js with Express
- SQLite database
- CORS enabled for frontend communication

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies and initialize database:
   ```bash
   cd backend
   npm install
   npm run init-db
   node scripts/populateData.js
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

4. Start the frontend development server:
   ```bash
   cd frontend
   python -m http.server 3000
   ```

The application will be available at `http://localhost:3000` and the API at `http://localhost:5000`

## API Endpoints

- `GET /api/colleges` - Get all colleges
- `GET /api/colleges/top75` - Get top 75 colleges
- `POST /api/predict` - Predict colleges based on exam details
- `GET /api/exams` - Get supported exam types

## Database Schema

The application uses SQLite with the following main tables:
- `colleges` - College information
- `exams` - Supported entrance exams
- `cutoffs` - Historical cutoff data
- `branches` - Engineering branches available
