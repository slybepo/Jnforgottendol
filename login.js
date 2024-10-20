// Function to handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    PlayFabClientSDK.LoginWithEmailAddress({
        TitleId: "C1ACF",  // Your PlayFab title ID
        Email: email,
        Password: password
    }, function (result, error) {
        if (result) {
            // Store PlayFabId in localStorage to persist user login
            localStorage.setItem('playFabId', result.data.PlayFabId);
            localStorage.setItem('SessionTicket', result.data.SessionTicket);
            console.log("Login successful! PlayFabId: ", result.data.PlayFabId);
            
            // Redirect to profile or another page after login
            window.location.href = "profile.html";
        } else {
            document.getElementById('feedback').innerText = "Login failed. Please check your credentials.";
            console.error("Login error: ", error);
        }
    });
});
