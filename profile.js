// Initialize PlayFab SDK
PlayFab.settings.titleId = "YOUR_TITLE_ID"; // Replace with your PlayFab Title ID

document.addEventListener('DOMContentLoaded', function () {
    const profileContainer = document.getElementById('profileContainer');
    const notLoggedInContainer = document.getElementById('notLoggedIn');
    const feedback = document.getElementById('feedback');
    
    // Check if user is logged in
    PlayFabClientSDK.GetAccountInfo({}, function(result) {
        // User is logged in
        profileContainer.style.display = 'block';
        notLoggedInContainer.style.display = 'none';
        
        const userId = result.data.AccountInfo.PlayFabId; // Get the PlayFab User ID
        const currentUrl = window.location.origin; // Get the current domain
        const newUrl = `${currentUrl}/${userId}`;  // Construct the new URL
        window.history.pushState({}, '', newUrl);  // Update the browser URL

        // Continue loading the profile data...
        const userInfo = result.data.AccountInfo;
        document.getElementById('displayName').value = userInfo.Username || '';
        document.getElementById('bio').value = userInfo.Bio || '';
        document.getElementById('profilePicture').src = userInfo.ProfilePictureUrl || 'default-avatar.png';

        // Handle profile update
        document.getElementById('editProfileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }, function(error) {
        // User is not logged in
        profileContainer.style.display = 'none';
        notLoggedInContainer.style.display = 'block';
    });
});
