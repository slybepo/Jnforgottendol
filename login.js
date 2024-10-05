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
PlayFab.settings.titleId = "467DD";  // Replace with your PlayFab Title ID

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginRequest = {
        TitleId: PlayFab.settings.titleId,
        Email: email,
        Password: password
    };

    PlayFabClientSDK.LoginWithEmailAddress(loginRequest, function (result, error) {
        if (result) {
            console.log("Login successful:", result);

            // Store the PlayFab User ID in local storage
            const userId = result.data.PlayFabId;
            localStorage.setItem('playfabUserId', userId);
            
            // Redirect or perform other actions
            window.location.href = "profile.html";  // Redirect to profile or store page after login
        } else {
            console.error("Error logging in:", error);
        }
    });
});
