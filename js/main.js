
const WHATSAPP_NUMBER = "8801700000000";

const menuData = [
    { id: 1, name: "Margherita Classic", price: 699, category: "pizza", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500", desc: "Fresh basil, mozzarella, and wood-fired tomato sauce." },
    { id: 2, name: "Smoky Pepperoni", price: 849, category: "pizza", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500", desc: "Charred pepperoni slices with spicy honey drizzle." },
    { id: 3, name: "Peri Peri Chicken Pasta", price: 499, category: "pasta", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500", desc: "Creamy pasta with flame-grilled chicken chunks." },
    { id: 4, name: "Inferno Combo", price: 1299, category: "combos", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", desc: "1 Med Pizza + 1 Spicy Pasta + 2 Cokes." },
    { id: 5, name: "Truffle Mushroom", price: 899, category: "pizza", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500", desc: "Earthly mushrooms with truffle oil and smoked cheese." },
    { id: 6, name: "Meat Lovers Platter", price: 1599, category: "combos", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500", desc: "Sausages, Pepperoni, and Beef pizza strips." }
];

let cart = [];

function renderMenu(items) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = items.map(item => `
                <div class="menu-card rounded-3xl overflow-hidden animate-bounce-in">
                    <img src="${item.img}" class="w-full h-52 object-cover" alt="${item.name}">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-white">${item.name}</h3>
                            <span class="text-brand-fire font-bold">৳${item.price}</span>
                        </div>
                        <p class="text-gray-500 text-sm mb-6 h-10 overflow-hidden">${item.desc}</p>
                        <div class="flex gap-2">
                            <button onclick="addToCart(${item.id})" class="flex-grow fire-btn text-white py-2 rounded-lg text-sm font-bold transition">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `).join('');
}

function filterMenu(category, btn) {
    document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.remove('bg-brand-fire', 'text-white', 'border-brand-fire');
        b.classList.add('border-white/20', 'text-white/70');
    });
    btn.classList.add('bg-brand-fire', 'text-white', 'border-brand-fire');
    btn.classList.remove('border-white/20', 'text-white/70');

    const filtered = category === 'all' ? menuData : menuData.filter(i => i.category === category);
    renderMenu(filtered);
}

function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...item, qty: 1 });
    updateCartUI();
    showCartToast(item.name);
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-count').classList.toggle('hidden', count === 0);
    document.getElementById('cart-total').innerText = `৳${total}`;

    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        document.getElementById('empty-cart-msg').style.display = 'block';
        container.innerHTML = '';
    } else {
        document.getElementById('empty-cart-msg').style.display = 'none';
        container.innerHTML = cart.map(item => `
                    <div class="flex items-center gap-4 bg-[#252525] p-3 rounded-xl border border-white/5">
                        <img src="${item.img}" class="w-16 h-16 rounded-lg object-cover">
                        <div class="flex-grow">
                            <h4 class="font-bold text-sm text-white">${item.name}</h4>
                            <p class="text-xs text-brand-fire">৳${item.price} x ${item.qty}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 rounded bg-[#333] flex items-center justify-center">-</button>
                            <span class="text-sm font-bold text-white">${item.qty}</span>
                            <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 rounded bg-[#333] flex items-center justify-center">+</button>
                        </div>
                    </div>
                `).join('');
    }
}

function changeQty(id, delta) {
    const index = cart.findIndex(i => i.id === id);
    if (index > -1) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) cart.splice(index, 1);
    }
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('translate-x-full');
}

function checkout() {
    if (cart.length === 0) return;
    let message = "🔥 *Fired Up Order from The Eatalia*\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (x${item.qty}) - ৳${item.price * item.qty}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    message += `\n💰 *Total: ৳${total}*\n\nI'm waiting for that wood-fired taste!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}

function showCartToast(name) {
    const toast = document.createElement('div');
    toast.className = "fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-brand-fire text-white px-6 py-3 rounded-full z-[110] animate-bounce-in shadow-2xl font-bold";
    toast.innerHTML = `<i class="fa-solid fa-fire mr-2"></i> ${name} added!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = `📅 *Booking Request*\nName: ${document.getElementById('book-name').value}\nGuests: ${document.getElementById('book-guests').value}\nTime: ${document.getElementById('book-time').value}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
});

window.onload = () => renderMenu(menuData);
