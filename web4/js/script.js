// js/script.js dosyasına eklenecek kod
// Shopping cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Update cart count
    updateCartCount();
    
    // Add click event to shopping cart icon
    const shoppingCart = document.querySelector('.shopping-cart');
    if (shoppingCart) {
        shoppingCart.addEventListener('click', function() {
            document.querySelector('.cart-modal').style.display = 'flex';
            displayCartItems();
        });
    }
    
    // Add click event to close modal button
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.querySelector('.cart-modal').style.display = 'none';
        });
    }
    
    // AKTIFLEŞTIRILEN İNCELE BUTONLARI - Ana sayfadaki İncele butonları
    const inceleButtons = document.querySelectorAll('.category-info .btn');
    if (inceleButtons.length > 0) {
        inceleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Kartın kendisine olan tıklama olayını engelle
                const href = this.getAttribute('href');
                window.location.href = href;
            });
        });
    }
    
    // Kategori kartlarına da tıklama özelliği eklendi
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Butona tıklanırsa kartın tıklanma olayını engelle
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                    return;
                }
                
                const categoryButton = this.querySelector('.category-info .btn');
                if (categoryButton) {
                    const href = categoryButton.getAttribute('href');
                    window.location.href = href;
                }
            });
        });
    }
    
    // Filter functionality for product pages
    const filterOptions = document.querySelectorAll('.filter-option');
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                filterOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
                
                // Here you would typically filter products
                // For now, we'll just show all products
            });
        });
    }
});

// Function to update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        cartCount.textContent = cart ? cart.length : 0;
    }
}

// Function to display cart items
function displayCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total-value');
    
    if (cartItems && cartTotal) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        
        cartItems.innerHTML = '';
        let total = 0;
        
        if (cart && cart.length > 0) {
            cart.forEach((item, index) => {
                total += item.price;
                
                const cartItemHtml = `
                    <div class="cart-item">
                        <div class="cart-item-image" style="background-color: ${item.color || '#f0f0f0'}">
                            ${item.name.charAt(0)}
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price.toFixed(2)} TL</div>
                        </div>
                        <div class="cart-item-remove" onclick="removeFromCart(${index})">✕</div>
                    </div>
                `;
                
                cartItems.innerHTML += cartItemHtml;
            });
        } else {
            cartItems.innerHTML = '<p>Sepetinizde ürün bulunmamaktadır.</p>';
        }
        
        cartTotal.textContent = total.toFixed(2) + ' TL';
    }
}

// Function to add item to cart
function addToCart(name, price, color) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.push({
        name: name,
        price: price,
        color: color
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show a confirmation message
    alert(`${name} sepete eklendi!`);
}

// Function to remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}