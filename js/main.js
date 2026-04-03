
const WHATSAPP_NUMBER = "8801312059051";

// Universal function: customer requests full menu -> owner sends via WhatsApp
function requestFullMenuWhatsApp() {
    const message = "🍕🔥 Hello The Eatalia! Please share your complete wood-fired menu with prices & today's special offers. I'm ready to order!";
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`, '_blank');
}

// Attach event listeners to all relevant buttons
document.getElementById('heroMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    requestFullMenuWhatsApp();
});
document.getElementById('navMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    requestFullMenuWhatsApp();
});
document.getElementById('whatsappStickyBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    requestFullMenuWhatsApp();
});

// Also any "Claim Deal" or "Order Now" buttons inside offers already have onclick inline, so they work.

// Table booking form submission (WhatsApp)
document.getElementById('booking-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value.trim();
    const guests = document.getElementById('book-guests').value;
    const time = document.getElementById('book-time').value;
    if (!name || !time) {
        alert("Please enter your name and preferred time.");
        return;
    }
    const msg = `📅 *Table Booking Request - The Eatalia*%0A*Name:* ${name}%0A*Guests:* ${guests}%0A*Time:* ${time}%0A*Outlet:* GEC Circle, Chittagong`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
});

// Smooth scroll for anchor links (without interfering with WhatsApp buttons)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.id === 'heroMenuBtn' || anchor.id === 'navMenuBtn' || anchor.id === 'whatsappStickyBtn') return;
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        if (targetId && (targetId === '#featured' || targetId === '#offers' || targetId === '#booking' || targetId === '#gallery')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
