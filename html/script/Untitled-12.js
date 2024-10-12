/ script/product.js

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
            const productImage = this.getAttribute("data-image");

            // Create a product object
            const product = {
                name: productName,
                price: parseFloat(productPrice),
                image: productImage
            };

            // Retrieve the existing cart from localStorage or create an empty array
            let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

            // Add the selected product to the cart
            cart.push(product);

            // Save the updated cart back to localStorage
            localStorage.setItem("shoppingCart", JSON.stringify(cart));

            // Update cart count
            updateCartCount();

            alert(`${productName} added to cart!`);
        });
    });

    // Function to update cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        const cartCountElement = document.querySelector(".cart-count");
        cartCountElement.textContent = cart.length;
    }

    // Call the function on page load to update the count in case there are items in the cart already
    updateCartCount();
});