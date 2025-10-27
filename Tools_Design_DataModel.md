# CyberRisk: Tools, Design & Data Model

## Page 3: Tools, Design & Data Model (≈ 1 page)

### 5. Technology Stack

**Backend:**
- Java 17 (JDK)
- Spring Boot 3.2.0
- Spring Security (JWT Authentication)
- Spring Data JPA
- H2 Database (In-Memory, with H2 Console)
- Maven 3.x (Dependency Management)
- Apache Commons Lang3
- Jackson (JSON Processing)
- JWT (jjwt 0.12.3)
- BCrypt Password Encoder

**Frontend:**
- React 18.2.0
- Node.js 16+
- TailwindCSS 3.3.0
- Framer Motion 10.16.4
- Lucide React (Icons)
- Axios 1.6.0 (HTTP Client)
- React Scripts 5.0.1
- PostCSS & Autoprefixer

**Development Tools:**
- IntelliJ IDEA (Java Development)
- VS Code / Cursor (React Development)
- Maven (Build Tool)
- npm (Package Manager)
- Git (Version Control)

**Database:**
- H2 Database (Embedded, In-Memory)
- JDBC Driver
- JPA/Hibernate ORM

---

### 6. System Architecture

CyberRisk follows a **three-tier architecture** pattern consisting of Presentation Layer (React Frontend), Application Layer (Spring Boot REST API), and Data Layer (H2 Database). The system implements JWT-based stateless authentication with role-based access control (RBAC) supporting USER and ADMIN roles. The frontend communicates with backend through RESTful APIs over HTTP/HTTPS, with CORS enabled for cross-origin requests. The backend uses Spring Security filter chain to handle authentication, authorization, and validation, while Spring Data JPA manages entity relationships and database operations through repositories.

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                            │
│                     (React Frontend - Port 3000)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS/REST API
                             │ JWT Authentication
┌────────────────────────────▼────────────────────────────────────┐
│                    Spring Boot Backend                          │
│                   (Application Layer)                           │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Controllers (REST API Endpoints)                         │ │
│  │  ├── AuthController       ├── ScanController             │ │
│  │  ├── AnalysisController   ├── ReportController           │ │
│  │  └── AdminController                                     │ │
│  └────────────┬─────────────────────────┬───────────────────┘ │
│               │                         │                     │
│  ┌────────────▼──────────┐    ┌────────▼─────────────┐      │
│  │   Business Logic      │    │   Security Layer      │      │
│  │   ├── ScanService     │    │   ├── JWT Filter      │      │
│  │   ├── AnalysisService │    │   ├── SecurityConfig  │      │
│  │   ├── UserService     │    │   └── JwtUtil         │      │
│  │   └── UserDetailsService   │                            │
│  └────────────┬──────────┘    └─────────────────────────┘      │
└───────────────┼───────────────────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────────┐
│                      Data Access Layer                        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  JPA Repositories                                       │ │
│  │  ├── UserRepository                                     │ │
│  │  └── ScanResultRepository                              │ │
│  └────────────┬───────────────────────────────────────────┘ │
└───────────────┼───────────────────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────────┐
│                  H2 Database (Port 8080/h2-console)            │
│  ┌──────────────────┐      ┌──────────────────────────────┐ │
│  │  users           │      │  scan_results                │ │
│  │  scan_vulnerabilities │ │  scan_recommendations        │ │
│  │  scan_metadata        │ │                              │ │
│  └──────────────────┘      └──────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

**Key Components:**
- **Frontend:** React SPA with client-side routing, authentication state management, and API service layer
- **Backend:** RESTful microservices with Spring Boot, handling authentication, scanning simulation, analysis, and reporting
- **Security:** JWT-based stateless authentication with refresh token mechanism
- **Database:** In-memory H2 database with automatic schema creation via Hibernate

---

### 7. Data Model / Key Tables / Inputs & Outputs

#### Database Tables

**Table: `users`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| username | VARCHAR | UNIQUE, NOT NULL | Login username |
| email | VARCHAR | UNIQUE, NOT NULL | User email address |
| password | VARCHAR | NOT NULL | BCrypt hashed password |
| first_name | VARCHAR | | User's first name |
| last_name | VARCHAR | | User's last name |
| organization | VARCHAR | | Organization name |
| role | ENUM | DEFAULT 'USER' | Role: USER, ADMIN |
| enabled | BOOLEAN | DEFAULT true | Account enabled status |
| created_at | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |
| last_login | TIMESTAMP | | Last login timestamp |

