function initNavbar() {

    // =========================
    // Header Hide on Scroll
    // =========================

    let lastScroll = 0;
    const header = document.querySelector("header");

    if (header) {

        window.addEventListener("scroll", () => {

            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll) {
                header.classList.add("hide");
            } else {
                header.classList.remove("hide");
            }

            lastScroll = currentScroll;

        });

    }

// =========================
// Tools Dropdown
// =========================

const dropdowns = document.querySelectorAll(".tools-dropdown");

dropdowns.forEach(dropdown => {

    const btn = dropdown.querySelector(".tools-btn");

    btn.addEventListener("click", (e) => {

        e.stopPropagation();

        // Dusre dropdown close karo
        dropdowns.forEach(item => {
            if (item !== dropdown) {
                item.classList.remove("active");
            }
        });

        // Current toggle
        dropdown.classList.toggle("active");

    });

});

document.addEventListener("click", () => {

    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
    });

});

    // =========================
    // Mobile Menu
    // =========================

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".overlay");

    if (menuToggle && mobileMenu && overlay) {

        menuToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");
            overlay.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

        overlay.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    }

    // =========================
    // Mobile Dropdown
    // =========================

   const mobileDropdowns = document.querySelectorAll(".mobile-tools");

mobileDropdowns.forEach(dropdown => {

    const btn = dropdown.querySelector(".mobile-tools-btn");

    btn.addEventListener("click", () => {

        dropdown.classList.toggle("active");

    });

});

 

}
