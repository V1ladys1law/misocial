const burgers = document.querySelectorAll(".burger");
const navs = document.querySelectorAll(".navigation");
const overlay = document.querySelector(".overlay");
const x = document.querySelector(".x");

function closeMenu() {
    navs.forEach(nav => nav.classList.remove("active"));
    overlay.classList.remove("active");
    if (x) x.classList.remove("active");
}

burgers.forEach((burger, i) => {
    burger.addEventListener("click", () => {
        if (navs[i]) navs[i].classList.toggle("active");
        overlay.classList.toggle("active");
        if (x) x.classList.toggle("active");
    });
});

overlay.addEventListener("click", closeMenu);
if (x) {
    x.addEventListener("click", closeMenu);
}