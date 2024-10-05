PlayFab.settings.titleId = "467DD";  // Replace with your PlayFab Title ID

// Function to fetch user currency
function getUserCurrency() {
    PlayFabClientSDK.GetUserInventory({}, function (result, error) {
        if (result) {
            const currencyAmount = result.VirtualCurrency.GC; // Assuming 'GC' is the currency code
            document.getElementById('currencyAmount').textContent = currencyAmount;
        } else {
            console.error("Error fetching currency:", error);
        }
    });
}

// Function to handle purchasing an item
function buyItem(itemId, cost) {
    PlayFabClientSDK.SubtractUserVirtualCurrency({
        VirtualCurrency: "GC",  // Assuming 'GC' is your currency code
        Amount: cost
    }, function (result, error) {
        if (result) {
            // Grant the user the item after successfully subtracting currency
            PlayFabClientSDK.GrantItemsToUser({
                ItemIds: [itemId],
            }, function (grantResult, grantError) {
                if (grantResult) {
                    alert("Item purchased successfully!");
                    getUserCurrency(); // Update currency display
                } else {
                    console.error("Error granting item:", grantError);
                }
            });
        } else {
            console.error("Error purchasing item:", error);
        }
    });
}

// Call this function on page load to get the user's currency
getUserCurrency();

// Handle buy button clicks
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.product-card');
        const itemId = productCard.getAttribute('data-item-id');
        const cost = parseInt(productCard.querySelector('.product-price span').textContent, 10);

        buyItem(itemId, cost);
    });
});


// Retrieve the User ID from local storage
const userId = localStorage.getItem('playfabUserId');

if (!userId) {
    // If no user ID is found, redirect to login
    window.location.href = "login.html";
} else {
    // Fetch the user inventory or currency
    getUserCurrency(userId);
}

// Function to fetch user currency
function getUserCurrency(userId) {
    PlayFabClientSDK.GetUserInventory({ PlayFabId: userId }, function (result, error) {
        if (result) {
            const currencyAmount = result.VirtualCurrency.GC; // Assuming 'GC' is the currency code
            document.getElementById('currencyAmount').textContent = currencyAmount;
        } else {
            console.error("Error fetching currency:", error);
        }
    });
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your basket!`);
}

// Fetch user's currency from PlayFab (you'll need to implement actual PlayFab API calls here)
document.getElementById('currencyAmount').innerText = 1000;
