# College Admission Predictor - Setup Guide

## 🚀 Project Overview

A full-stack web application built with:
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Java Spring Boot
- **Database**: MySQL
- **Features**: College prediction, authentication, top colleges browsing

## 📋 Prerequisites

### Required Software
- **Java 17+** - For Spring Boot backend
- **Maven 3.6+** - For building Java projects
- **MySQL 8.0+** - Database server
- **Python 3.x** - For frontend development server (alternative: Node.js)

### Optional (for development)
- **Node.js 16+** - Alternative frontend server
- **MySQL Workbench** - Database management
- **Postman** - API testing

## 🗄️ Database Setup

### 1. Install MySQL
```bash
# Windows: Download from mysql.com
# macOS: brew install mysql
# Linux: sudo apt-get install mysql-server
```

### 2. Create Database
```sql
CREATE DATABASE college_predictor;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON college_predictor.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Update Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/college_predictor
spring.datasource.username=root
spring.datasource.password=your_password
```

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Build and Run
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### 3. Verify Backend
- API will be available at: `http://localhost:8080/api`
- Test endpoint: `http://localhost:8080/api/colleges/top75`

## 🌐 Frontend Setup

### Option 1: Python Server (Recommended)
```bash
cd frontend
python -m http.server 3000
```

### Option 2: Node.js Server
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Serve Package
```bash
cd frontend
npm install -g serve
npm run serve
```

## 🚀 Running the Application

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend will start on `http://localhost:8080`

### 2. Start Frontend
```bash
cd frontend
python -m http.server 3000
```
Frontend will start on `http://localhost:3000`

### 3. Access Application
Open browser and navigate to: `http://localhost:3000`

## 🧪 Testing the Application

### Demo Accounts
- **Student**: `student@demo.com` / `demo123`
- **Admin**: `admin@demo.com` / `admin123`

### Test Features
1. **Login** with demo accounts
2. **Prediction** - Fill exam details and get college predictions
3. **Browse Colleges** - View top 75 engineering colleges
4. **Results** - Export, save, and share predictions

## 📊 API Endpoints

### Colleges
- `GET /api/colleges` - Get all colleges
- `GET /api/colleges/top75` - Get top 75 colleges
- `GET /api/colleges/{id}` - Get college by ID
- `GET /api/colleges/type/{type}` - Get colleges by type
- `GET /api/colleges/search?q=keyword` - Search colleges

### Prediction
- `POST /api/colleges/predict` - Predict colleges based on criteria

### Request Body for Prediction
```json
{
  "examType": "jee_main",
  "rank": 50000,
  "category": "general",
  "branch": "computer_science",
  "location": "andhra_pradesh"
}
```

## 🔧 Development

### Backend Development
```bash
# Hot reload with Spring Boot DevTools
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=true"

# Run tests
mvn test

# Build JAR for deployment
mvn clean package
```

### Frontend Development
```bash
# Live reload with Python
python -m http.server 3000

# Or with Node.js
npm run dev
```

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues
1. **Port 8080 in use**: Change port in `application.properties`
2. **Database connection failed**: Check MySQL service and credentials
3. **Build failures**: Run `mvn clean` then `mvn install`

#### Frontend Issues
1. **Port 3000 in use**: Use different port `python -m http.server 3001`
2. **CORS errors**: Ensure backend CORS is configured correctly
3. **API not reachable**: Check backend is running on correct port

#### Database Issues
1. **Connection refused**: Start MySQL service
2. **Access denied**: Check database credentials
3. **Table not found**: Run `mvn spring-boot:run` to auto-create tables

### Debug Commands
```bash
# Check backend logs
mvn spring-boot:run --debug

# Test API with curl
curl http://localhost:8080/api/colleges/top75

# Check database connection
mysql -u root -p college_predictor
```

## 📦 Deployment

### Backend Deployment
```bash
# Build executable JAR
mvn clean package

# Run JAR file
java -jar target/predictor-1.0.0.jar
```

### Frontend Deployment
- Upload `frontend/` folder to any web server
- Ensure API endpoint is updated to production URL

### Docker Deployment (Optional)
```bash
# Build Docker image
docker build -t college-predictor .

# Run container
docker run -p 8080:8080 college-predictor
```

## 🔄 Project Structure

```
SMS/
├── backend/
│   ├── src/main/java/com/college/predictor/
│   │   ├── PredictorApplication.java     # Main application
│   │   ├── config/                       # Security & configuration
│   │   ├── controller/                   # REST controllers
│   │   ├── model/                        # Entity classes
│   │   ├── repository/                   # JPA repositories
│   │   └── service/                      # Business logic
│   ├── src/main/resources/
│   │   ├── application.properties        # Configuration
│   │   └── data.sql                     # Sample data
│   └── pom.xml                          # Maven configuration
├── frontend/
│   ├── index.html                       # Main HTML file
│   ├── css/styles.css                   # Styles
│   ├── js/                             # JavaScript modules
│   └── package.json                    # Frontend config
└── README.md                          # This file
```

## 🎯 Next Steps

1. **Customize** the prediction algorithm
2. **Add more colleges** to the database
3. **Implement user authentication** with JWT
4. **Add college comparison** feature
5. **Deploy** to production environment

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Test with the provided demo accounts
4. Check browser console for JavaScript errors

---

**🎓 Happy College Hunting!**
