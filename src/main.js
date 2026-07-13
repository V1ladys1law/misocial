const burgers = document.querySelectorAll(".burger");
const navs = document.querySelectorAll(".navigation");
const overlay = document.querySelector(".overlay");
const x = document.querySelectorAll(".x");

function closeMenu() {
    navs.forEach(nav => nav.classList.remove("active"));
    overlay.classList.remove("active");
    x.forEach(item => item.classList.remove("active"));
}
burgers.forEach((burger, i) => {
    burger.addEventListener("click", () => {
        if (navs[i]) navs[i].classList.toggle("active");
        overlay.classList.toggle("active");
        if (x[i]) x[i].classList.toggle("active");
    });
});
overlay.addEventListener("click", closeMenu);
x.forEach((item) => {
    item.addEventListener("click", closeMenu);
});