"use strict";

// All menu information is kept locally. No personal data or orders are sent.
const dishes = {
  ribeye: { name: "Signature Ribeye", category: "Dari panggangan", price: 189000, image: "assets/steak.webp", alt: "Ribeye panggang dengan kentang, rosemary, dan saus", description: "Ribeye dipanggang di atas bara untuk menghasilkan permukaan beraroma smokey dan bagian dalam yang lembut. Disajikan dengan kentang panggang dan saus lada hitam.", ingredients: "Daging sapi ribeye, kentang, rosemary, mentega, bawang putih, lada hitam, dan kaldu.", allergens: "Mengandung susu (mentega). Komposisi saus perlu dikonfirmasi kembali untuk pengunjung dengan alergi." },
  chicken: { name: "Charcoal Chicken", category: "Dari panggangan", price: 89000, image: "assets/chicken.webp", alt: "Ayam panggang arang dengan kentang dan sayuran hijau", description: "Ayam berbumbu dipanggang perlahan sampai kulitnya keemasan. Aroma bara bertemu kentang panggang dan sayuran hijau yang segar.", ingredients: "Ayam, kentang, bawang putih, paprika, lada, minyak zaitun, dan sayuran hijau.", allergens: "Resep contoh tidak menggunakan susu, telur, atau gandum. Potensi kontak silang tetap perlu dikonfirmasi sebelum konsumsi." },
  cheesecake: { name: "Basque Cheesecake", category: "Penutup", price: 48000, image: "assets/cheesecake.webp", alt: "Basque cheesecake dengan saus berry di piring keramik", description: "Cheesecake dengan permukaan karamel dan bagian tengah yang lembut. Saus berry memberi sentuhan asam segar untuk menutup hidangan.", ingredients: "Cream cheese, krim, telur, gula, tepung terigu, vanila, dan buah berry.", allergens: "Mengandung susu, telur, dan gandum (gluten)." },
  soup: { name: "Creamy Mushroom Soup", category: "Pendamping", price: 38000, description: "Sup jamur hangat dengan tekstur lembut dan aroma thyme. Disajikan dengan roti panggang untuk menemani satu suapan berikutnya.", ingredients: "Jamur, kaldu sayuran, krim, mentega, bawang bombai, thyme, dan roti gandum.", allergens: "Mengandung susu dan gandum (gluten)." },
  rice: { name: "Garlic Butter Rice", category: "Pendamping", price: 22000, description: "Nasi hangat dengan mentega dan bawang putih. Pendamping sederhana untuk rasa panggangan yang kuat.", ingredients: "Nasi, mentega, bawang putih, peterseli, dan garam.", allergens: "Mengandung susu (mentega)." },
  vegetables: { name: "Roasted Garden Vegetables", category: "Pendamping", price: 30000, description: "Sayuran dipanggang hingga sedikit karamel, lalu diberi minyak zaitun dan herbs. Pilihan ringan yang tetap penuh rasa.", ingredients: "Wortel, zucchini, paprika, brokoli, minyak zaitun, thyme, dan garam.", allergens: "Resep contoh tidak menggunakan susu, telur, atau gandum. Potensi kontak silang perlu dikonfirmasi sebelum konsumsi." },
  lychee: { name: "Lychee Iced Tea", category: "Minuman", price: 28000, description: "Teh melati dingin dengan leci dan es. Segar, ringan, dan cocok menemani hidangan panggang.", ingredients: "Teh melati, buah leci, sirup leci, air, dan es batu.", allergens: "Mengandung buah leci. Bahan sirup dan potensi kontak silang perlu dikonfirmasi untuk alergi tertentu." },
  citrus: { name: "Citrus Sparkler", category: "Minuman", price: 32000, description: "Lemon dan jeruk bertemu soda dingin dengan aroma daun mint. Rasa asam segar untuk menyeimbangkan hidangan utama.", ingredients: "Lemon, jeruk, soda, sirup gula, mint, dan es batu.", allergens: "Mengandung buah sitrus. Potensi kontak silang perlu dikonfirmasi untuk alergi tertentu." },
  coffee: { name: "House Cold Brew", category: "Minuman", price: 30000, description: "Kopi yang diseduh dingin untuk rasa yang bersih, halus, dan berkarakter. Disajikan tanpa susu.", ingredients: "Biji kopi, air, dan es batu. Mengandung kafein.", allergens: "Resep contoh tidak menggunakan susu. Penambahan susu akan mengubah informasi alergen." }
};
const currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation, including keyboard dismissal and a desktop reset.
const navToggle = document.querySelector(".nav-toggle");
const navigation = document.getElementById("main-nav");
function closeNavigation(restoreFocus = false) {
  navigation.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Buka navigasi");
  if (restoreFocus) navToggle.focus();
}
navToggle.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup navigasi" : "Buka navigasi");
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeNavigation()));
document.addEventListener("click", event => { if (!event.target.closest(".site-header")) closeNavigation(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && navigation.classList.contains("is-open")) closeNavigation(true); });
window.matchMedia("(min-width: 701px)").addEventListener("change", event => { if (event.matches) closeNavigation(); });
if ("IntersectionObserver" in window) {
  const sections = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigation.querySelectorAll("a").forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
  document.querySelectorAll("#beranda, #menu, #cerita, #faq").forEach(section => sections.observe(section));
}

