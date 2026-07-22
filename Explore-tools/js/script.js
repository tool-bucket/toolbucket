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


const revealElements = document.querySelectorAll(
".tool-card, .category-card, .feature-card"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(item=>observer.observe(item));

const current = window.location.pathname;

document.querySelectorAll(".nav-links a").forEach(link=>{

if(link.getAttribute("href")==current){

link.classList.add("active");

}

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

