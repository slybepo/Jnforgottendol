PlayFab.settings.titleId = "467DD";  // Replace with your PlayFab Title ID

// Check if the user is logged in (assume a valid session is stored if PlayFabSessionTicket exists)
const sessionTicket = localStorage.getItem("PlayFabSessionTicket");

if (sessionTicket) {
    const request = {
        SessionTicket: sessionTicket
    };

    PlayFabClientSDK.GetAccountInfo(request, function(result, error) {
        if (result) {
            console.log("User is logged in", result);
            document.getElementById("shop").style.display = "block";
            document.getElementById("notLoggedIn").style.display = "none";
        } else {
            console.error("Session expired or invalid.", error);
            redirectToLogin();
        }
    });
} else {
    redirectToLogin();
}

function redirectToLogin() {
    document.getElementById("shop").style.display = "none";
    document.getElementById("notLoggedIn").style.display = "block";
}
