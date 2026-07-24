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

    const toolsDropdown = document.querySelector(".tools-dropdown");
    const toolsBtn = document.querySelector(".tools-btn");

    if (toolsDropdown && toolsBtn) {

        toolsBtn.addEventListener("click", (e) => {

            e.stopPropagation();
            toolsDropdown.classList.toggle("active");

        });

        document.addEventListener("click", () => {

            toolsDropdown.classList.remove("active");

        });

    }

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

    const mobileTools = document.querySelector(".mobile-tools");
    const mobileToolsBtn = document.querySelector(".mobile-tools-btn");

    if (mobileTools && mobileToolsBtn) {

        mobileToolsBtn.addEventListener("click", () => {

            mobileTools.classList.toggle("active");

        });

    }

}