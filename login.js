// Default credentials
let defaultEmail = "admin@gmail.com";
let defaultPassword = "admin";

// Variables to store signed-up user details
let signedUpEmail = '';
let signedUpPassword = '';

// Login functionality
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const warning = document.getElementById('warning');

    // Clear previous warning
    warning.style.display = 'none';

    // Check if email and password fields are filled
    if (!email || !password) {
        warning.textContent = "Please enter both email and password.";
        warning.style.display = 'block';
        return;
    }

    // Check if the entered credentials match the signed-up details or default credentials
    if ((email === signedUpEmail && password === signedUpPassword) || 
        (email === defaultEmail && password === defaultPassword)) {
        alert("Login successful!");
        window.location.href = "homepage.html"; // Redirect only on successful login
    } else {
        alert("Invalid login credentials!");
    }
}

// Sign Up functionality
function signUp() {
    const signUpEmail = document.getElementById('signup-email').value;
    const signUpPassword = document.getElementById('signup-password').value;
    const signUpConfirmPassword = document.getElementById('signup-confirm-password').value;

    if (signUpPassword !== signUpConfirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Store the signed-up credentials
    signedUpEmail = signUpEmail;
    signedUpPassword = signUpPassword;

    alert("Sign Up successful for " + signedUpEmail + ". Please log in using your new credentials.");
    closeModal('signup-modal');
}

// Show modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Forgot Password functionality
function forgotPassword() {
    const email = prompt("Please enter your email address:");
    if (email) {
        alert("A password reset link has been sent to " + email);
    }
}

// Event listener for Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});