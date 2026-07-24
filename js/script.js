// =========================
// Swiper
// =========================

const swiper = new Swiper(".toolsSwiper", {

    loop: true,
    speed: 700,
    spaceBetween: 25,
    grabCursor: true,
    centeredSlides: false,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    keyboard: {
        enabled: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 4,
        }
    }

});

// =========================
// FAQ
// =========================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        const isOpen = answer.style.maxHeight;

        faqQuestions.forEach((item) => {

            item.nextElementSibling.style.maxHeight = null;
            item.querySelector("span").textContent = "+";

        });

        if (!isOpen) {

            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "-";

        }

    });

});