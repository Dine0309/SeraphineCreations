<script>
document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".cart-container");
    const totalElement = document.querySelector(".total-section h3");

    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        // Display each item in the cart
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Php ${product.price.toFixed(2)}</p>
                <input type="number" class="quantity-input" placeholder="Quantity" value="${product.quantity}" min="1" data-index="${index}" >
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        // Calculate total
        const updateTotal = () => {
            const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
            totalElement.textContent = `Total: Php ${total.toFixed(2)}`;
        };

        updateTotal();

        // Add event listeners for "Remove" buttons
        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const productIndex = this.getAttribute("data-index");
                removeFromCart(productIndex);
            });
        });

        // Add event listeners for quantity input
        const quantityInputs = document.querySelectorAll(".quantity-input");
        quantityInputs.forEach(input => {
            input.addEventListener("change", function () {
                const index = this.getAttribute("data-index");
                const newQuantity = parseInt(this.value);
                updateQuantity(index, newQuantity);
            });
        });
    }

    // Function to remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);

        // Save the updated cart back to localStorage
        localStorage.setItem("shoppingCart", JSON.stringify(cart));

        // Reload the cart page to reflect changes
        location.reload();
    }

    // Function to update item quantity in the cart
    function updateQuantity(index, newQuantity) {
        cart[index].quantity = newQuantity;

        // Save the updated cart back to localStorage
        localStorage.setItem("shoppingCart", JSON.stringify(cart));

        // Update the total price
        updateTotal();
    }

    // Function to handle the checkout process
    document.querySelector('.checkout-btn').addEventListener('click', function () {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before proceeding to checkout.");
            return;
        }

        // Calculate the merchandise total
        const merchandiseTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        // Store the cart items and total in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));
        localStorage.setItem('merchandiseTotal', merchandiseTotal);

        // Redirect to checkout page
        window.location.href = 'checkout.html';
    });
});
</script>