
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
// Image Upload
// =========================


const compressBtn = document.getElementById("compressBtn");
const resultBox = document.querySelector(".result-box");

const originalSize = document.getElementById("originalSize");
const compressedSize = document.getElementById("compressedSize");
const savedPercent = document.getElementById("savedPercent");

const qualityBox = document.querySelector(".quality-box");

let selectedFile = null;
let compressedBlob = null;
let outputFormat = "image/jpeg";



const imageInput = document.getElementById("imageInput");
const selectBtn = document.getElementById("selectBtn");
const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const uploadBox = document.querySelector(".upload-box");

const qualityRange = document.getElementById("qualityRange");
const qualityValue = document.getElementById("qualityValue");

// -------------------------
// Function
// -------------------------



function formatFileSize(bytes) {

    if (bytes < 1024 * 1024) {

        return Math.round(bytes / 1024) + " KB";

    }

    return (bytes / 1024 / 1024).toFixed(2) + " MB";

}




function showImage(file) {

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert("Please select a valid image.");
        return;

    }

    selectedFile = file;

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;
    previewImage.style.display = "block";

    fileName.textContent = file.name;

    fileSize.textContent = formatFileSize(file.size);

    qualityBox.style.display = "block";

    resultBox.style.display = "none";

    document.querySelector(".format-box").style.display = "block";

}

// -------------------------
// Select Button
// -------------------------

selectBtn.addEventListener("click", () => {

    imageInput.click();

});

// -------------------------
// File Input
// -------------------------

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    showImage(file);

});

// -------------------------
// Drag Over
// -------------------------

uploadBox.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadBox.classList.add("drag");

});

// -------------------------
// Drag Leave
// -------------------------

uploadBox.addEventListener("dragleave", () => {

    uploadBox.classList.remove("drag");

});

// -------------------------
// Drop
// -------------------------

uploadBox.addEventListener("drop", (event) => {

    event.preventDefault();

    uploadBox.classList.remove("drag");

    const file = event.dataTransfer.files[0];

    showImage(file);

});

qualityRange.addEventListener("input", () => {

    qualityValue.textContent =
        qualityRange.value + "%";

});





compressBtn.addEventListener("click", () => {

    if (!selectedFile) {

        alert("Please upload an image first.");

        return;

    }

    compressImage();

});





function compressImage() {

    const img = new Image();

    img.src = URL.createObjectURL(selectedFile);

    img.onload = () => {

        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const quality = qualityRange.value / 100;

        // Original image type
        outputFormat =
        document.querySelector(
          'input[name="format"]:checked'
           ).value;

        canvas.toBlob(

            (blob) => {

                compressedBlob = blob;

                showResult(blob);

            },

            outputFormat,

            quality

        );

    };

}




function showResult(blob) {

    resultBox.style.display = "block";

    const original = selectedFile.size;

    const compressed = blob.size;

    const saved =
        ((original - compressed) / original * 100).toFixed(1);

originalSize.textContent =
    formatFileSize(original);

compressedSize.textContent =
    formatFileSize(compressed);

    if(compressed > original){

    savedPercent.textContent =
    "Already Optimized";

}else{

    savedPercent.textContent =
    saved + "%";

}

}


downloadBtn.addEventListener("click", (e) => {

    e.preventDefault();

    if (!compressedBlob) return;

    const url = URL.createObjectURL(compressedBlob);

    const a = document.createElement("a");

    const extension = outputFormat.split("/")[1];

    a.href = url;

    a.download =
        selectedFile.name.replace(/\.[^/.]+$/, "") +
        "-compressed." +
        extension;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

});












          const formatCards =
document.querySelectorAll(".format-card");

const formatInputs =
document.querySelectorAll('input[name="format"]');

formatInputs.forEach((input,index)=>{

    input.addEventListener("change",()=>{

        formatCards.forEach(card=>{

            card.classList.remove("active");

        });

        formatCards[index].classList.add("active");

    });

});









// =========================
// Mobile Menu
// =========================

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

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