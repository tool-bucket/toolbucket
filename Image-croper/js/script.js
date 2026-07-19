

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

// ==========================
// Image Cropper
// ==========================

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const uploadArea = document.getElementById("uploadArea");

const cropperContainer = document.getElementById("cropperContainer");
const controls = document.getElementById("controls");

const image = document.getElementById("image");

const aspectRatio = document.getElementById("aspectRatio");

const rotateLeft = document.getElementById("rotateLeft");
const rotateRight = document.getElementById("rotateRight");

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");

const cropBtn = document.getElementById("cropBtn");
const downloadBtn = document.getElementById("downloadBtn");

const imageInfo = document.getElementById("imageInfo");

const originalDimensions = document.getElementById("originalDimensions");
const originalSize = document.getElementById("originalSize");

const croppedDimensions = document.getElementById("croppedDimensions");
const croppedSize = document.getElementById("croppedSize");

let cropper = null;

// ==========================
// Upload Button
// ==========================

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

// ==========================
// Image Select
// ==========================

fileInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

    image.src = reader.result;

    // Original Image Info
    image.onload = () => {

        originalDimensions.textContent =
            `${image.naturalWidth} × ${image.naturalHeight} px`;

        originalSize.textContent =
            formatBytes(file.size);

            imageInfo.classList.remove("hidden");

    };

    uploadArea.classList.add("hidden");
    cropperContainer.classList.remove("hidden");
    controls.classList.remove("hidden");

    if (cropper) {
        cropper.destroy();
    }

    cropper = new Cropper(image, {

        viewMode: 1,
        dragMode: "move",
        autoCropArea: 1,
        responsive: true,
        background: false,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true

    });

};

    reader.readAsDataURL(file);

});

// ==========================
// Aspect Ratio
// ==========================

aspectRatio.addEventListener("change", () => {

    let value = aspectRatio.value;

    if (value === "NaN") {

        cropper.setAspectRatio(NaN);

    } else {

        cropper.setAspectRatio(Number(value));

    }

});

// ==========================
// Rotate
// ==========================

rotateLeft.addEventListener("click", () => {

    cropper.rotate(-90);

});

rotateRight.addEventListener("click", () => {

    cropper.rotate(90);

});

// ==========================
// Zoom
// ==========================

zoomIn.addEventListener("click", () => {

    cropper.zoom(0.1);

});

zoomOut.addEventListener("click", () => {

    cropper.zoom(-0.1);

});

// ==========================
// Crop Image
// ==========================

cropBtn.addEventListener("click", () => {

    const canvas = cropper.getCroppedCanvas({

        imageSmoothingQuality: "high"

    });

    // Cropped Dimensions
    croppedDimensions.textContent =
        `${canvas.width} × ${canvas.height} px`;

    // Cropped File Size
    canvas.toBlob((blob) => {

        croppedSize.textContent =
            formatBytes(blob.size);

    });

    imageInfo.classList.remove("hidden");

    downloadBtn.href =
        canvas.toDataURL("image/png");

    downloadBtn.classList.remove("hidden");

});

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {

    cropper.reset();

});


function formatBytes(bytes){

    if(bytes < 1024){

        return bytes + " Bytes";

    }

    if(bytes < 1024 * 1024){

        return (bytes / 1024).toFixed(2) + " KB";

    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";

}



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

