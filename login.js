
// Initialize PlayFab SDK
PlayFab.settings.titleId = "467DD"; // Replace with your PlayFab Title ID

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const feedback = document.getElementById('feedback');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Log in user using PlayFab
        const loginRequest = {
            Email: email,
            Password: password,
        };

        PlayFabClientSDK.LoginWithEmailAddress(loginRequest, function (result) {
            // Login successful
            window.location.href = "index.html";
            feedback.textContent = "Login successful!";
            feedback.style.color = "#00FF00";  // Green for success
            // Redirect or handle successful login here
            const userId = result.data.PlayFabId; // Get the PlayFab User ID
            const currentUrl = window.location.origin; // Get the current domain
            const newUrl = `${currentUrl}/${userId}`;  // Construct the new URL
            window.history.pushState({}, '', newUrl);  // Update the browser URL
            
            // Optionally, redirect to the profile page
            window.location.href = newUrl;
        }, function (error) {
            // Login failed
            feedback.textContent = `Error: ${error.errorMessage}`;
            feedback.style.color = "#FF0000";  // Red for error
        });
    });
});
