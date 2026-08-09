/* =====================================================
   IMAGE ROTATOR
   JAVASCRIPT — PART 1/3
   UPLOAD + PREVIEW + DRAG & DROP
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const uploadArea =
    document.getElementById("uploadArea");

const selectBtn =
    document.getElementById("selectBtn");

const fileInput =
    document.getElementById("fileInput");

const imageWorkspace =
    document.getElementById("imageWorkspace");

const previewImage =
    document.getElementById("previewImage");

const changeImageBtn =
    document.getElementById("changeImageBtn");


/* =====================================================
   CURRENT IMAGE
===================================================== */

let currentFile = null;


/* =====================================================
   SELECT IMAGE BUTTON
===================================================== */

selectBtn.addEventListener("click", () => {

    fileInput.click();

});


/* =====================================================
   FILE INPUT CHANGE
===================================================== */

fileInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    loadImage(file);

});


/* =====================================================
   LOAD IMAGE FUNCTION
===================================================== */

function loadImage(file) {

    /* Check file type */

    if (!file.type.startsWith("image/")) {

        alert("Please select a valid image file.");

        return;
    }


    /* Check file size */

    const maxSize =
        20 * 1024 * 1024;


    if (file.size > maxSize) {

        alert("Maximum file size is 20MB.");

        return;
    }


    /* Store current file */

    currentFile = file;


    /* Create preview URL */

    const imageURL =
        URL.createObjectURL(file);


    /* Set preview image */

    previewImage.src = imageURL;


    /* Show workspace */

    imageWorkspace.hidden = false;


    /* Hide upload area */

    uploadArea.style.display = "none";


    /* Reset rotation */

    if (typeof resetRotation === "function") {

        resetRotation();

    }

}


/* =====================================================
   CHANGE IMAGE
===================================================== */

changeImageBtn.addEventListener("click", () => {

    fileInput.value = "";

    fileInput.click();

});


/* =====================================================
   DRAG ENTER
===================================================== */

uploadArea.addEventListener("dragenter", (event) => {

    event.preventDefault();

    uploadArea.classList.add("dragover");

});


/* =====================================================
   DRAG OVER
===================================================== */

uploadArea.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadArea.classList.add("dragover");

});


/* =====================================================
   DRAG LEAVE
===================================================== */

uploadArea.addEventListener("dragleave", (event) => {

    event.preventDefault();

    uploadArea.classList.remove("dragover");

});


/* =====================================================
   DROP IMAGE
===================================================== */

uploadArea.addEventListener("drop", (event) => {

    event.preventDefault();

    uploadArea.classList.remove("dragover");


    const files =
        event.dataTransfer.files;


    if (!files || files.length === 0) {
        return;
    }


    const file = files[0];


    loadImage(file);


    /* Keep file input in sync */

    try {

        const dataTransfer =
            new DataTransfer();

        dataTransfer.items.add(file);

        fileInput.files =
            dataTransfer.files;

    } catch (error) {

        console.log(
            "Could not sync dropped file."
        );

    }

});


/* =====================================================
   IMAGE ROTATOR
   JAVASCRIPT — PART 2/3
   ROTATION CONTROLS
===================================================== */


/* =====================================================
   ROTATION ELEMENTS
===================================================== */

const rotateLeftBtn =
    document.getElementById("rotateLeftBtn");

const rotateRightBtn =
    document.getElementById("rotateRightBtn");

const angleRange =
    document.getElementById("angleRange");

const angleValue =
    document.getElementById("angleValue");

const resetBtn =
    document.getElementById("resetBtn");


/* =====================================================
   ROTATION STATE
===================================================== */

let rotationAngle = 0;


/* =====================================================
   APPLY ROTATION
===================================================== */

function applyRotation() {

    previewImage.style.transform =
        `rotate(${rotationAngle}deg)`;


    angleRange.value =
        rotationAngle;


    angleValue.textContent =
        `${rotationAngle}°`;

}


/* =====================================================
   ROTATE RIGHT
===================================================== */

rotateRightBtn.addEventListener("click", () => {

    rotationAngle += 90;


    /*
       Keep angle between 0 and 360
    */

    if (rotationAngle > 360) {

        rotationAngle -= 360;

    }


    applyRotation();

});


/* =====================================================
   ROTATE LEFT
===================================================== */

