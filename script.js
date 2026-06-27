const navItems = document.querySelectorAll('.nav-item');
const toast = document.getElementById('toast');
let toastTimeout;

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show toast
        clearTimeout(toastTimeout);
        toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    });
});
