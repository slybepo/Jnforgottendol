PlayFab.settings.titleId = "467DD";  // Replace with your PlayFab Title ID

// Get the user ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user');

// If there's no user in the URL, redirect to login
if (!userId) {
    window.location.href = "login.html";
} else {
    // Request PlayFab account info for the specific user ID
    const request = {
        PlayFabId: userId
    };

    PlayFabClientSDK.GetAccountInfo(request, function (result, error) {
        if (result) {
            const userInfo = result.data.AccountInfo;
            document.getElementById("username").innerText = userInfo.TitleInfo.DisplayName || "Unknown";
            document.getElementById("creationDate").innerText = new Date(userInfo.TitleInfo.Created).toLocaleDateString();
            document.getElementById("lastLogin").innerText = new Date(userInfo.TitleInfo.LastLogin).toLocaleDateString();

            // Call the CloudScript to get the user role
            PlayFabClientSDK.ExecuteCloudScript({
                FunctionName: "GetUserRole",
                FunctionParameter: { PlayFabId: userId }
            }, function (cloudResult, cloudError) {
                if (cloudResult) {
                    const role = cloudResult.data.FunctionResult.role;
                    document.getElementById("role").innerText = role;
                } else {
                    console.error("Error fetching user role:", cloudError);
                    document.getElementById("role").innerText = "User";
                }
            });
        } else {
            console.error("Error fetching account info:", error);
        }
    });
}
