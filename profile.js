// Initialize PlayFab SDK
PlayFab.settings.titleId = "YOUR_TITLE_ID";  // Replace with your PlayFab Title ID

document.addEventListener('DOMContentLoaded', function () {
    // Function to get query parameter (PlayFab ID in this case)
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the PlayFab ID from the URL (?user=PlayFabId)
    const playfabId = getQueryParam('user');

    if (playfabId) {
        // Call PlayFab API to get user account info using PlayFab ID
        const request = { PlayFabId: playfabId };

        PlayFabClientSDK.GetAccountInfo(request, function (result) {
            const userInfo = result.data.AccountInfo;

            // Display PlayFab ID
            document.getElementById('playfabId').textContent = userInfo.PlayFabId;

            // Display Display Name
            document.getElementById('displayName').textContent = userInfo.TitleInfo.DisplayName || 'No Display Name';

            // Display Join Date
            const joinDate = new Date(userInfo.TitleInfo.Created);
            document.getElementById('joinDate').textContent = joinDate.toDateString();


        }, function (error) {
            // Display error message
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = `Error: ${error.errorMessage}`;
        });
    } else {
        // If no PlayFab ID in the URL, display error
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'No user ID provided in the URL.';
    }
});