**Table: `scan_results`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique scan identifier |
| user_id | BIGINT | FOREIGN KEY → users.id | Owner of the scan |
| organization_name | VARCHAR | | Target organization |
| target_domain | VARCHAR | | Scanned domain (e.g., example.com) |
| target_ip | VARCHAR | | Resolved IP address |
| scan_date | TIMESTAMP | DEFAULT NOW() | When scan was performed |
| status | ENUM | DEFAULT 'PENDING' | PENDING, IN_PROGRESS, COMPLETED, FAILED |
| risk_score | INTEGER | RANGE 0-100 | Calculated risk score |
| risk_level | ENUM | | LOW, MEDIUM, HIGH, CRITICAL |
| scan_summary | TEXT | | Human-readable summary |

**Table: `scan_vulnerabilities` (Collection Table)**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| scan_id | BIGINT | FOREIGN KEY → scan_results.id | Parent scan |
| vulnerabilities_id | BIGINT | FOREIGN KEY | Vulnerability index |
| id | VARCHAR | | CVE ID or vulnerability identifier |
| title | VARCHAR | | Vulnerability title |
| description | TEXT | | Detailed description |
| severity | ENUM | | CRITICAL, HIGH, MEDIUM, LOW |
| category | VARCHAR | | Vulnerability category |
| cve_id | VARCHAR | | Common Vulnerabilities and Exposures ID |
| affected_system | VARCHAR | | Affected system/component |
| remediation | TEXT | | Fix recommendations |
| cvss_score | DOUBLE | | CVSS v3.0 score |
| is_exploitable | BOOLEAN | | Exploitability flag |

**Table: `scan_recommendations` (Collection Table)**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| scan_id | BIGINT | FOREIGN KEY → scan_results.id | Parent scan |
| recommendations_id | BIGINT | FOREIGN KEY | Recommendation index |
| id | VARCHAR | | Recommendation identifier |
| title | VARCHAR | | Recommendation title |
| description | TEXT | | Detailed recommendation |
| priority | ENUM | | HIGH, MEDIUM, LOW |
| estimated_time | VARCHAR | | Time to implement |
| estimated_cost | VARCHAR | | Cost estimate |
| impact | VARCHAR | | Expected impact description |

**Table: `scan_metadata` (Map Table)**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| scan_id | BIGINT | FOREIGN KEY → scan_results.id | Parent scan |
| metadata_key | VARCHAR | | Metadata key |
| metadata_value | VARCHAR | | Metadata value |

#### Data Relationships

```
users (1) ────< (M) scan_results
                │
                ├─> scan_vulnerabilities (1:M)
                ├─> scan_recommendations (1:M)
                └─> scan_metadata (1:M)
```

#### Inputs

**API Inputs:**
- **Auth Endpoints:**
  - `POST /api/auth/login`: `{username, password}` → JWT token
  - `POST /api/auth/register`: `{username, email, password, firstName, lastName, organization}` → User object

- **Scan Endpoints:**
  - `POST /api/scan/perform`: `{organizationName, targetDomain, targetIp}` → ScanResult
  
- **Analysis Endpoints:**
  - `GET /api/analyze/risk-analysis?userId={id}` → Risk analysis data
  - `GET /api/analyze/score-summary?userId={id}` → Score summary

#### Outputs

**API Outputs:**
- **Auth:** `{token, user: {id, username, email, role}}`
- **Scan:** `{scanId, status, riskScore, riskLevel, vulnerabilities[], recommendations[]}`
- **Analysis:** `{currentScore, trend, benchmarking, topRisks[]}`
- **Reports:** PDF/JSON report with scan history, trends, recommendations

---

## Page 4: 5 Step-by-Step Worked Procedure

### Step 1: Frontend Setup and First View

**1.1 Installing Dependencies**
```bash
# Navigate to frontend directory
cd /Users/animeshrai/Desktop/Cyberisk

# Install all npm dependencies
npm install

# Expected output: Installs React, TailwindCSS, Framer Motion, Axios, etc.
```

**1.2 Starting the React Development Server**
```bash
# Start the React application
npm start

# Expected output:
# Compiled successfully!
# Local: http://localhost:3000
# Network: http://192.168.x.x:3000
```

**Visual Output:** Browser opens showing the CyberRisk landing page with animated background, hero section with "The Credit Score for Cybersecurity" tagline, and navigation bar.

---

### Step 2: Backend Setup and Database Connection

