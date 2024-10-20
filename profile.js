// Fetch PlayFab information when the page loads
window.onload = function () {
    const playerId = localStorage.getItem('playFabId'); // Assume the PlayFab ID is stored after login
    if (!playerId) {
        window.location.href = "https://starversevr.xyz/login"; // Redirect to login if not logged in
    } else {
        getUserAccountInfo()
        
        // Fetch user account information (username, email, etc.)

});
/*
// Fetch virtual currency
PlayFabClientSDK.GetUserInventory({}, function(result, error) {
    if (result) {
        // Successfully fetched currency
        const currency = result.VirtualCurrency.SR; // Replace with actual currency code
        document.getElementById('currency').innerText = currency;
    } else {
        console.error("Failed to fetch currency:", error);
    }
});
;
    }
};*/

// Function to fetch player profile
/*function fetchPlayerProfile(playerId) {
    PlayFabClientSDK.GetAccountInfo({}, function (result, error) {
        if (result) {
            const username = result.data.AccountInfo.Username;
            document.getElementById("usernameDisplay").innerText = `Username: ${username}`;
        } else {
            console.error("Error fetching profile:", error);
        }
    });
}

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
*/

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
    searchResults.innerHTML = "";

    filteredPages.forEach(page => {
        const li = document.createElement("li");
        li.textContent = page.name;
        li.addEventListener("click", () => {
            window.location.href = page.url;
        });
        searchResults.appendChild(li);
    });
});










const titleId = "C1ACF"; // Replace with your PlayFab Title ID
const sessionTicket = localStorage.getItem('SessionTicket'); // Replace with the session ticket obtained after login

// Define the API URL
const url = `https://${titleId}.playfabapi.com/Client/GetUserAccountInfo`;

// Set up the request to PlayFab
async function getUserAccountInfo() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Authentication": sessionTicket // Session ticket for the logged-in user
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve user info');
        }

        const data = await response.json();

        // Extract username and currency info from the response
        const username = data.data.UserInfo.Username;
        const playFabId = data.data.UserInfo.PlayFabId;
        document.getElementById('usernameDisplay').innerText = ` hello ${username}!;

        console.log(`Username: ${username}, PlayFabId: ${playFabId}`);

        // If you need to get user currency balance, use GetUserInventory API
        await getUserCurrency(playFabId);

    } catch (error) {
        console.error('Error fetching user account info:', error);
    }
}

async function getUserCurrency(playFabId) {
    try {
        const currencyUrl = `https://${titleId}.playfabapi.com/Client/GetUserInventory`;

        const response = await fetch(currencyUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Authentication": sessionTicket
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve user currency');
        }

        const currencyData = await response.json();

        const virtualCurrency = currencyData.data.VirtualCurrency;
        console.log('Currency: ', virtualCurrency); // Output virtual currency balances
        document.getElementById('currencyDisplay').innerText = virtualCurrency;
    } catch (error) {
        console.error('Error fetching user currency:', error);
    }
}

// Call the function to get the user account info and currency
getUserAccountInfo();
    
