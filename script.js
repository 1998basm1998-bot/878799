const card = document.getElementById('card');
const container = document.querySelector('.container');

container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

container.addEventListener('mouseenter', (e) => {
    card.style.transition = 'none';
});

container.addEventListener('mouseleave', (e) => {
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

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
