# 🛡️ CyberRisk - The Credit Score for Cybersecurity

A comprehensive full-stack cybersecurity assessment platform that generates risk scores for organizations, similar to credit scores for security. Built with React frontend and Spring Boot backend.

## 🎯 Project Overview

CyberRisk is a modern SaaS application that helps organizations:
- **Assess** their cybersecurity posture with automated vulnerability scanning
- **Score** their risk level (0-100) using advanced algorithms
- **Recommend** actionable security improvements
- **Track** progress over time with detailed analytics

## 🏗️ Architecture

```
CyberRisk/
├── cyberrisk-frontend/          # React + TailwindCSS Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── services/          # API integration services
│   │   └── App.jsx            # Main application
│   └── package.json
├── cyberrisk-backend/           # Spring Boot Backend
│   ├── src/main/java/
│   │   ├── controller/        # REST API controllers
│   │   ├── service/          # Business logic
│   │   ├── repository/       # Data access layer
│   │   ├── model/           # Data models
│   │   ├── security/        # JWT authentication
│   │   └── dto/            # Data transfer objects
│   └── pom.xml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Java 17+** (for Spring Boot backend)
- **Node.js 16+** (for React frontend)
- **MongoDB** (for data storage)
- **Maven** (for backend dependencies)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CyberRisk
```

### 2. Backend Setup

```bash
cd cyberrisk-backend

# Install dependencies
mvn clean install

# Start MongoDB (make sure it's running on localhost:27017)
# On macOS with Homebrew:
brew services start mongodb-community

# Run the backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080/api`

### 3. Frontend Setup

```bash
cd cyberrisk-frontend

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_BACKEND_URL=http://localhost:8080/api" > .env

# Start the frontend
npm start
```

The frontend will start on `http://localhost:3000`

## 🔐 Authentication

### Demo Credentials

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Regular User:**
- Username: `user`
- Password: `user123`

### Registration

New users can register through the frontend. The system supports:
- Username and email validation
- Password strength requirements
- Organization association
- Role-based access control

## 🎯 Core Features

### 1. Vulnerability Scanning
- **Simulated scanning** for demo purposes
- **Real-time progress** tracking
- **Comprehensive reports** with detailed findings
- **Risk scoring** based on vulnerability severity

### 2. Risk Analysis
- **0-100 risk score** calculation
- **Risk level classification** (Low, Medium, High, Critical)
- **Trend analysis** over time
- **Comparative benchmarking**

### 3. Recommendations
- **Prioritized action items** based on risk level
- **Implementation guidance** with step-by-step instructions
- **Cost and time estimates** for each recommendation
- **Expected impact** assessment

### 4. Reporting & Analytics
- **Historical scan data** visualization
- **Risk trend analysis**
- **Comprehensive reports** for stakeholders
- **Export capabilities**

### 5. Admin Dashboard
- **System statistics** overview
- **User management** capabilities
- **Scan analytics** across all users
- **System health monitoring**

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/health` - Health check

### Scanning
- `POST /api/scan/perform` - Perform vulnerability scan
- `GET /api/scan/{scanId}` - Get scan result
- `GET /api/scan/history` - Get user's scan history

### Analysis
- `GET /api/analyze/risk-analysis` - Get risk analysis
- `GET /api/analyze/score-summary` - Get score summary

### Reports
- `GET /api/report/{userId}` - Get user reports
- `GET /api/report/my-reports` - Get current user's reports
- `GET /api/report/comprehensive` - Generate comprehensive report

### Admin
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/health` - System health check

## 🎨 Frontend Components

### Core Components
- **Hero** - Landing page hero section
- **Dashboard** - User dashboard with scan history
- **LoginForm/RegisterForm** - Authentication forms
- **RiskScore** - Animated risk score visualization
- **Card** - Reusable card component with glass effect

### Services
- **authService** - Authentication management
- **scanService** - Scan operations and data processing
- **api** - Axios configuration and API calls

## 🗄️ Database Schema

### Users Collection
```javascript
{
  id: String,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  organization: String,
  role: Enum [USER, ADMIN],
  enabled: Boolean,
  createdAt: DateTime,
  lastLogin: DateTime
}
```

### Scan Results Collection
```javascript
{
  id: String,
  userId: ObjectId,
  organizationName: String,
  targetDomain: String,
  targetIp: String,
  scanDate: DateTime,
  status: Enum [PENDING, IN_PROGRESS, COMPLETED, FAILED],
  riskScore: Number (0-100),
  riskLevel: Enum [LOW, MEDIUM, HIGH, CRITICAL],
  vulnerabilities: Array,
  recommendations: Array,
  scanSummary: String
}
```

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password hashing** using BCrypt
- **Role-based access control** (USER/ADMIN)
- **CORS configuration** for cross-origin requests
- **Input validation** on all endpoints
- **SQL injection protection** through MongoDB
- **XSS protection** through React's built-in sanitization

## 🧪 Testing the Application

### 1. User Registration & Login
1. Navigate to `http://localhost:3000`
2. Click "Get Started" to access login form
3. Use demo credentials or register a new account
4. Verify successful authentication

### 2. Perform Security Scan
1. Login to the dashboard
2. Click "New Security Scan"
3. Enter organization name and target domain
4. Wait for scan completion (simulated 2-3 seconds)
5. Review the generated risk score and recommendations

### 3. View Analytics
1. Perform multiple scans with different organizations
2. View risk trend analysis in the dashboard
3. Check scan history and statistics
4. Generate comprehensive reports

### 4. Admin Functions
1. Login with admin credentials
2. Access admin dashboard (if implemented)
3. View system statistics and user management

## 🚀 Deployment

### Backend Deployment
```bash
# Build JAR file
mvn clean package

# Run with production profile
java -jar target/cyberrisk-backend-1.0.0.jar --spring.profiles.active=prod
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Serve with nginx or deploy to static hosting
# Update REACT_APP_BACKEND_URL to production API URL
```

## 🛠️ Development

### Backend Development
- **Framework**: Spring Boot 3.2.0
- **Database**: MongoDB
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Java Version**: 17+

### Frontend Development
- **Framework**: React 18
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📊 Performance Considerations

- **Database indexing** on frequently queried fields
- **JWT token expiration** (24 hours)
- **API response caching** for static data
- **Frontend code splitting** for faster loading
- **Image optimization** and lazy loading

## 🔮 Future Enhancements

- **Real vulnerability scanning** integration
- **Advanced threat intelligence** feeds
- **Machine learning** for risk prediction
- **Multi-tenant architecture** support
- **API rate limiting** and monitoring
- **Automated report generation** and email delivery
- **Integration with security tools** (Nessus, OpenVAS, etc.)


## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for cybersecurity professionals**

*"Safer Tomorrow. Smarter Defense. Fewer Hacks."*
