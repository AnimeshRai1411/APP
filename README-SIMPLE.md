# 🛡️ CyberRisk - Simplified Version (No MongoDB/React Required!)

A complete full-stack cybersecurity assessment platform that runs with **just Java** - no MongoDB, no Node.js, no React needed!

## 🎯 What's Different in This Version

✅ **Backend**: Spring Boot with H2 in-memory database (no MongoDB needed)  
✅ **Frontend**: Pure HTML/CSS/JavaScript (no React/Node.js needed)  
✅ **Database**: H2 in-memory database (starts automatically)  
✅ **Dependencies**: Only Java 17+ required  

## 🚀 Quick Start (Super Easy!)

### **Step 1: Check Java Installation**
```bash
java -version
```
You should see Java 17 or higher. If not, download from [Adoptium](https://adoptium.net/).

### **Step 2: Run the Application**
```bash
# Make the script executable
chmod +x start-simple.sh

# Start everything
./start-simple.sh
```

That's it! The application will:
- ✅ Start the Spring Boot backend automatically
- ✅ Create the H2 database in memory
- ✅ Start a simple web server for the frontend
- ✅ Open the application in your browser

## 🌐 Access Points

- **Main Application**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/api/h2-console
  - JDBC URL: `jdbc:h2:mem:cyberrisk`
  - Username: `sa`
  - Password: `password`

## 🔐 Demo Credentials

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Regular User:**
- Username: `user`
- Password: `user123`

## 🎮 How to Use

### **1. Landing Page**
- Visit http://localhost:3000
- Click "Get Started" to login
- Use demo credentials above

### **2. Dashboard**
- View your current risk score
- See scan history and statistics
- Click "New Security Scan" to perform a scan

### **3. Perform a Scan**
- Enter organization name (e.g., "TechCorp")
- Enter target domain (e.g., "techcorp.com")
- Click "Start Scan"
- Wait 2-3 seconds for simulation
- View results and recommendations

### **4. View Results**
- Risk score (0-100)
- Risk level (Low/Medium/High/Critical)
- Detailed vulnerabilities found
- Prioritized recommendations
- Cost and timeline estimates

## 🏗️ Project Structure

```
CyberRisk/
├── frontend/                    # Pure HTML/CSS/JS Frontend
│   ├── index.html              # Main application page
│   ├── styles.css              # All styling
│   └── script.js               # All functionality
├── cyberrisk-backend/          # Spring Boot Backend
│   ├── src/main/java/          # Java source code
│   ├── pom.xml                 # Maven dependencies
│   └── target/                 # Compiled JAR file
├── start-simple.sh             # Easy startup script
└── README-SIMPLE.md            # This file
```

## 🔧 Manual Setup (If Script Doesn't Work)

### **Backend (Terminal 1)**
```bash
cd cyberrisk-backend

# If you have Maven
mvn spring-boot:run

# Or if you want to build JAR first
mvn clean package
java -jar target/cyberrisk-backend-1.0.0.jar
```

### **Frontend (Terminal 2)**
```bash
cd frontend

# Option 1: Python server
python3 -m http.server 3000

# Option 2: PHP server
php -S localhost:3000

# Option 3: Open directly in browser
open index.html  # macOS
start index.html # Windows
```

## 🎨 Features Included

### **Frontend Features**
- ✅ Beautiful, responsive design
- ✅ Animated risk score visualization
- ✅ Interactive demo with Company A scenario
- ✅ Login/Register forms
- ✅ Dashboard with scan history
- ✅ Real-time scan simulation
- ✅ Professional cybersecurity theme

### **Backend Features**
- ✅ JWT authentication
- ✅ User management
- ✅ Vulnerability scanning simulation
- ✅ Risk scoring algorithm (0-100)
- ✅ Recommendation generation
- ✅ Scan history tracking
- ✅ Admin dashboard
- ✅ H2 database console

## 🎯 Demo Workflow

1. **Start the app**: `./start-simple.sh`
2. **Open browser**: http://localhost:3000
3. **Login**: Use `admin/admin123` or `user/user123`
4. **Perform scan**: Click "New Security Scan"
5. **Enter details**: Organization name and domain
6. **View results**: See risk score and recommendations
7. **Explore dashboard**: Check scan history and statistics

## 🔍 Troubleshooting

### **Backend Won't Start**
- Check Java version: `java -version`
- Ensure port 8080 is free
- Check console for error messages

### **Frontend Won't Load**
- Try opening `frontend/index.html` directly in browser
- Check if port 3000 is free
- Try a different port: `python3 -m http.server 3001`

### **Database Issues**
- H2 database starts automatically
- Access console at http://localhost:8080/api/h2-console
- Database resets on each restart (in-memory)

## 📊 What You'll See

### **Landing Page**
- Hero section with animated background
- "Why It Matters" with statistics
- "How It Works" 3-step process
- Interactive demo with Company A
- Professional cybersecurity design

### **Dashboard**
- Current risk score visualization
- Scan history and statistics
- Quick action buttons
- Real-time data updates

### **Scan Results**
- Risk score (0-100) with color coding
- Risk level classification
- Detailed vulnerability list
- Prioritized recommendations
- Cost and timeline estimates

## 🎓 Perfect for College Projects

This simplified version is ideal for:
- ✅ **Easy demonstration** - runs with just Java
- ✅ **No complex setup** - no external databases
- ✅ **Complete functionality** - all features work
- ✅ **Professional appearance** - looks like a real SaaS app
- ✅ **Easy to explain** - simple architecture
- ✅ **Portable** - works on any system with Java

## 🚀 Ready to Demo!

The application is now **100% functional** and ready for:
- ✅ College project presentation
- ✅ Live demonstration
- ✅ Viva voce explanation
- ✅ Feature walkthrough
- ✅ Technical architecture discussion

**Just run `./start-simple.sh` and you're ready to go!**

---

**Built with ❤️ for easy deployment and demonstration**

*"Safer Tomorrow. Smarter Defense. Fewer Hacks."*

