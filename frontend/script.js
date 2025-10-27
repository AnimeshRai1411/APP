// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Global State
let currentUser = null;
let scanHistory = [];

// Utility Functions
function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.classList.remove('show'));
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// API Functions
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        
        return { success: true, data };
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: error.message };
    }
}

// Authentication Functions
async function login(username, password) {
    const result = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

    if (result.success) {
        const { token, ...userData } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        currentUser = userData;
        showDashboard();
        closeModal();
    } else {
        alert('Login failed: ' + result.error);
    }
}

async function register(userData) {
    const result = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });

    if (result.success) {
        const { token, ...user } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        currentUser = user;
        showDashboard();
        closeModal();
    } else {
        alert('Registration failed: ' + result.error);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    scanHistory = [];
    hideElement('dashboard');
    showElement('hero');
    showElement('why-matters');
    showElement('how-works');
    showElement('demo');
}

// UI Functions
function showLogin() {
    closeModal();
    showModal('loginModal');
}

function showRegister() {
    closeModal();
    showModal('registerModal');
}

function showDashboard() {
    hideElement('hero');
    hideElement('why-matters');
    hideElement('how-works');
    hideElement('demo');
    showElement('dashboard');
    
    if (currentUser) {
        document.getElementById('userName').textContent = `Welcome, ${currentUser.firstName}!`;
        document.getElementById('userFirstName').textContent = currentUser.firstName;
    }
    
    loadDashboardData();
}

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    login(username, password);
}

function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        organization: formData.get('organization')
    };
    
    register(userData);
}

// Scan Functions
async function performScan() {
    showModal('scanModal');
}

async function handleScan(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const scanData = {
        organizationName: formData.get('organizationName'),
        targetDomain: formData.get('targetDomain')
    };
    
    const scanBtn = document.getElementById('scanBtn');
    const originalText = scanBtn.textContent;
    scanBtn.innerHTML = '<div class="loading"></div> Scanning...';
    scanBtn.disabled = true;
    
    try {
        const result = await apiRequest('/scan/perform', {
            method: 'POST',
            body: JSON.stringify(scanData)
        });
        
        if (result.success) {
            closeModal();
            alert('Scan completed successfully! Check your dashboard for results.');
            loadDashboardData();
        } else {
            alert('Scan failed: ' + result.error);
        }
    } catch (error) {
        alert('Scan failed: ' + error.message);
    } finally {
        scanBtn.textContent = originalText;
        scanBtn.disabled = false;
    }
}

// Dashboard Functions
async function loadDashboardData() {
    try {
        // Load scan history
        const historyResult = await apiRequest('/scan/history');
        if (historyResult.success) {
            scanHistory = historyResult.data;
            updateDashboard();
        }
        
        // Load risk analysis
        const analysisResult = await apiRequest('/analyze/score-summary');
        if (analysisResult.success) {
            updateRiskScore(analysisResult.data);
        }
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    }
}

