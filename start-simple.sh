#!/bin/bash

# CyberRisk Simplified Startup Script
# No MongoDB or Node.js required!

echo "🛡️  CyberRisk - Simplified Version"
echo "=================================="
echo ""

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ first."
    echo "   Download from: https://adoptium.net/"
    exit 1
fi

echo "✅ Java found: $(java -version 2>&1 | head -n 1)"
echo ""

# Start Backend
echo "🚀 Starting Spring Boot Backend..."
cd cyberrisk-backend

# Check if Maven is available
if command -v mvn &> /dev/null; then
    echo "📦 Using Maven to start backend..."
    mvn spring-boot:run &
    BACKEND_PID=$!
elif [ -f "target/cyberrisk-backend-1.0.0.jar" ]; then
    echo "📦 Using pre-built JAR file..."
    java -jar target/cyberrisk-backend-1.0.0.jar &
    BACKEND_PID=$!
else
    echo "📦 Building and starting with Maven..."
    mvn clean package -q
    java -jar target/cyberrisk-backend-1.0.0.jar &
    BACKEND_PID=$!
fi

cd ..
echo "✅ Backend started with PID: $BACKEND_PID"
echo $BACKEND_PID > backend.pid

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 10

# Check if backend is running
if ps -p $BACKEND_PID > /dev/null; then
    echo "✅ Backend is running on http://localhost:8080/api"
    echo "📊 H2 Database Console: http://localhost:8080/api/h2-console"
    echo ""
    echo "🎨 Starting Frontend Server..."
    
    # Start simple HTTP server for frontend
    cd frontend
    
    # Try different methods to serve the frontend
    if command -v python3 &> /dev/null; then
        echo "🐍 Using Python HTTP server..."
        python3 -m http.server 3000 &
        FRONTEND_PID=$!
    elif command -v python &> /dev/null; then
        echo "🐍 Using Python HTTP server..."
        python -m SimpleHTTPServer 3000 &
        FRONTEND_PID=$!
    elif command -v php &> /dev/null; then
        echo "🐘 Using PHP HTTP server..."
        php -S localhost:3000 &
        FRONTEND_PID=$!
    else
        echo "❌ No HTTP server found. Please install Python, PHP, or use a web server."
        echo "   You can also open frontend/index.html directly in your browser."
        exit 1
    fi
    
    cd ..
    echo "✅ Frontend started with PID: $FRONTEND_PID"
    echo $FRONTEND_PID > frontend.pid
    
    echo ""
    echo "🎉 CyberRisk is now running!"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:8080/api"
    echo "   H2 Console: http://localhost:8080/api/h2-console"
    echo ""
    echo "🔐 Demo Credentials:"
    echo "   Admin: admin / admin123"
    echo "   User:  user / user123"
    echo ""
    echo "Press Ctrl+C to stop all services"
    
    # Wait for user to stop
    wait
    
else
    echo "❌ Backend failed to start. Check the logs above."
    exit 1
fi
