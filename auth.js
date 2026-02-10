// Authentication Module
const Auth = {
    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('currentUser') !== null;
    },

    // Get current user
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Register new user
    register(name, email, password) {
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            alert('Denne e-postadressen er allerede registrert');
            return false;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            subscription: 'monthly'
        };

        // Add to users array
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Initialize empty user data
        const userData = {
            kontakter: [],
            abonnementer: [],
            krypto: [],
            forsikringer: [],
            bank: [],
            eiendommer: [],
            kjoretoy: [],
            digitalt: [],
            dokumenter: [],
            minner: [],
            livsmanual: {},
            etterlatte: [],
            aktivering: {
                inaktivitetDager: 180,
                betroddKontakt: null,
                varslingskontakter: []
            }
        };
        localStorage.setItem(`userData_${newUser.id}`, JSON.stringify(userData));

        // Log user in
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        return true;
    },

    // Login user
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Update last login
            user.lastLogin = new Date().toISOString();
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        
        alert('Feil e-post eller passord');
        return false;
    },

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
};

// Modal functions
function showAuthModal(mode) {
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
    switchAuthMode(mode);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
}

function switchAuthMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (mode === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Login function
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Vennligst fyll ut alle feltene');
        return;
    }
    
    if (Auth.login(email, password)) {
        window.location.href = 'dashboard.html';
    }
}

// Register function
function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    if (!name || !email || !password || !passwordConfirm) {
        alert('Vennligst fyll ut alle feltene');
        return;
    }
    
    if (password.length < 6) {
        alert('Passordet må være minst 6 tegn');
        return;
    }
    
    if (password !== passwordConfirm) {
        alert('Passordene matcher ikke');
        return;
    }
    
    if (Auth.register(name, email, password)) {
        alert('Konto opprettet! Velkommen til Min Saga');
        window.location.href = 'dashboard.html';
    }
}

// Logout function
function logout() {
    if (confirm('Er du sikker på at du vil logge ut?')) {
        Auth.logout();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target == modal) {
        closeAuthModal();
    }
}

// Allow Enter key to submit forms
document.addEventListener('DOMContentLoaded', function() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    if (loginEmail && loginPassword) {
        [loginEmail, loginPassword].forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') login();
            });
        });
    }
});
