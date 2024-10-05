PlayFab.settings.titleId = "C1ACF"; // Replace with your PlayFab Title ID

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const feedback = document.getElementById('feedback');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Register user using PlayFab
        const registrationRequest = {
            Username: username,
            Email: email,
            Password: password,
            RequireBothUsernameAndEmail: true,
        };

        PlayFabClientSDK.RegisterPlayFabUser(registrationRequest, function (result) {
            // Registration successful
            window.location.href = "login.html";
            feedback.textContent = "Registration successful!";
            feedback.style.color = "#00FF00";  // Green for success
        }, function (error) {
            // Registration failed
            feedback.textContent = `Error: ${error.errorMessage}`;
            feedback.style.color = "#FF0000";  // Red for error
        });
    });
});
