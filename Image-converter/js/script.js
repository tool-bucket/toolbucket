

// ===========================
// Elements
// ===========================

const fileInput = document.getElementById("fileInput");
const selectBtn = document.getElementById("selectBtn");
const uploadArea = document.getElementById("uploadArea");

const previewImage = document.getElementById("previewImage");
const placeholder = document.getElementById("placeholder");

const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const fileFormat = document.getElementById("fileFormat");
const dimensions = document.getElementById("dimensions");

// ===========================
// Select Button
// ===========================

selectBtn.addEventListener("click", () => {
    fileInput.click();
});

// ===========================
// File Change
// ===========================

fileInput.addEventListener("change", () => {

    if(fileInput.files.length){
        loadImage(fileInput.files[0]);
    }

});

// ===========================
// Drag & Drop
// ===========================

uploadArea.addEventListener("dragover",(e)=>{

    e.preventDefault();
    uploadArea.style.borderColor="#3B82F6";

});

uploadArea.addEventListener("dragleave",()=>{

    uploadArea.style.borderColor="rgba(59,130,246,.35)";

});

uploadArea.addEventListener("drop",(e)=>{

    e.preventDefault();

    uploadArea.style.borderColor="rgba(59,130,246,.35)";

    if(e.dataTransfer.files.length){

        fileInput.files=e.dataTransfer.files;

        loadImage(e.dataTransfer.files[0]);

    }

});

// ===========================
// Load Image
// ===========================

function loadImage(file){

    if(!file.type.startsWith("image/")) return;

    const reader=new FileReader();

    reader.onload=function(e){

        previewImage.src=e.target.result;

        previewImage.style.display="block";

        placeholder.style.display="none";

    }

    reader.readAsDataURL(file);

    fileName.textContent=file.name;

    fileSize.textContent=(file.size/1024).toFixed(1)+" KB";

    fileFormat.textContent=file.type.replace("image/","").toUpperCase();

    const img=new Image();

    img.onload=function(){

        dimensions.textContent=`${img.width} × ${img.height}`;

    }

    img.src=URL.createObjectURL(file);

}


// ===========================
// Convert Image
// ===========================

const convertBtn = document.getElementById("convertBtn");
const formatSelect = document.getElementById("formatSelect");
const qualityRange = document.getElementById("qualityRange");
const qualityValue = document.getElementById("qualityValue");

const convertedImage = document.getElementById("convertedImage");
const convertedPlaceholder = document.getElementById("convertedPlaceholder");
const downloadBtn = document.getElementById("downloadBtn");

const qualityBox = document.getElementById("qualityBox");

qualityRange.addEventListener("input", () => {
    qualityValue.textContent = qualityRange.value + "%";
});

// Enable / Disable Quality

formatSelect.addEventListener("change", () => {

    if(formatSelect.value === "png"){

        qualityBox.classList.add("disabled");

    }else{

        qualityBox.classList.remove("disabled");

    }

});

convertBtn.addEventListener("click", () => {

    if (!fileInput.files.length) {
        alert("Please select an image first.");
        return;
    }

    const file = fileInput.files[0];

    const img = new Image();

    img.onload = function () {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        // White background for JPG
        if (formatSelect.value === "jpeg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const mimeType = "image/" + formatSelect.value;

        canvas.toBlob(function (blob) {

            const url = URL.createObjectURL(blob);

            convertedImage.src = url;
            convertedImage.style.display = "block";
            convertedPlaceholder.style.display = "none";

            const extension =
                formatSelect.value === "jpeg"
                    ? "jpg"
                    : formatSelect.value;

            const fileNameWithoutExt =
                file.name.substring(0, file.name.lastIndexOf(".")) ||
                file.name;

            downloadBtn.href = url;
            downloadBtn.download =
                fileNameWithoutExt + "." + extension;

            downloadBtn.style.display = "flex";

        }, mimeType, qualityRange.value / 100);

    };

    img.src = URL.createObjectURL(file);

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

