// Fetch PlayFab information when the page loads
window.onload = function () {
    const playerId = localStorage.getItem('playFabId'); // Assume the PlayFab ID is stored after login
    if (!playerId) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        fetchPlayerProfile(playerId);
        fetchCurrency(playerId);
    }
};

// Function to fetch player profile
function fetchPlayerProfile(playerId) {
    PlayFabClientSDK.GetAccountInfo({}, function (result, error) {
        if (result) {
            const username = result.data.AccountInfo.Username;
            document.getElementById("usernameDisplay").innerText = `Username: ${username}`;
        } else {
            console.error("Error fetching profile:", error);
        }
    });
}

// Function to fetch currency
function fetchCurrency(playerId) {
    PlayFabClientSDK.GetUserInventory({}, function (result, error) {
        if (result) {
            const currency = result.data.VirtualCurrency["SR"] || 0; // Assuming "GC" is the currency code
            document.getElementById("currencyDisplay").innerText = `Currency: ${currency}`;
        } else {
            console.error("Error fetching currency:", error);
        }
    });
}

// Handle username update
document.getElementById("updateUsernameForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;

    if (newUsername) {
        PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: newUsername }, function (result, error) {
            if (result) {
                document.getElementById("feedback").innerText = "Username updated successfully!";
                document.getElementById("usernameDisplay").innerText = `Username: ${newUsername}`;
            } else {
                document.getElementById("feedback").innerText = "Error updating username.";
                console.error(error);
            }
        });
    }
});

// Search functionality
document.getElementById("searchBar").addEventListener("input", function () {
    const searchQuery = this.value.toLowerCase();
    const pages = [
        { name: "Home", url: "https://starversevr.xyz/" },
        { name: "Shop", url: "https://starversevr.xyz/store" },
        { name: "Profile", url: "https://starversevr.xyz/profile" },
        { name: "Support", url: "https://starversevr.xyz/support" }
    ];

    const filteredPages = pages.filter(page => page.name.toLowerCase().includes(searchQuery));
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = ""; // Clear previous results

    filteredPages.forEach(page => {
        const li = document.createElement("li");
        li.textContent = page.name;
        li.addEventListener("click", () => {
            window.location.href = page.url;
        });
        searchResults.appendChild(li);
    });
});
