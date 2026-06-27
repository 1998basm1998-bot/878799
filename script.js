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

    // Show toast
    showToast("قريباً...");
  });
});

actionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    showToast("تمت الإضافة للسلة");
  });
});

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
