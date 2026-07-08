import './assets/styles/style.sass'

const burgers = document.querySelectorAll(".burger");
const navs = document.querySelectorAll(".navigation");
const overlay = document.querySelector(".overlay");

burgers.forEach((burger, i) => {
    burger.addEventListener("click", () => {
        navs[i].classList.toggle("active");
        overlay.classList.toggle("active");
    });
});

overlay.addEventListener("click", () => {
    navs.forEach(nav => nav.classList.remove("active"));
    overlay.classList.remove("active");
});