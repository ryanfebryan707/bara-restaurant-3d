// Data menu hidangan
const dishes = [
    {
        id: 1,
        name: 'Ribeye Panggang',
        category: 'main',
        price: 185000,
        description: 'Daging sapi premium dengan kentang rebus',
        ingredients: ['Daging Ribeye', 'Kentang', 'Mentega', 'Garam', 'Merica'],
        allergens: ['Gluten']
    },
    {
        id: 2,
        name: 'Salmon Asap',
        category: 'main',
        price: 165000,
        description: 'Salmon segar dengan saus lemon',
        ingredients: ['Salmon', 'Lemon', 'Minyak Zaitun', 'Garam'],
        allergens: ['Ikan']
    },
    {
        id: 3,
        name: 'Bruschetta Tomat',
        category: 'appetizer',
        price: 45000,
        description: 'Roti panggang dengan tomat segar dan basil',
        ingredients: ['Roti', 'Tomat', 'Basil', 'Minyak Zaitun'],
        allergens: ['Gluten']
    },
    {
        id: 4,
        name: 'Tiramisu',
        category: 'dessert',
        price: 55000,
        description: 'Kue Italia tradisional dengan mascarpone',
        ingredients: ['Telur', 'Gula', 'Mascarpone', 'Kopi', 'Kakao'],
        allergens: ['Telur', 'Susu']
    },
    {
        id: 5,
        name: 'Sup Ayam Tradisional',
        category: 'appetizer',
        price: 35000,
        description: 'Sup hangat dengan daging ayam empuk',
        ingredients: ['Ayam', 'Kaldu', 'Wortel', 'Seledri'],
        allergens: []
    },
    {
        id: 6,
        name: 'Cokelat Lava Cake',
        category: 'dessert',
        price: 48000,
        description: 'Kue cokelat hangat dengan lava center',
        ingredients: ['Cokelat', 'Mentega', 'Telur', 'Tepung'],
        allergens: ['Telur', 'Susu', 'Gluten']
    }
];

// Fungsi untuk format harga Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Fungsi untuk render menu
function renderMenu(filteredDishes = dishes) {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';

    filteredDishes.forEach(dish => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <span class="category">${getCategoryLabel(dish.category)}</span>
            <h3>${dish.name}</h3>
            <p class="description">${dish.description}</p>
            <p class="price">${formatPrice(dish.price)}</p>
        `;
        menuItem.addEventListener('click', () => showDishDetail(dish));
        menuList.appendChild(menuItem);
    });
}

// Fungsi untuk mendapatkan label kategori
function getCategoryLabel(category) {
    const labels = {
        'appetizer': 'Pembuka',
        'main': 'Hidangan Utama',
        'dessert': 'Penutup'
    };
    return labels[category] || category;
}

// Fungsi untuk menampilkan detail hidangan
function showDishDetail(dish) {
    const detailDiv = document.getElementById('dish-detail');
    detailDiv.innerHTML = `
        <h3>${dish.name}</h3>
        <div class="detail-item">
            <div class="detail-label">Kategori:</div>
            <div class="detail-value">${getCategoryLabel(dish.category)}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Harga:</div>
            <div class="detail-value">${formatPrice(dish.price)}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Deskripsi:</div>
            <div class="detail-value">${dish.description}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Bahan-bahan:</div>
            <div class="detail-value">${dish.ingredients.join(', ')}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Alergen:</div>
            <div class="detail-value">${dish.allergens.length > 0 ? dish.allergens.join(', ') : 'Tidak ada alergen yang diketahui'}</div>
        </div>
    `;
}

// Fungsi untuk filter kategori
function filterByCategory(category) {
    if (category === 'all') {
        renderMenu(dishes);
    } else {
        const filtered = dishes.filter(dish => dish.category === category);
        renderMenu(filtered);
    }
}

// Event listener untuk filter
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    
    const filterSelect = document.getElementById('category-filter');
    filterSelect.addEventListener('change', (e) => {
        filterByCategory(e.target.value);
    });
});