#!/bin/bash

echo "🛡️  CyberRisk - Demo Version"
echo "============================"
echo ""
echo "This is a fully functional demo version that works without any backend dependencies!"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🐍 Starting Python HTTP server..."
    echo "   Opening CyberRisk demo at: http://localhost:3000"
    echo ""
    echo "🔐 Demo Credentials:"
    echo "   Admin: admin / admin123"
    echo "   User:  user / user123"
    echo ""
    echo "🎮 Features Available:"
    echo "   ✅ Complete landing page with animations"
    echo "   ✅ Interactive demo with Company A scenario"
    echo "   ✅ Login/Register functionality"
    echo "   ✅ Dashboard with risk scoring"
    echo "   ✅ Live scan simulation"
    echo "   ✅ Scan history and statistics"
    echo "   ✅ Professional cybersecurity design"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Start Python server
    python3 -m http.server 3000
elif command -v python &> /dev/null; then
    echo "🐍 Starting Python HTTP server..."
    python -m SimpleHTTPServer 3000
else
    echo "❌ Python not found. Please install Python or open demo-frontend.html directly in your browser."
    echo ""
    echo "Alternatively, you can:"
    echo "1. Open demo-frontend.html directly in your browser"
    echo "2. Install Python: https://www.python.org/downloads/"
    echo "3. Use any web server to serve the file"
    exit 1
fi


