// User credentials database (in a real application, this would be server-side)
const users = {
    // Students
    'estudiante1': { password: 'demo123', role: 'student', name: 'Juan Pérez' },
    'estudiante2': { password: 'demo123', role: 'student', name: 'María García' },
    'estudiante3': { password: 'demo123', role: 'student', name: 'Carlos López' },
    
    // Administrators
    'admin1': { password: 'admin123', role: 'admin', name: 'Ana Rodríguez' },
    'admin2': { password: 'admin123', role: 'admin', name: 'Luis Martínez' },
    'coordinador1': { password: 'coord123', role: 'admin', name: 'Patricia Silva' }
};

// Initialize login functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    initializePasswordToggle();
    checkExistingSession();
});

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const selectedRole = document.querySelector('input[name="userRole"]:checked').value;
        
        if (authenticateUser(username, password, selectedRole)) {
            // Store session data
            const userData = users[username];
            sessionStorage.setItem('currentUser', JSON.stringify({
                username: username,
                role: userData.role,
                name: userData.name,
                loginTime: new Date().toISOString()
            }));
            
            // Redirect based on role
            redirectUser(userData.role);
        } else {
            showError('Usuario, contraseña o tipo de usuario incorrectos');
        }
    });
}

function authenticateUser(username, password, selectedRole) {
    const user = users[username];
    
    if (!user) {
        return false;
    }
    
    // Check password and role match
    return user.password === password && user.role === selectedRole;
}

function redirectUser(role) {
    if (role === 'student') {
        // Redirect to student dashboard (main application)
        window.location.href = 'index.html';
    } else if (role === 'admin') {
        // Redirect to admin dashboard (will be created next)
        window.location.href = 'admin.html';
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    
    // Hide error after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function initializePasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon
        const icon = passwordToggle.querySelector('.icon path');
        if (type === 'text') {
            icon.setAttribute('d', 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92 1.41-1.41L3.51 1.93 2.1 3.34l2.36 2.36C4.06 6.53 3.5 7.93 3.5 9.5c0 4.39 6 7.5 11 7.5 1.01 0 1.97-.2 2.86-.57l2.17 2.17 1.41-1.41L12 7zm0 10c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.04.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .39-.02.57-.06L14.14 16.51C13.5 16.82 12.77 17 12 17z');
        } else {
            icon.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
        }
    });
}

function checkExistingSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        
        // Check if session is still valid (less than 8 hours old)
        const loginTime = new Date(userData.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 8) {
            // Session is still valid, redirect to appropriate dashboard
            redirectUser(userData.role);
        } else {
            // Session expired, clear it
            sessionStorage.removeItem('currentUser');
        }
    }
}

// Auto-fill demo credentials when clicking on them
document.addEventListener('DOMContentLoaded', function() {
    const demoSections = document.querySelectorAll('.demo-section');
    
    demoSections.forEach(section => {
        section.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            const parts = text.split(' | ');
            
            if (parts.length === 2) {
                const username = parts[0].replace('Usuario: ', '');
                const password = parts[1].replace('Contraseña: ', '');
                
                document.getElementById('username').value = username;
                document.getElementById('password').value = password;
                
                // Set appropriate role
                if (username.includes('estudiante')) {
                    document.getElementById('roleStudent').checked = true;
                } else {
                    document.getElementById('roleAdmin').checked = true;
                }
                
                // Add visual feedback
                this.style.background = 'rgba(72, 79, 95, 0.1)';
                setTimeout(() => {
                    this.style.background = '';
                }, 200);
            }
        });
    });
});

// Enhanced form validation
document.getElementById('username').addEventListener('input', function() {
    this.value = this.value.toLowerCase().replace(/[^a-z0-9]/g, '');
});

// Enter key support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.click();
    }
});