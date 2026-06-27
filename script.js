const navItems = document.querySelectorAll('.nav-item');
const toast = document.getElementById('toast');
const actionBtns = document.querySelectorAll('.action-btn');
let toastTimeout;

function showToast(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Prevent action if already active
        if (item.classList.contains('active')) return;

        // Change active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show toast
        showToast('قريباً...');
    });
});

actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showToast('تمت الإضافة للسلة');
    });
});
