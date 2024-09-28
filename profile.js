PlayFab.settings.titleId = "467DD";  // Replace with your PlayFab Title ID

// Get the user ID from the URL parameter

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user');

// If there's no user in the URL, redirect to login
if (!userId) {
    window.location.href = "login.html";
} else {
    // Show loading message
    document.getElementById("username").innerText = "Loading...";
    document.getElementById("creationDate").innerText = "Loading...";
    document.getElementById("lastLogin").innerText = "Loading...";
    document.getElementById("role").innerText = "Loading...";

    // Fetch account info using PlayFab ID
    PlayFabClientSDK.GetAccountInfo({ PlayFabId: userId }, function (result, error) {
        if (result) {
            const userInfo = result.data.AccountInfo;

            // Display the basic account info
            document.getElementById("username").innerText = userInfo.TitleInfo.DisplayName || "Unknown";
            document.getElementById("creationDate").innerText = new Date(userInfo.TitleInfo.Created).toLocaleDateString();
            document.getElementById("lastLogin").innerText = new Date(userInfo.TitleInfo.LastLogin).toLocaleDateString();

            // Now we fetch the user's role using CloudScript
            PlayFabClientSDK.ExecuteCloudScript({
                FunctionName: "GetUserRole",
                FunctionParameter: { PlayFabId: userId },
            }, function (cloudResult, cloudError) {
                if (cloudResult) {
                    const role = cloudResult.data.FunctionResult.role;
                    document.getElementById("role").innerText = role;
                } else {
                    console.error("CloudScript error:", cloudError);
                    document.getElementById("role").innerText = "User";
                }
            });
        } else {
            console.error("GetAccountInfo error:", error);
            alert("Error fetching user information. Please try again.");
        }
    });
}
