


// ===============================
// Image Upload
// ===============================

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");

const previewImage = document.getElementById("previewImage");
const placeholder = document.querySelector(".placeholder-text");

const originalWidth = document.getElementById("originalWidth");
const originalHeight = document.getElementById("originalHeight");

const fileSize = document.getElementById("fileSize");
const imageFormat = document.getElementById("imageFormat");

const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const lockRatio = document.getElementById("lockRatio");

const resizeBtn = document.querySelector(".resize-btn");
const downloadBtn = document.getElementById("downloadBtn");

let originalRatio = 1;

uploadBtn.addEventListener("click", () => {

    fileInput.click();

});

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

        previewImage.style.display = "block";

        placeholder.style.display = "none";

       previewImage.onload = function () {

    originalWidth.innerText = previewImage.naturalWidth + " px";

    originalHeight.innerText = previewImage.naturalHeight + " px";

    widthInput.value = previewImage.naturalWidth;

    heightInput.value = previewImage.naturalHeight;

    originalRatio = previewImage.naturalWidth / previewImage.naturalHeight;

};

        fileSize.innerText = formatBytes(file.size);

        imageFormat.innerText =
            file.type.replace("image/", "").toUpperCase();

    };

    reader.readAsDataURL(file);

});

function formatBytes(bytes) {

    if (bytes < 1024) {

        return bytes + " B";

    }

    else if (bytes < 1024 * 1024) {

        return (bytes / 1024).toFixed(2) + " KB";

    }

    else {

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    }

}

widthInput.addEventListener("input", () => {

    if (!lockRatio.checked) return;

    const width = parseInt(widthInput.value);

    if (!width) return;

    heightInput.value = Math.round(width / originalRatio);

});

heightInput.addEventListener("input", () => {

    if (!lockRatio.checked) return;

    const height = parseInt(heightInput.value);

    if (!height) return;

    widthInput.value = Math.round(height * originalRatio);

});

const quickButtons = document.querySelectorAll(".quick-resize button");

quickButtons.forEach(button => {

    button.addEventListener("click", () => {

        const scale = parseFloat(button.dataset.scale);

        const width = Math.round(previewImage.naturalWidth * scale);

        const height = Math.round(previewImage.naturalHeight * scale);

        widthInput.value = width;

        heightInput.value = height;

    });

});

let resizedImageURL = "";

resizeBtn.addEventListener("click", () => {

    if (!previewImage.src) {

        alert("Please upload an image first.");

        return;

    }

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const newWidth = parseInt(widthInput.value);

    const newHeight = parseInt(heightInput.value);

    canvas.width = newWidth;

    canvas.height = newHeight;

    ctx.drawImage(previewImage, 0, 0, newWidth, newHeight);

    canvas.toBlob((blob) => {

    resizedImageURL = URL.createObjectURL(blob);

    document.getElementById("resultCard").style.display = "block";

    document.getElementById("newWidth").innerText =
        newWidth + " px";

    document.getElementById("newHeight").innerText =
        newHeight + " px";

    document.getElementById("newFileSize").innerText =
        formatBytes(blob.size);

    const originalSize = fileInput.files[0].size;

    const saved =
        ((originalSize - blob.size) / originalSize) * 100;

    document.getElementById("savedPercent").innerText =
        saved.toFixed(1) + "%";

}, "image/jpeg", 0.95);

});

downloadBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.href = resizedImageURL;

    link.download = "toolbucket-resized-image.jpg";

    link.click();

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