rotateLeftBtn.addEventListener("click", () => {

    rotationAngle -= 90;


    /*
       Keep angle positive
    */

    if (rotationAngle < 0) {

        rotationAngle += 360;

    }


    applyRotation();

});


/* =====================================================
   CUSTOM ANGLE SLIDER
===================================================== */

angleRange.addEventListener("input", () => {

    rotationAngle =
        Number(angleRange.value);


    applyRotation();

});


/* =====================================================
   RESET ROTATION
===================================================== */

function resetRotation() {

    rotationAngle = 0;

    applyRotation();

}


/* =====================================================
   RESET BUTTON
===================================================== */

resetBtn.addEventListener("click", () => {

    resetRotation();

});


/* =====================================================
   IMAGE ROTATOR
   JAVASCRIPT — PART 3/3
   CANVAS + DOWNLOAD
===================================================== */


/* =====================================================
   DOWNLOAD ELEMENT
===================================================== */

const downloadBtn =
    document.getElementById("downloadBtn");


/* =====================================================
   CANVAS
===================================================== */

const canvas =
    document.createElement("canvas");

const ctx =
    canvas.getContext("2d");


/* =====================================================
   DOWNLOAD ROTATED IMAGE
===================================================== */

downloadBtn.addEventListener("click", () => {

    /* Make sure image exists */

    if (!currentFile || !previewImage.src) {

        alert("Please upload an image first.");

        return;
    }


    /* Make sure image is loaded */

    if (!previewImage.complete) {

        alert("Please wait for the image to load.");

        return;
    }


    /* Original dimensions */

    const originalWidth =
        previewImage.naturalWidth;

    const originalHeight =
        previewImage.naturalHeight;


    /* Convert degrees to radians */

    const radians =
        rotationAngle * Math.PI / 180;


    /*
       Calculate new canvas dimensions.

       This is important because a rotated
       image may need a different canvas size.
    */

    const sin =
        Math.abs(Math.sin(radians));

    const cos =
        Math.abs(Math.cos(radians));


    const newWidth =
        Math.ceil(
            originalWidth * cos +
            originalHeight * sin
        );


    const newHeight =
        Math.ceil(
            originalWidth * sin +
            originalHeight * cos
        );


    /* Set canvas size */

    canvas.width =
        newWidth;

    canvas.height =
        newHeight;


    /* Clear previous canvas */

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
       Move canvas origin to center
       before rotating.
    */

    ctx.save();

    ctx.translate(
        canvas.width / 2,
        canvas.height / 2
    );


    ctx.rotate(radians);


    /*
       Draw original image
       from its center.
    */

    ctx.drawImage(
        previewImage,
        -originalWidth / 2,
        -originalHeight / 2,
        originalWidth,
        originalHeight
    );


    ctx.restore();


    /* =================================================
       OUTPUT FORMAT
    ================================================= */

    let outputType =
        currentFile.type;


    /*
       Keep only supported formats.
       Otherwise use PNG.
    */

    if (
        outputType !== "image/jpeg" &&
        outputType !== "image/png" &&
        outputType !== "image/webp"
    ) {

        outputType = "image/png";

    }


    /* =================================================
       CREATE DOWNLOAD FILE
    ================================================= */

    canvas.toBlob(
        (blob) => {

            if (!blob) {

                alert(
                    "Something went wrong while creating the image."
                );

                return;
            }


            /*
               Create temporary download URL
            */

            const downloadURL =
                URL.createObjectURL(blob);


            /*
               Get original filename
            */

            const originalName =
                currentFile.name;


            /*
               Remove extension
            */

            const baseName =
                originalName.replace(
                    /\.[^/.]+$/,
                    ""
                );


            /*
               Select extension
            */

            let extension = "png";


            if (outputType === "image/jpeg") {

                extension = "jpg";

            }

            else if (outputType === "image/webp") {

                extension = "webp";

            }


            /*
               Final filename
            */

            const finalName =
                `${baseName}-rotated.${extension}`;


            /*
               Create temporary link
            */

            const link =
                document.createElement("a");


            link.href =
                downloadURL;

            link.download =
                finalName;


            /*
               Start download
            */

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);


            /*
               Release memory
            */

            setTimeout(() => {

                URL.revokeObjectURL(
                    downloadURL
                );

            }, 1000);

        },

        outputType,

        0.92

    );

});