document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission reload

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Show loading indicator
    document.getElementById("loading-screen").style.display = "block";
    
    const registerRequest = {
        TitleId: "C1ACF", // Replace with your PlayFab Title ID
        Email: email,
        Password: password,
        RequireBothUsernameAndEmail: false // Set to true if you want to require usernames
    };

    PlayFabClientSDK.RegisterPlayFabUser(registerRequest, function(result, error) {
        if (result && result.data) {
            // Success: registration succeeded
            console.log("Registration successful", result);

            // Automatically log in the user or redirect to the login page
            window.location.href = "login.html";
        } else {
            // Error: registration failed
            console.error("Registration failed", error);
            document.getElementById("registerFeedback").textContent = "Registration failed: " + (error.errorMessage || "Unknown error");
        }

        // Hide loading screen after processing
        document.getElementById("loading-screen").style.display = "none";
    });
});
