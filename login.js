/*
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
            window.location.href = "https://starversevr.xyz/";
            feedback.textContent = "Login successful!";
            feedback.style.color = "#00FF00";  // Green for success
            // Redirect or handle successful login here
            const userId = result.data.PlayFabId; // Get the PlayFab User ID
            const currentUrl = window.location.origin; // Get the current domain
            const newUrl = `https://starversevr.xyz/profile?user=${userId}`;  // Construct the new URL
            window.history.pushState({}, '', newUrl);  // Update the browser URL
            showLoadingScreen()
            // Optionally, redirect to the profile page
            window.location.href = newUrl;
        }, function (error) {
            // Login failed
            feedback.textContent = `Error: ${error.errorMessage}`;
            feedback.style.color = "#FF0000";  // Red for error
        });
    });
});
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    loadingScreen.style.display = 'flex'; // Show loading screen

    // Simulate a loading delay
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Hide loading screen
        content.style.display = 'block'; // Show main content
    }, 2000); // Change the delay time as needed
}

// Call the function to show the loading screen when the page loads
window.onload = showLoadingScreen;
*/
PlayFab.settings.titleId = "467DD"; // Replace with your PlayFab Title ID

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the form from submitting the default way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if the email and password are not empty
    if (email === "" || password === "") {
        document.getElementById('feedback').textContent = "Please enter both email and password!";
        return;
    }

    // Display loading screen or feedback
    document.getElementById('loading-screen').style.display = 'block';
    document.getElementById('feedback').textContent = "Logging in...";

    const loginRequest = {
        TitleId: PlayFab.settings.titleId,
        Email: email,
        Password: password
    };

    // Try logging in with PlayFab
    PlayFabClientSDK.LoginWithEmailAddress(loginRequest, function (result, error) {
        // Hide loading screen once we get a response
        document.getElementById('loading-screen').style.display = 'none';

        if (result) {
            console.log("Login successful:", result);

            // Store PlayFab User ID in local storage
            const userId = result.data.PlayFabId;
            localStorage.setItem('playfabUserId', userId);

            // Redirect to profile or store page after successful login
            window.location.href = "profile.html";
        } else {
            console.error("Error logging in:", error);
            // Show error message in the feedback area
            document.getElementById('feedback').textContent = "Login failed: " + error.errorMessage;
        }
    });
});