**2.1 Starting the Spring Boot Backend**
```bash
# Navigate to backend directory
cd cyberrisk-backend

# Run Maven Spring Boot application
mvn spring-boot:run

# Expected output:
# ╔══════════════════════════════════════════════════════════════╗
# ║              🛡️  CyberRisk Backend  🛡️                        ║
# ║  🚀 Server running on: http://localhost:8080/api            ║
# ║  📊 H2 Database: http://localhost:8080/api/h2-console       ║
# ╚══════════════════════════════════════════════════════════════╝
```

**2.2 Verifying H2 Database Connection**
```bash
# Access H2 Console (via browser)
http://localhost:8080/api/h2-console

# Connection Settings:
JDBC URL: jdbc:h2:mem:cyberrisk
Username: sa
Password: password
```

**Visual Output:** H2 Console interface appears, showing connection status and available tables (users, scan_results, etc.).

---

### Step 3: User Registration and Login Flow

**3.1 Frontend Registration Process**

Navigate to: `http://localhost:3000`

1. Click "Get Started" button
2. Landing page → "Get Started" button → Authentication modal appears
3. Click "Switch to Register" link
4. Fill in registration form:
   - Username: `testuser`
   - Email: `testuser@example.com`
   - Password: `TestPass123!`
   - First Name: `Test`
   - Last Name: `User`
   - Organization: `TestCorp`

**Visual Output:** Registration form with cyber-themed styling, real-time validation feedback, and animated submission.

**3.2 Backend Processing (Automatic)**

The frontend sends POST request to `/api/auth/register`:
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "TestPass123!",
  "firstName": "Test",
  "lastName": "User",
  "organization": "TestCorp"
}
```

Backend creates user record in `users` table:
```sql
INSERT INTO users (username, email, password, first_name, last_name, organization, role, enabled, created_at)
VALUES ('testuser', 'testuser@example.com', '$2a$10$hashed_password', 'Test', 'User', 'TestCorp', 'USER', true, CURRENT_TIMESTAMP);
```

**Visual Output:** Success message "Registration successful!" followed by automatic redirect to dashboard.

---

### Step 4: Performing a Security Scan

**4.1 Dashboard Access**

After login, user lands on Dashboard showing:
- Welcome message with user's name
- Scan history (empty initially)
- "New Security Scan" button

**Visual Output:** Dashboard with gradient background, glass-morphism cards, and animated risk score visualization (if previous scans exist).

**4.2 Initiating a Scan**

Click "New Security Scan" button → Modal dialog opens:
- Organization Name: `TechStart Inc.`
- Target Domain: `techstart.com`

**Frontend JavaScript (automatically executed):**
```javascript
// File: src/services/scanService.js
const performScan = async (organizationName, targetDomain) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/scan/perform', 
    { organizationName, targetDomain }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
```

**Visual Output:** Progress indicator showing "Scanning... Please wait" with animated loader.

**4.3 Backend Scan Processing**

Backend receives POST request at `POST /api/scan/perform`

ScanService simulates vulnerability scanning:
```java
// Simulated scan process (2-3 seconds)
1. Create ScanResult object
2. Simulate vulnerability discovery
3. Calculate risk score (0-100)
4. Generate recommendations
5. Determine risk level (LOW/MEDIUM/HIGH/CRITICAL)
6. Save to database
```

SQL INSERT operations:
```sql
-- Create scan result
INSERT INTO scan_results (user_id, organization_name, target_domain, scan_date, status, risk_score, risk_level)
VALUES (1, 'TechStart Inc.', 'techstart.com', CURRENT_TIMESTAMP, 'COMPLETED', 72, 'HIGH');

-- Insert vulnerabilities
INSERT INTO scan_vulnerabilities VALUES (1, 'CVE-2023-1234', 'SQL Injection', ...);
INSERT INTO scan_vulnerabilities VALUES (1, 'CVE-2023-5678', 'XSS Vulnerability', ...);

