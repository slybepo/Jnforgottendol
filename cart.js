let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cartItems');

if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
} else {
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>${item.price} Coins</p>
        </div>
    `).join('');
}

function checkout() {
    // Perform checkout logic (subtract coins, give the user the items, etc.)
    alert("Proceeding to checkout...");
}
