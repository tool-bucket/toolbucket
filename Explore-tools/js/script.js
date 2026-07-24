

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

