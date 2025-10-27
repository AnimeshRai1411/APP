#!/bin/bash
# Quick start script - just run ./start-easy.sh

cd /Users/animeshrai/Desktop/Cyberisk/cyberrisk-backend

# Start backend if not running
if ! curl -s http://localhost:8080/api/auth/health > /dev/null 2>&1; then
    echo "🚀 Starting backend..."
    java -jar target/cyberrisk-backend-1.0.0.jar > backend.log 2>&1 &
    echo $! > ../backend.pid
    sleep 5
    echo "✅ Backend started"
else
    echo "✅ Backend already running"
fi

# Start frontend if not running
cd ../frontend
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "🌐 Starting frontend..."
    python3 -m http.server 3000 > /dev/null 2>&1 &
    echo $! > ../frontend.pid
    echo "✅ Frontend started"
else
    echo "✅ Frontend already running"
fi

echo ""
echo "🎉 CyberRisk is ready!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080/api"
echo ""
echo "Press Ctrl+C to stop"
wait
