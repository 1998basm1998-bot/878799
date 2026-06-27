const navItems = document.querySelectorAll(".nav-item");
const toast = document.getElementById("toast");
const actionBtns = document.querySelectorAll(".action-btn");
let toastTimeout;

function showToast(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // Prevent action if already active
    if (item.classList.contains("active")) return;

    // Change active state
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    // Handle sections
    const targetId = item.getAttribute("data-target");
    if (targetId) {
      document.querySelectorAll(".page-section").forEach((sec) => {
        sec.classList.remove("active");
      });
      document.getElementById(targetId).classList.add("active");
    }
  });
});

let cart = [];
const cartBadge = document.getElementById("cart-badge");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartTotalPrice = document.getElementById("cart-total-price");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

function updateCartUI() {
  // Update Badge
  cartBadge.textContent = cart.length;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-msg">السلة فارغة حالياً</p>';
    cartTotal.style.display = "none";
    return;
  }
  
  cartTotal.style.display = "block";
  cartItemsContainer.innerHTML = "";
  let total = 0;
  
  cart.forEach((item, index) => {
    total += parseInt(item.price);
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <span class="price">${parseInt(item.price).toLocaleString()} د.ع</span>
      </div>
      <button class="cart-item-remove" data-index="${index}">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  
  cartTotalPrice.textContent = total.toLocaleString();
  
  // Attach remove events
  document.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.getAttribute("data-index"));
      cart.splice(index, 1);
      updateCartUI();
      showToast("تم الحذف من السلة");
    });
  });
}

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const name = btn.getAttribute("data-name");
    const price = btn.getAttribute("data-price");
    const img = btn.getAttribute("data-img");
    
    cart.push({ name, price, img });
    updateCartUI();
    showToast("تمت الإضافة للسلة");
  });
});

const checkoutBtn = document.querySelector(".checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    showToast("تم إرسال الطلب بنجاح");
    cart = [];
    updateCartUI();
  });
}

// Banner Slider Logic
setInterval(() => {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  let activeIdx = -1;
  slides.forEach((s, i) => {
    if (s.classList.contains("active")) activeIdx = i;
  });
  if (activeIdx === -1) activeIdx = 0;

  const nextIdx = (activeIdx + 1) % slides.length;

  // Move current to the right (prev)
  slides[activeIdx].className = "slide prev";

  // Move next from left (-100%) to center (0)
  slides[nextIdx].className = "slide active";

  // Reset all other slides to the left side (-100%) without transition
  slides.forEach((s, i) => {
    if (i !== activeIdx && i !== nextIdx) {
      s.style.transition = "none";
      s.className = "slide next";
      void s.offsetWidth; // Force reflow
      s.style.transition = "";
    }
  });
}, 4000);
