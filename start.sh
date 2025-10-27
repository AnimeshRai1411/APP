#!/bin/bash

# CyberRisk Full-Stack Application Startup Script
# This script helps you start both frontend and backend services

echo "🛡️  CyberRisk - The Credit Score for Cybersecurity"
echo "=================================================="
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB status..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running. Please start MongoDB first:"
    echo "   brew services start mongodb-community  # macOS"
    echo "   sudo systemctl start mongod            # Linux"
    echo "   net start MongoDB                      # Windows"
    echo ""
    read -p "Press Enter to continue anyway (backend will fail if MongoDB is not running)..."
else
    echo "✅ MongoDB is running"
fi

echo ""

# Function to start backend
start_backend() {
    echo "🚀 Starting Spring Boot Backend..."
    cd cyberrisk-backend
    
    # Check if Maven is installed
    if ! command -v mvn &> /dev/null; then
        echo "❌ Maven is not installed. Please install Maven first."
        exit 1
    fi
    
    # Install dependencies and start
    echo "📦 Installing backend dependencies..."
    mvn clean install -q
    
    echo "🔥 Starting backend server on http://localhost:8080/api"
    mvn spring-boot:run &
    BACKEND_PID=$!
    
    cd ..
    echo "✅ Backend started with PID: $BACKEND_PID"
    echo $BACKEND_PID > backend.pid
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting React Frontend..."
    cd cyberrisk-frontend
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo "📝 Creating .env file..."
        echo "REACT_APP_BACKEND_URL=http://localhost:8080/api" > .env
    fi
    
    # Install dependencies
    echo "📦 Installing frontend dependencies..."
    npm install --silent
    
    echo "🔥 Starting frontend server on http://localhost:3000"
    npm start &
    FRONTEND_PID=$!
    
    cd ..
    echo "✅ Frontend started with PID: $FRONTEND_PID"
    echo $FRONTEND_PID > frontend.pid
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping services..."
    
    if [ -f backend.pid ]; then
        BACKEND_PID=$(cat backend.pid)
        if ps -p $BACKEND_PID > /dev/null; then
            kill $BACKEND_PID
            echo "✅ Backend stopped"
        fi
        rm backend.pid
    fi
    
    if [ -f frontend.pid ]; then
        FRONTEND_PID=$(cat frontend.pid)
        if ps -p $FRONTEND_PID > /dev/null; then
            kill $FRONTEND_PID
            echo "✅ Frontend stopped"
        fi
        rm frontend.pid
    fi
}

# Function to show status
show_status() {
    echo "📊 Service Status:"
    echo ""
    
    if [ -f backend.pid ]; then
        BACKEND_PID=$(cat backend.pid)
        if ps -p $BACKEND_PID > /dev/null; then
            echo "✅ Backend: Running (PID: $BACKEND_PID) - http://localhost:8080/api"
        else
            echo "❌ Backend: Not running"
        fi
    else
        echo "❌ Backend: Not started"
    fi
    
    if [ -f frontend.pid ]; then
        FRONTEND_PID=$(cat frontend.pid)
        if ps -p $FRONTEND_PID > /dev/null; then
            echo "✅ Frontend: Running (PID: $FRONTEND_PID) - http://localhost:3000"
        else
            echo "❌ Frontend: Not running"
        fi
    else
        echo "❌ Frontend: Not started"
    fi
}

# Main menu
case "$1" in
    "start")
        start_backend
        sleep 5  # Wait for backend to start
        start_frontend
        echo ""
        echo "🎉 CyberRisk is now running!"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend:  http://localhost:8080/api"
        echo ""
        echo "Demo Credentials:"
        echo "   Admin: admin / admin123"
        echo "   User:  user / user123"
        echo ""
        echo "Press Ctrl+C to stop all services"
        wait
        ;;
    "stop")
        stop_services
        ;;
    "status")
        show_status
        ;;
    "restart")
        stop_services
        sleep 2
        start_backend
        sleep 5
        start_frontend
        echo ""
        echo "🔄 CyberRisk restarted!"
        ;;
    *)
        echo "Usage: $0 {start|stop|status|restart}"
        echo ""
        echo "Commands:"
        echo "  start   - Start both frontend and backend services"
        echo "  stop    - Stop all running services"
        echo "  status  - Show status of running services"
        echo "  restart - Restart all services"
        echo ""
        echo "Examples:"
        echo "  ./start.sh start    # Start the application"
        echo "  ./start.sh status   # Check if services are running"
        echo "  ./start.sh stop     # Stop all services"
        exit 1
        ;;
esac
