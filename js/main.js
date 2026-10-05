document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const widthInput = document.getElementById("width");
    const heightInput = document.getElementById("height");
    const sizeButtons = document.querySelectorAll(".size-btn");
    const checkboxes = document.querySelectorAll(".option-checkbox");
    const totalPriceElement = document.getElementById("total-price");

    const BASE_PRICE = 300; 

    function updateCanvasSize(w, h) {
        w = Math.max(10, Math.min(w, 300));
        h = Math.max(10, Math.min(h, 300));

        widthInput.value = w;
        heightInput.value = h;

       
        canvas.style.width = `${w * 4}px`;
        canvas.style.height = `${h * 4}px`;

        calculatePrice(w, h);
    }

    function calculatePrice(w, h) {
        let areaCoefficient = (w * h + 100) / 100;
        let calculatedPrice = Math.round(BASE_PRICE + areaCoefficient * 0.5);

        checkboxes.forEach(cb => {
            if (cb.checked) {
                calculatedPrice += parseInt(cb.dataset.price || 0);
            }
        });

        totalPriceElement.textContent = calculatedPrice;
    }

    sizeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            sizeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const w = parseInt(btn.dataset.w);
            const h = parseInt(btn.dataset.h);
            updateCanvasSize(w, h);
        });
    });

    widthInput.addEventListener("input", () => {
        sizeButtons.forEach(b => b.classList.remove("active"));
        updateCanvasSize(parseInt(widthInput.value) || 10, parseInt(heightInput.value) || 10);
    });

    heightInput.addEventListener("input", () => {
        sizeButtons.forEach(b => b.classList.remove("active"));
        updateCanvasSize(parseInt(widthInput.value) || 10, parseInt(heightInput.value) || 10);
    });

    checkboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            calculatePrice(parseInt(widthInput.value) || 30, parseInt(heightInput.value) || 30);
        });
    });

    // Ініціалізація початкового стану
    updateCanvasSize(30, 30);
});