// Menu filtering preserves the source HTML, so all content works without JS.
const filters = [...document.querySelectorAll("[data-filter]")];
const menuItems = [...document.querySelectorAll(".menu-card, .menu-row")];
filters.forEach(button => button.addEventListener("click", () => {
  const category = button.dataset.filter;
  filters.forEach(filter => { const active = filter === button; filter.classList.toggle("is-active", active); filter.setAttribute("aria-pressed", String(active)); });
  let count = 0;
  menuItems.forEach(item => { item.hidden = category !== "all" && item.dataset.category !== category; if (!item.hidden) count++; });
  ["signature-grid", "menu-list"].forEach(id => { const group = document.getElementById(id); group.hidden = [...group.children].every(item => item.hidden); });
  document.getElementById("menu-count").textContent = `${count} hidangan`;
}));

// Native dialog supplies focus trapping and Escape support.
const dialog = document.getElementById("dish-dialog");
let dialogTrigger;
document.querySelectorAll("[data-detail]").forEach(button => button.addEventListener("click", () => {
  const dish = dishes[button.dataset.detail];
  if (!dish) return;
  dialogTrigger = button;
  document.getElementById("dialog-title").textContent = dish.name;
  document.getElementById("dialog-category").textContent = dish.category;
  document.getElementById("dialog-price").textContent = currency.format(dish.price);
  document.getElementById("dialog-description").textContent = dish.description;
  document.getElementById("dialog-ingredients").textContent = dish.ingredients;
  document.getElementById("dialog-allergens").textContent = dish.allergens;
  const image = document.getElementById("dialog-image");
  document.getElementById("dialog-image-wrap").hidden = !dish.image;
  dialog.classList.toggle("text-only", !dish.image);
  if (dish.image) { image.src = dish.image; image.alt = dish.alt; }
  else { image.removeAttribute("src"); image.alt = ""; }
  dialog.showModal();
  document.body.classList.add("dialog-open");
}));
dialog.querySelectorAll(".dialog-close, .dialog-done").forEach(button => button.addEventListener("click", () => dialog.close()));
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener("close", () => { document.body.classList.remove("dialog-open"); dialogTrigger?.focus({ preventScroll: true }); });

