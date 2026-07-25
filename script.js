const allProducts = [
    { id: 1, name: "HP Laptop", price: 180000, category: "Electronics", rating: 4.8, reviews: 23, seller: "Miracle", status: "Available", img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=400&q=80" },
    { id: 2, name: "JavaScript Book", price: 8000, category: "Books", rating: 4.6, reviews: 15, seller: "David", status: "Sold Out", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
    { id: 3, name: "Black Hoodie", price: 12000, category: "Clothes", rating: 4.3, reviews: 8, seller: "Johnson", status: "Available", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80" },
    { id: 4, name: "Jollof Rice Pack", price: 3500, category: "Food", rating: 4.7, reviews: 31, seller: "Blessing", status: "Available", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80" },
    { id: 5, name: "Nike Air Force 1", price: 45000, category: "Clothes", rating: 4.9, reviews: 18, seller: "Daniel", status: "Available", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80" },
    { id: 6, name: "AirPods Pro", price: 95000, category: "Electronics", rating: 4.5, reviews: 12, seller: "Miracle", status: "Sold Out", img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80" },
    { id: 7, name: "Math Textbook", price: 6500, category: "Books", rating: 4.2, reviews: 9, seller: "Sarah", status: "Available", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80" },
    { id: 8, name: "Water Bottle", price: 2000, category: "Others", rating: 4.1, reviews: 6, seller: "Michael", status: "Available", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80" },
    // Extra data for pagination
    { id: 9, name: "Wireless Mouse", price: 5000, category: "Electronics", rating: 4.4, reviews: 40, seller: "Ekene", status: "Available", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
    { id: 10, name: "Desk Lamp", price: 7500, category: "Electronics", rating: 4.0, reviews: 11, seller: "Grace", status: "Available", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
    { id: 11, name: "Notebook Set", price: 3000, category: "Books", rating: 4.8, reviews: 55, seller: "John", status: "Sold Out", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80" },
    { id: 12, name: "Backpack", price: 15000, category: "Others", rating: 4.6, reviews: 29, seller: "Alice", status: "Available", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" }
];

let cart = [];
const itemsPerPage = 8;
let currentPage = 1;

const formatNaira = (amount) => '₦' + amount.toLocaleString();

// 2. Main UI Rendering (Products, Pagination, Stats)
function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = productsToShow.slice(startIndex, startIndex + itemsPerPage);

    const cards = paginatedItems.map(product => {
        const isAvailable = product.status === 'Available';
        const badgeClass = isAvailable ? 'status-available' : 'status-soldout';
        const btnText = isAvailable ? '<span class="material-symbols-rounded" style="font-size:1.1rem;">add_shopping_cart</span> Add to Cart' : 'Sold Out';

        const card = `
                    <div class="product-card">
                        <span class="status-badge ${badgeClass}">${product.status}</span>
                        <div class="product-image-wrapper">
                            <img src="${product.img}" alt="${product.name}" class="product-image">
                        </div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-category">${product.category}</p>
                        <div class="product-price">${formatNaira(product.price)}</div>
                        <div class="product-meta">
                            <div class="rating">
                                <span class="material-symbols-rounded" style="font-size:1.1rem;">star</span>
                                ${product.rating} <span style="color:var(--text-muted); font-weight:500;">(${product.reviews})</span>
                            </div>
                            <div class="seller" style="display:flex; align-items:center; gap:4px;">
                                <span class="material-symbols-rounded" style="font-size:1rem;">person</span> ${product.seller}
                            </div>
                        </div>
                        <button class="btn-add-to-cart" onclick="addToCart(${product.id})" ${!isAvailable ? 'disabled' : ''}>
                            ${btnText}
                        </button>
                    </div>
                `;
        return card;
    });
    grid.innerHTML = cards.join("");

    const totalItemsBadge = document.getElementById('totalItemsBadge');
    totalItemsBadge.innerText = `${allProducts.length} items`;
}

function renderPagination() {
    const container = document.getElementById('pagination');
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    container.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '<span class="material-symbols-rounded">chevron_left</span>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => { currentPage--; updateUI(); };
    container.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${currentPage === i ? 'active' : ''}`;
        pageBtn.innerText = i;
        pageBtn.onclick = () => { currentPage = i; updateUI(); };
        container.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '<span class="material-symbols-rounded">chevron_right</span>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => { currentPage++; updateUI(); };
    container.appendChild(nextBtn);
}

function renderStatistics() {
    const prices = allProducts.map(p => p.price);
    const highestPrice = Math.max(...prices);
    const cheapestPrice = Math.min(...prices);
    const averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / allProducts.length);
    const availableCount = allProducts.filter(p => p.status === 'Available').length;
    const soldOutCount = allProducts.filter(p => p.status === 'Sold Out').length;

    document.getElementById('statsGrid').innerHTML = `
                <div class="stat-card bg-purple"><div class="stat-value">${allProducts.length}</div><div class="stat-label">Total Products</div></div>
                <div class="stat-card bg-green"><div class="stat-value">${formatNaira(highestPrice)}</div><div class="stat-label">Highest Price</div></div>
                <div class="stat-card bg-blue"><div class="stat-value">${formatNaira(cheapestPrice)}</div><div class="stat-label">Cheapest Price</div></div>
                <div class="stat-card bg-orange"><div class="stat-value">${formatNaira(averagePrice)}</div><div class="stat-label">Average Price</div></div>
                <div class="stat-card bg-green"><div class="stat-value">${availableCount}</div><div class="stat-label">Available</div></div>
                <div class="stat-card bg-red"><div class="stat-value">${soldOutCount}</div><div class="stat-label">Out of Stock</div></div>
            `;
    document.getElementById('quickFilterAvailable').innerText = availableCount;
}

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("search-input")
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value;
    const cleanedInput = searchValue.trim().toLowerCase()
    const filteredProducts = allProducts.filter((product) => {
        return (
            product.name.toLowerCase().includes(cleanedInput) ||
            product.category.toLowerCase().includes(cleanedInput) ||
            product.seller.toLowerCase().includes(cleanedInput)
        );
    })
    if (cleanedInput === "") {
        displayProducts(allProducts);
    } else if (!Number.isNaN(Number(cleanedInput))) {
        displayProducts(allProducts);
        return;
    } else if (filteredProducts.length === 0) {
        grid.innerHTML =
            "<p style='text-align:center; padding:20px;'>No product found 😔</p>";
    } else {
        displayProducts(filteredProducts);
    }

})

const searchInput2 = document.getElementById("search-input-2")
const categorySelect = document.getElementById("select1")
const availabilitySelect = document.getElementById("select2")
const clearButton = document.querySelector(".icon-btn")

function filterProducts() {
    const searchedtext = searchInput2.value
    const cleanedText = searchedtext.trim().toLowerCase()
    const categoryValue = categorySelect.value
    const cleanedCategory = categoryValue.trim().toLowerCase()
    const availabilityValue = availabilitySelect.value
    const cleanedAvailability = availabilityValue.trim().toLowerCase()

    const filteredProductsAndCategories = allProducts.filter((product) => {
        const nameMatches = product.name.toLowerCase().includes(cleanedText)
        const categoryMatches = product.category.toLowerCase() === cleanedCategory || cleanedCategory === "all categories"
        const availabilityMatches = product.status.toLowerCase().includes(cleanedAvailability) || cleanedAvailability.includes("all availability")
        return (
            nameMatches &&
            categoryMatches &&
            availabilityMatches
        );
    })

    // Display products
    if (cleanedText === "" && cleanedCategory.includes("all categories") && cleanedAvailability.includes("all availability")) {
        displayProducts(allProducts)
    } else if (filteredProductsAndCategories.length === 0) {
        grid.innerHTML = "<p style='text-align: center; padding:20px;'>No products found 😔</p>";
    } else {
        displayProducts(filteredProductsAndCategories);
    }
}

searchInput2.addEventListener("input", filterProducts);

categorySelect.addEventListener("change", filterProducts);

availabilitySelect.addEventListener("change", filterProducts);

const findIdButton = document.querySelector(".btn-primary")
findIdButton.addEventListener("click", () => {
    const searchValue = searchInput.value;
    const cleanedInput = searchValue.trim()
    const num = Number(cleanedInput)
    const foundProducts = allProducts.find((product) => {
        return product.id === num
    })
    if (cleanedInput === "" || Number.isNaN(num)) {
        displayProducts(allProducts)
    } else if (!foundProducts) {
        grid.innerHTML = "<p style='text-align: center; padding:20px;'>No product with that ID found 😔</p>";
    } else {
        displayProducts([foundProducts])
    }

})

function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    container.innerHTML = '';

    let totalItems = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `
                    <div style="text-align:center; color:var(--text-muted); margin-top:3rem;">
                        <span class="material-symbols-rounded" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;">shopping_basket</span>
                        <p>Your cart is empty.</p>
                    </div>`;
    }

    cart.forEach(cartItem => {
        const product = allProducts.find(p => p.id === cartItem.id);
        if (product) {
            totalItems += cartItem.quantity;
            subtotal += (product.price * cartItem.quantity);

            container.innerHTML += `
                        <div class="cart-item">
                            <div class="cart-item-img"><img src="${product.img}" alt="${product.name}"></div>
                            <div class="cart-item-info">
                                <div style="display:flex; justify-content:space-between; align-items:start;">
                                    <h4 class="cart-item-title">${product.name}</h4>
                                    <button class="btn-remove" onclick="removeFromCart(${cartItem.id})"><span class="material-symbols-rounded" style="font-size:1.2rem;">delete</span></button>
                                </div>
                                <div class="cart-item-price">${formatNaira(product.price)}</div>
                                <div class="qty-controls">
                                    <button class="qty-btn" onclick="updateQuantity(${cartItem.id}, -1)"><span class="material-symbols-rounded" style="font-size:1rem;">remove</span></button>
                                    <span class="qty-value">${cartItem.quantity}</span>
                                    <button class="qty-btn" onclick="updateQuantity(${cartItem.id}, 1)"><span class="material-symbols-rounded" style="font-size:1rem;">add</span></button>
                                </div>
                            </div>
                        </div>
                    `;
        }
    });

    document.getElementById('cartHeaderTitle').innerText = `Your Cart (${totalItems})`;
    document.getElementById('navCartBadge').innerText = totalItems;
    document.getElementById('subtotalText').innerText = `Subtotal (${totalItems} items)`;
    document.getElementById('subtotalAmount').innerText = formatNaira(subtotal);
    document.getElementById('navCartBadge').style.display = totalItems > 0 ? 'flex' : 'none';
}

window.addToCart = function (productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ id: productId, quantity: 1 });
    renderCart();
    toggleCart(true); // Open drawer for feedback
}

window.updateQuantity = function (productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) removeFromCart(productId);
        else renderCart();
    }
}

window.removeFromCart = function (productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// 4. UI Interactions (Drawers & Theme)
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const sidebar = document.getElementById('sidebar');

function toggleCart(show) {
    if (show) {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('show');
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
    } else {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('show');
    }
}

document.getElementById('openCartBtn').addEventListener('click', () => toggleCart(true));
document.getElementById('closeCartBtn').addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

document.getElementById('menuToggle').addEventListener('click', () => {
    sidebar.classList.toggle('open');
    toggleCart(false);
});

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggleBtn.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        themeIcon.innerText = 'dark_mode';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.innerText = 'light_mode';
    }
});

function updateUI() {
    displayProducts(allProducts);
    renderPagination();
}

// Initialize App
updateUI();
renderStatistics();
renderCart(); // Initialize empty cart UI