function updateDashboard() {
    // Update scan history
    const scanHistoryElement = document.getElementById('scanHistory');
    if (scanHistory.length === 0) {
        scanHistoryElement.innerHTML = `
            <div class="no-scans">
                <i class="fas fa-chart-line"></i>
                <p>No scan history available</p>
                <button class="btn btn-outline" onclick="performScan()">Perform Your First Scan</button>
            </div>
        `;
    } else {
        scanHistoryElement.innerHTML = scanHistory.slice(0, 5).map(scan => `
            <div class="scan-item">
                <div class="scan-info">
                    <div class="scan-score">${scan.riskScore}</div>
                    <div class="scan-details">
                        <h4>${scan.organizationName}</h4>
                        <p>${new Date(scan.scanDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="scan-meta">
                    <div class="risk-level">${scan.riskLevel}</div>
                    <div class="scan-date">${scan.targetDomain}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Update statistics
    if (scanHistory.length > 0) {
        const scores = scanHistory.map(scan => scan.riskScore);
        const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
        const highestScore = Math.max(...scores);
        const lowestScore = Math.min(...scores);
        
        document.getElementById('totalScans').textContent = scanHistory.length;
        document.getElementById('avgScore').textContent = averageScore;
        document.getElementById('highestScore').textContent = highestScore;
        document.getElementById('lowestScore').textContent = lowestScore;
    }
}

function updateRiskScore(data) {
    if (data.latestScore !== undefined) {
        document.getElementById('currentScore').textContent = data.latestScore;
        document.getElementById('riskLevel').textContent = data.riskLevel;
        document.getElementById('lastScanDate').textContent = new Date(data.scanDate).toLocaleDateString();
        
        // Update score circle color based on risk level
        const scoreCircle = document.querySelector('.score-circle-large');
        if (scoreCircle) {
            const score = data.latestScore;
            let color = '#10B981'; // Green for low risk
            if (score >= 80) color = '#DC2626'; // Red for critical
            else if (score >= 60) color = '#EF4444'; // Red for high
            else if (score >= 40) color = '#F59E0B'; // Yellow for medium
            
            scoreCircle.style.background = `conic-gradient(from 0deg, ${color} 0deg ${score * 3.6}deg, var(--cyber-blue) ${score * 3.6}deg 360deg)`;
        }
    }
}

// Demo Functions
function showRecommendation(index) {
    // Hide all recommendations
    const recommendations = document.querySelectorAll('.recommendation');
    recommendations.forEach(rec => rec.classList.remove('active'));
    
    // Show selected recommendation
    const selectedRec = document.getElementById(`rec-${index}`);
    if (selectedRec) {
        selectedRec.classList.add('active');
    }
    
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabBtns[index].classList.add('active');
}

// Initialize App
function initApp() {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        try {
            currentUser = JSON.parse(user);
            showDashboard();
        } catch (error) {
            console.error('Failed to parse user data:', error);
            logout();
        }
    }
    
    // Add event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('scanForm').addEventListener('submit', handleScan);
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Demo data for recommendations
const recommendations = [
    {
        title: "Implement Multi-Factor Authentication",
        description: "Add MFA to all critical systems and user accounts to prevent unauthorized access.",
        impact: "High",
        effort: "Medium",
        cost: "$5,000 - $15,000",
        timeline: "2-4 weeks"
    },
    {
        title: "Patch Critical Vulnerabilities",
        description: "Update all systems with the latest security patches, focusing on critical vulnerabilities.",
        impact: "Critical",
        effort: "High",
        cost: "$10,000 - $25,000",
        timeline: "1-2 weeks"
    },
    {
        title: "Employee Security Training",
        description: "Conduct comprehensive cybersecurity awareness training for all employees.",
        impact: "Medium",
        effort: "Low",
        cost: "$2,000 - $5,000",
        timeline: "1 week"
    },
    {
        title: "Network Segmentation",
        description: "Implement network segmentation to limit lateral movement in case of breach.",
        impact: "High",
        effort: "High",
        cost: "$15,000 - $30,000",
        timeline: "4-6 weeks"
    }
];

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Add some demo functionality for the landing page
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and steps for animation
    document.querySelectorAll('.card, .step-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add floating animation to hero icon
    const heroIcon = document.querySelector('.hero-icon');
    if (heroIcon) {
        setInterval(() => {
            heroIcon.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px)`;
        }, 100);
    }
});

// Error handling for API calls
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // You could show a user-friendly error message here
});

// Health check function
async function checkBackendHealth() {
    try {
        const result = await apiRequest('/auth/health');
        if (result.success) {
            console.log('Backend is healthy:', result.data);
        } else {
            console.warn('Backend health check failed:', result.error);
        }
    } catch (error) {
        console.error('Backend is not available:', error);
    }
}

// Check backend health on page load
document.addEventListener('DOMContentLoaded', checkBackendHealth);