// 3D image layers use CSS perspective, with no heavyweight rendering engine.
const stage = document.getElementById("dish-stage");
const tilt = document.getElementById("dish-tilt");
const motionButton = document.getElementById("motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let paused = reducedMotion.matches;
let explicitMotionPreference = false;
try { const preference = sessionStorage.getItem("bara-motion-paused"); if (preference !== null) { paused = preference === "true"; explicitMotionPreference = true; } } catch { /* storage may be disabled */ }
let rotationX = 11, rotationY = -9;
function renderTilt(x = rotationX, y = rotationY) { tilt.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(-13deg)`; }
function resetTilt() { rotationX = 11; rotationY = -9; renderTilt(); }
function updateMotion() {
  document.body.classList.toggle("motion-paused", paused);
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.setAttribute("aria-label", paused ? "Aktifkan animasi 3D" : "Matikan animasi 3D");
  motionButton.querySelector("span").textContent = paused ? "3D dijeda" : "3D aktif";
  resetTilt();
}
updateMotion();
motionButton.addEventListener("click", () => { paused = !paused; explicitMotionPreference = true; try { sessionStorage.setItem("bara-motion-paused", String(paused)); } catch { /* optional preference */ } updateMotion(); });
reducedMotion.addEventListener("change", event => { if (!explicitMotionPreference) { paused = event.matches; updateMotion(); } });
stage.addEventListener("pointermove", event => {
  if (paused || (event.pointerType === "touch" && event.buttons === 0)) return;
  const rect = stage.getBoundingClientRect();
  rotationX = Math.max(-10, Math.min(24, 11 - (event.clientY - rect.top - rect.height / 2) / rect.height * 24));
  rotationY = Math.max(-25, Math.min(20, -9 + (event.clientX - rect.left - rect.width / 2) / rect.width * 32));
  renderTilt();
});
stage.addEventListener("pointerleave", resetTilt);
stage.addEventListener("pointerup", event => { if (event.pointerType !== "mouse") resetTilt(); });
stage.addEventListener("pointercancel", resetTilt);
stage.addEventListener("blur", resetTilt);
stage.addEventListener("keydown", event => {
  if (paused) return;
  const changes = { ArrowLeft: [0, -4], ArrowRight: [0, 4], ArrowUp: [4, 0], ArrowDown: [-4, 0] };
  if (!changes[event.key]) return;
  event.preventDefault();
  rotationX = Math.max(-10, Math.min(24, rotationX + changes[event.key][0]));
  rotationY = Math.max(-25, Math.min(20, rotationY + changes[event.key][1]));
  renderTilt();
});
document.querySelectorAll("[data-tilt]").forEach(card => {
  const image = card.querySelector("img");
  card.addEventListener("pointermove", event => { if (paused || event.pointerType !== "mouse") return; const rect = card.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; image.style.transform = `rotateX(${-y * 16}deg) rotateY(${x * 16}deg) rotateZ(-11deg) translateZ(18px)`; });
  card.addEventListener("pointerleave", () => { image.style.transform = ""; });
  motionButton.addEventListener("click", () => { image.style.transform = ""; });
});

// Selector waits for an image to decode before replacing the existing dish.
const slides = [dishes.ribeye, dishes.chicken, dishes.cheesecake];
let slideRequest = 0;
const heroImage = document.getElementById("hero-dish");
document.querySelectorAll("[data-slide]").forEach(button => button.addEventListener("click", async () => {
  const currentRequest = ++slideRequest;
  const index = Number(button.dataset.slide), dish = slides[index];
  const preload = new Image();
  preload.src = dish.image;
  try { await preload.decode(); } catch { return; }
  if (currentRequest !== slideRequest) return;
  heroImage.src = dish.image;
  heroImage.alt = dish.alt;
  document.getElementById("hero-name").textContent = dish.name;
  document.getElementById("hero-category").textContent = `0${index + 1} — ${dish.category.toLocaleUpperCase("id-ID")}`;
  document.querySelector(".slide-index").textContent = `0${index + 1} / 03`;
  document.querySelectorAll("[data-slide]").forEach(selector => { const selected = selector === button; selector.classList.toggle("selected", selected); selector.setAttribute("aria-pressed", String(selected)); });
  resetTilt();
}));
