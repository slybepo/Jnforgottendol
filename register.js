document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission reload

    const username = document.getElementById("username").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Show loading indicator
    document.getElementById("loading-screen").style.display = "block";
    
    const registerRequest = {
        TitleId: "C1ACF", // Replace with your PlayFab Title ID
        Email: email,
        Password: password,
        Username: username
    };

    PlayFabClientSDK.RegisterPlayFabUser(registerRequest, function(result, error) {
        if (result && result.data) {
            // Success: registration succeeded
            console.log("Registration successful", result);

            // Redirect user to login page or any other page
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
