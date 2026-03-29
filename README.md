# College Admission Predictor

A full-stack web application that helps students predict college admissions based on their entrance exam scores and ranks.

## Features

- 🔍 **Comprehensive College Search**: Search any engineering college in India with advanced filters
- 🌐 **Official Website Links**: Direct access to official college websites
- 📊 **College Prediction**: Predict eligible colleges based on entrance exam scores and ranks
- 🏆 **Top Colleges Browser**: Explore 120+ top engineering colleges with NIRF rankings
- 🎯 **Smart Filtering**: Filter by state, college type (IIT, NIT, IIIT, Private, Government), and entrance exam
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 💾 **Save & Export**: Save favorite colleges and export search results
- 🔄 **Real-time Search**: Instant search results as you type
- 📈 **Detailed Information**: NIRF ranks, establishment year, entrance exams, and more

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- React.js for modern UI components
- Responsive design with CSS Grid and Flexbox
- Font Awesome for icons
- Vanilla JavaScript for interactivity

### Backend
- Java Spring Boot
- MySQL database
- RESTful API with JWT authentication
- CORS enabled for frontend communication

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Installation

1. Clone the repository
2. Install backend dependencies and initialize database:
   ```bash
   cd backend
   mvn clean install
   # Run database migrations
   mvn spring-boot:run
   ```

3. Start frontend development server:
   ```bash
   cd frontend
   python -m http.server 3000
   # Or use Node.js
   npx http-server -p 3000
   ```

The application will be available at `http://localhost:3000` and API at `http://localhost:8080`

## API Endpoints

### Colleges
- `GET /api/colleges` - Get all colleges (120+ comprehensive database)
- `GET /api/colleges/top75` - Get top 75 colleges
- `GET /api/colleges/{id}` - Get college by ID
- `GET /api/colleges/type/{type}` - Get colleges by type (IIT, NIT, IIIT, Private, State, Govt)
- `GET /api/colleges/search?q=keyword&state=state&type=type&exam=exam` - Advanced search with multiple filters

### Prediction
- `POST /api/colleges/predict` - Predict colleges based on criteria

### Search Parameters
- `q` - Search term (college name, location, or city)
- `state` - Filter by state (e.g., "Tamil Nadu", "Maharashtra")
- `type` - Filter by college type (IIT, NIT, IIIT, Private, State, Govt)
- `exam` - Filter by entrance exam (JEE Main, JEE Advanced, BITSAT, etc.)

### Example Search Queries
```
/api/colleges/search?q=IIT&state=Tamil Nadu
/api/colleges/search?type=Private&exam=JEE Main
/api/colleges/search?q=Chennai
/api/colleges/search?state=Karnataka&type=NIT
```
- `POST /api/auth/login` - User authentication
- `GET /api/auth/validate` - Token validation

## Database Schema

The application uses MySQL with the following main tables:
- `colleges` - College information
- `exams` - Supported entrance exams
- `cutoffs` - Historical cutoff data
- `branches` - Engineering branches available
- `users` - User authentication
- `user_sessions` - Session management

## Project Structure

```
SMS/
├── backend/
│   ├── src/main/java/
│   │   └── com/college/predictor/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── model/
│   │       ├── repository/
│   │       └── service/
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/
│   ├── pom.xml
│   └── mvnw, mvnw.cmd
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── predict.js
│   │   └── components/
│   └── assets/
│       └── images/
└── README.md
```

## Development

### Backend Development
- Use Spring Boot DevTools for hot reload
- H2 database for development
- MySQL for production
- JPA for database operations
- Spring Security for authentication

### Frontend Development
- Live reload with Browsersync
- SCSS for advanced styling
- ES6+ JavaScript
- Component-based architecture

## Deployment

### Backend
- Build JAR file: `mvn clean package`
- Deploy as executable JAR
- Docker support available

### Frontend
- Build optimized assets
- Deploy to any static server
- CDN integration ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