-- Insert recommendations
INSERT INTO scan_recommendations VALUES (1, 'SEC-001', 'Enable HTTPS', ...);
INSERT INTO scan_recommendations VALUES (1, 'SEC-002', 'Patch OpenSSL', ...);
```

**Visual Output:** Dashboard updates showing:
- New scan result card with risk score (e.g., 72)
- Risk level indicator (HIGH - Red)
- List of vulnerabilities with severity icons
- Actionable recommendations with priority badges

---

### Step 5: Viewing Analytics and Reports

**5.1 Risk Score Visualization**

After multiple scans, Dashboard displays:
- Risk trend graph (line chart)
- Current vs. Historical scores
- Risk level distribution (pie chart)
- Top 5 vulnerabilities

**Visual Output:** Animated charts using Framer Motion with cyber-themed colors (cyan/green gradients).

**5.2 Generating Comprehensive Report**

User clicks "Generate Report" → Backend processes report request:

API Call: `GET /api/report/comprehensive?userId=1`

Response includes:
```json
{
  "userId": 1,
  "totalScans": 5,
  "averageRiskScore": 65,
  "riskTrend": "improving",
  "scans": [
    {
      "id": 1,
      "organizationName": "TechStart Inc.",
      "scanDate": "2024-01-15",
      "riskScore": 72,
      "riskLevel": "HIGH",
      "vulnerabilitiesCount": 12
    },
    // ... more scans
  ],
  "topRecommendations": [
    "Enable multi-factor authentication",
    "Update SSL/TLS certificates",
    "Implement WAF (Web Application Firewall)"
  ],
  "benchmarkComparison": {
    "industry": 58,
    "userScore": 65
  }
}
```

**Visual Output:** Modal dialog showing comprehensive report with:
- Summary statistics
- Historical scan data
- Risk trend arrow (up/down)
- Download button (PDF export)

**5.3 H2 Database Query Examples**

Access H2 Console: `http://localhost:8080/api/h2-console`

**Query 1: View all users**
```sql
SELECT id, username, email, role, created_at 
FROM users;
```

**Query 2: View user's scan results**
```sql
SELECT sr.id, sr.organization_name, sr.risk_score, sr.risk_level, sr.scan_date
FROM scan_results sr
WHERE sr.user_id = 1
ORDER BY sr.scan_date DESC;
```

**Query 3: Count vulnerabilities by severity**
```sql
SELECT 
    v.severity,
    COUNT(*) as count
FROM scan_vulnerabilities v
WHERE v.scan_id IN (SELECT id FROM scan_results WHERE user_id = 1)
GROUP BY v.severity;
```

**Query 4: Get high-priority recommendations**
```sql
SELECT r.title, r.description, r.priority
FROM scan_recommendations r
JOIN scan_results sr ON r.scan_id = sr.id
WHERE sr.user_id = 1 AND r.priority = 'HIGH';
```

**Visual Output:** H2 Console showing query results in tabular format with highlighted rows and column headers.

---

### Summary: Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  USER ACTION                                                        │
│  1. Open browser → http://localhost:3000                          │
│  2. Click "Get Started" → Login/Register modal                     │
│  3. Fill credentials → Submit form                                 │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  FRONTEND (React - Port 3000)                                       │
│  • Form validation                                                 │
│  • POST /api/auth/login                                            │
│  • Store JWT token in localStorage                                 │
│  • Redirect to Dashboard                                           │
└──────────────────┬──────────────────────────────────────────────────┘
                   │ HTTP POST with credentials
                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  BACKEND (Spring Boot - Port 8080/api)                             │
│  1. AuthController receives request                               │
│  2. UserService validates credentials                              │
│  3. JwtUtil generates JWT token                                    │
│  4. Returns: {token, user}                                         │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DATABASE (H2 - In-Memory)                                         │
│  • UserRepository.findById()                                       │
│  • BCrypt.matches() for password                                   │
│  • SELECT query on users table                                     │
└──────────────────┬──────────────────────────────────────────────────┘
                   │ Result
                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  RESPONSE FLOW                                                      │
│  H2 → Spring Boot → JWT Token → React → localStorage              │
│  User sees Dashboard with scan history                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Connectivity Setup Screenshots

**Backend Server Running:**
```
Terminal Output:
2024-01-15 10:30:15 - Started CyberRiskApplication in 2.456 seconds
🛡️  CyberRisk Backend  🛡️
🚀 Server running on: http://localhost:8080/api
📊 H2 Database: http://localhost:8080/api/h2-console
```

**Frontend Development Server:**
```
Terminal Output:
Compiled successfully!
webpack compiled with 0 warnings
Local:            http://localhost:3000
On Your Network:  http://192.168.1.100:3000
```

**Network Connection (Browser DevTools):**
```
Request URL: http://localhost:8080/api/auth/login
Request Method: POST
Status Code: 200 OK
Response Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**H2 Database Connection:**
```
JDBC URL: jdbc:h2:mem:cyberrisk
User Name: sa
Password: password
Status: [Connected]
```

---

This document provides comprehensive information about the technology stack, system architecture, data model, and step-by-step procedures for using the CyberRisk application.
