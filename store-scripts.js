<script src="https://download.playfabapi.com/PlayFabClientApi.js"></script>
<script>
    const TITLE_ID = "2F588"; // Your PlayFab title ID
    const ADMIN_IDS = ['ADMIN_PLAYFABID_1', 'ADMIN_PLAYFABID_2']; // IDs of admins

    // Login function
    function login(customId) {
        PlayFabClientSDK.LoginWithCustomID({
            TitleId: TITLE_ID,
            CustomId: customId,
            CreateAccount: true
        }, (result) => {
            console.log("Login successful:", result);
            loadInventory(result.data.PlayFabId); // Fetch inventory on login
        }, (error) => {
            console.error("Login failed:", error);
        });
    }

    // Load inventory
    function loadInventory(playFabId) {
        PlayFabClientSDK.GetUserInventory({}, (result) => {
            displayInventory(result.Inventory, playFabId);
        }, (error) => {
            console.error("Failed to load inventory:", error);
        });
    }

    // Display inventory items
    function displayInventory(items, playFabId) {
        let inventorySection = document.getElementById('inventory');
        inventorySection.innerHTML = ''; // Clear previous inventory
        items.forEach(item => {
            let itemCard = document.createElement('div');
            itemCard.innerHTML = `
                <h3>${item.DisplayName}</h3>
                <p>ID: ${item.ItemInstanceId}</p>
                <button onclick="sellItem('${item.ItemInstanceId}', 100, '${playFabId}')">Sell for 100 Coins</button>
            `;
            inventorySection.appendChild(itemCard);
        });
    }

    // Sell an item
    function sellItem(itemId, price, sellerId) {
        // Fetch user inventory first
        PlayFabClientSDK.GetUserInventory({}, (result) => {
            let userHasItem = result.Inventory.some(item => item.ItemInstanceId === itemId);

            if (userHasItem) {
                if (confirm("Are you sure you want to sell this item?")) {
                    // Remove the item from inventory
                    PlayFabClientSDK.ConsumeItem({
                        ItemInstanceId: itemId,
                        ConsumeCount: 1
                    }, (consumeResult) => {
                        console.log("Item removed from inventory:", consumeResult);
                        createSaleCard(itemId, price, sellerId); // Create sale card only if item exists
                    }, (consumeError) => {
                        console.error("Failed to consume item:", consumeError);
                    });
                }
            } else {
                alert("You don't own this item!");
            }
        }, (error) => {
            console.error("Failed to load inventory for validation:", error);
        });
    }

    // Create a sale card
    function createSaleCard(itemId, price, sellerId) {
        let saleSection = document.getElementById('player-sales');
        let saleCard = document.createElement('div');
        saleCard.innerHTML = `
            <h3>Item for Sale</h3>
            <p>Seller: ${sellerId}</p>
            <p>Item ID: ${itemId}</p>
            <p>Price: ${price} Coins</p>
            <button onclick="buyItem('${itemId}', ${price}, '${sellerId}')">Buy</button>
        `;
        saleSection.appendChild(saleCard);
    }

    // Buy an item
    function buyItem(itemId, price, sellerId) {
        let buyerId = prompt("Enter your PlayFab ID to buy:");
        if (buyerId) {
            PlayFabClientSDK.SubtractUserVirtualCurrency({
                VirtualCurrency: "SR", // Example currency code
                Amount: price
            }, (result) => {
                console.log("Currency subtracted, purchase successful:", result);
                // Add item to buyer inventory (mock in this example)
                console.log(`Item ${itemId} transferred to ${buyerId}`);
                removeSaleCard(itemId); // Remove from sale after purchase
            }, (error) => {
                console.error("Failed to subtract currency:", error);
            });
        }
    }

    // Remove sale card after purchase
    function removeSaleCard(itemId) {
        let saleSection = document.getElementById('player-sales');
        let saleCard = saleSection.querySelector(`div[data-id="${itemId}"]`);
        if (saleCard) {
            saleCard.remove();
        }
    }

    // For featured items
    function loadFeaturedItems() {
        let featuredSection = document.getElementById('featured-items');
        featuredSection.innerHTML = ''; // Clear previous items
        let items = [/* Featured items data from your backend */]; 
        items.forEach(item => {
            let itemCard = document.createElement('div');
            let adminButtons = ADMIN_IDS.includes(item.sellerId) ? `<button onclick="featureItem('${item.id}')">Feature</button>` : '';
            itemCard.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                ${adminButtons}
            `;
            featuredSection.appendChild(itemCard);
        });
    }

    // Example function to feature an item (only admins can)
    function featureItem(itemId) {
        console.log(`Item ${itemId} featured by admin.`);
        // Send a request to your backend to feature the item
    }

    // Call login on page load (using a sample custom ID)
    window.onload = () => {
        login("SAMPLE_PLAYER_ID"); 
        loadFeaturedItems();
    };
</script>
                                                 
