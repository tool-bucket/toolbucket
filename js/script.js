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


let lastScroll = 0;

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    if(currentScroll > lastScroll){

        // Scroll Down
        header.classList.add("hide");

    }else{

        // Scroll Up
        header.classList.remove("hide");

    }

    lastScroll = currentScroll;

});



// =========================
// F and Q
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



// =========================
// Tools Dropdown
// =========================

const toolsDropdown = document.querySelector(".tools-dropdown");

const toolsBtn = document.querySelector(".tools-btn");

toolsBtn.addEventListener("click", (e)=>{

    e.stopPropagation();

    toolsDropdown.classList.toggle("active");

});

document.addEventListener("click", ()=>{

    toolsDropdown.classList.remove("active");

});



/* =========================
      Mobile Menu
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

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


/* =========================
    Mobile Dropdown
========================= */

const mobileTools = document.querySelector(".mobile-tools");
const mobileToolsBtn = document.querySelector(".mobile-tools-btn");

mobileToolsBtn.addEventListener("click", () => {

    mobileTools.classList.toggle("active");

});
