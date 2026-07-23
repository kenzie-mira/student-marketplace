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

const itemsPerPage = 8;
let currentPage = 1;

const formatNaira = (amount) => '₦' + amount.toLocaleString();

function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = allProducts.slice(startIndex, startIndex + itemsPerPage);

    paginatedItems.forEach(product => {
        const badgeClass = product.status === 'Available' ? 'status-available' : 'status-soldout';
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
                    </div>
                `;
        grid.innerHTML += card;
    });

    document.getElementById('totalItemsBadge').innerText = `${allProducts.length} items`;
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
    const totalProducts = allProducts.length;
    const highestPrice = Math.max(...prices);
    const cheapestPrice = Math.min(...prices);
    const averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / totalProducts);
    const availableCount = allProducts.filter(p => p.status === 'Available').length;
    const soldOutCount = allProducts.filter(p => p.status === 'Sold Out').length;

    const statsHtml = `
                <div class="stat-card bg-purple">
                    <div class="stat-value">${totalProducts}</div>
                    <div class="stat-label">Total Products</div>
                </div>
                <div class="stat-card bg-green">
                    <div class="stat-value">${formatNaira(highestPrice)}</div>
                    <div class="stat-label">Highest Price</div>
                </div>
                <div class="stat-card bg-blue">
                    <div class="stat-value">${formatNaira(cheapestPrice)}</div>
                    <div class="stat-label">Cheapest Price</div>
                </div>
                <div class="stat-card bg-orange">
                    <div class="stat-value">${formatNaira(averagePrice)}</div>
                    <div class="stat-label">Average Price</div>
                </div>
                <div class="stat-card bg-green">
                    <div class="stat-value">${availableCount}</div>
                    <div class="stat-label">Available</div>
                </div>
                <div class="stat-card bg-red">
                    <div class="stat-value">${soldOutCount}</div>
                    <div class="stat-label">Out of Stock</div>
                </div>
            `;

    document.getElementById('statsGrid').innerHTML = statsHtml;
    document.getElementById('quickFilterAvailable').innerText = availableCount;
}

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeIcon.innerText = 'dark_mode';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.innerText = 'light_mode';
    }
});

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

function updateUI() {
    renderProducts();
    renderPagination();
}

updateUI();
renderStatistics();