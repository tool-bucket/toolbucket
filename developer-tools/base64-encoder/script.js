const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const inputCount = document.getElementById("inputCount");
const outputCount = document.getElementById("outputCount");


inputText.addEventListener("input", () => {
    inputCount.textContent = `${inputText.value.length} Characters`;
});


encodeBtn.addEventListener("click", () => {

    if(inputText.value.trim() === ""){
        alert("Please enter some text.");
        return;
    }

    outputText.value = btoa(inputText.value);

    outputCount.textContent =
        `${outputText.value.length} Characters`;

});


decodeBtn.addEventListener("click", () => {

    if(inputText.value.trim() === ""){
        alert("Please enter Base64 text.");
        return;
    }

    try{

        outputText.value = atob(inputText.value);

        outputCount.textContent =
        `${outputText.value.length} Characters`;

    }

    catch{

        alert("Invalid Base64!");

    }

});


copyBtn.addEventListener("click", () => {

    if(outputText.value === ""){
        return;
    }

    navigator.clipboard.writeText(outputText.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {

        copyBtn.textContent = "Copy";

    },2000);

});



clearBtn.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";

    inputCount.textContent = "0 Characters";
    outputCount.textContent = "0 Characters";

});


const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {

    faq.querySelector(".faq-question").addEventListener("click", () => {

        faqs.forEach(item => {

            if(item !== faq){
                item.classList.remove("active");
            }

        });

        faq.classList.toggle("active");

    });

});