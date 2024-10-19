document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Show loading indicator
    document.getElementById("loading-screen").style.display = "block";
    
    const loginRequest = {
        TitleId: "C1ACF", // Replace with your actual PlayFab Title ID
        Email: email,
        Password: password
    };

    PlayFabClientSDK.LoginWithEmailAddress(loginRequest, function(result, error) {
        if (result && result.data) {
            // Success: login succeeded
            console.log("Login successful", result);

            // Store PlayFab session and ID
            localStorage.setItem('playfabSessionTicket', result.data.SessionTicket);
            localStorage.setItem('playfabUserId', result.data.PlayFabId);

            // Redirect to a new page (e.g., profile page)
            window.location.href = "https://starversevr.xyz/";
        } else {
            // Error: login failed
            console.error("Login failed", error);
            document.getElementById("feedback").textContent = "Login failed: " + (error.errorMessage || "Unknown error");
        }

        // Hide loading screen after processing
        document.getElementById("loading-screen").style.display = "none";
    });
});
