// Event listener for login form submission
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission (reload)

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Show loading screen
    document.getElementById("loading-screen").style.display = "block";

    try {
        // PlayFab login request
        const loginRequest = {
            TitleId: "C1ACF", // Replace with your PlayFab Title ID
            Email: email,
            Password: password,
        };

        PlayFabClientSDK.LoginWithEmailAddress(loginRequest, (result, error) => {
            if (result) {
                // Successfully logged in, redirect to the next page
                console.log("Login successful: ", result);
                
                // Optionally save the PlayFab session or user info to local storage for later use
                localStorage.setItem('playfabSessionTicket', result.data.SessionTicket);
                localStorage.setItem('playfabUserId', result.data.PlayFabId);

                // Hide loading screen
                document.getElementById("loading-screen").style.display = "none";

                // Redirect to a specific page (e.g., profile page)
                window.location.href = "https://starversevr.xyz/profile";
            } else {
                // Show error feedback
                console.error("Error during login:", error);
                document.getElementById("feedback").textContent = "Login failed. Please check your credentials.";
                document.getElementById("loading-screen").style.display = "none";
            }
        });
    } catch (err) {
        console.error("Error in login process:", err);
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("feedback").textContent = "An error occurred. Please try again.";
    }
});
