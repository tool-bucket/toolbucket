/* ==========================================
   ToolBucket - JSON Formatter & Validator
   Part 1 - Base Setup
========================================== */

// ==========================================
// Elements
// ==========================================

const jsonInput = document.getElementById("jsonInput");

const formatBtn = document.getElementById("formatBtn");
const minifyBtn = document.getElementById("minifyBtn");
const validateBtn = document.getElementById("validateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const uploadBtn = document.getElementById("uploadBtn");
const pasteBtn = document.getElementById("pasteBtn");
const jsonFile = document.getElementById("jsonFile");

const themeBtn = document.getElementById("themeBtn");

const statusBox = document.getElementById("status");
const statusText = document.getElementById("statusText");

const charCount = document.getElementById("charCount");
const lineCount = document.getElementById("lineCount");
const fileSize = document.getElementById("fileSize");

const toast = document.getElementById("toast");

// ==========================================
// Status
// ==========================================

function setStatus(message, success = true){

    statusBox.className = success
        ? "status success"
        : "status error";

    statusBox.innerHTML = `
        <i class="fa-solid ${
            success
                ? "fa-circle-check"
                : "fa-circle-xmark"
        }"></i>

        <span>${message}</span>
    `;

    statusText.textContent = success
        ? "Valid"
        : "Error";

}

// ==========================================
// Toast
// ==========================================

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// ==========================================
// Statistics
// ==========================================

function updateStats(){

    const text = jsonInput.value;

    charCount.textContent = text.length;

    lineCount.textContent =
        text === ""
            ? 0
            : text.split("\n").length;

    const size = new Blob([text]).size;

    if(size < 1024){

        fileSize.textContent = size + " B";

    }else if(size < 1024 * 1024){

        fileSize.textContent =
            (size / 1024).toFixed(2) + " KB";

    }else{

        fileSize.textContent =
            (size / (1024 * 1024)).toFixed(2) + " MB";

    }

}

// ==========================================
// Live Stats
// ==========================================

jsonInput.addEventListener("input", updateStats);

// ==========================================
// Initial State
// ==========================================

updateStats();

setStatus("Ready to format JSON.");


/* ==========================================
   Part 2 - Main Tool Functions
========================================== */

// ==========================================
// Format JSON
// ==========================================

formatBtn.addEventListener("click", () => {

    const text = jsonInput.value.trim();

    if (!text) {
        setStatus("Please paste JSON first.", false);
        showToast("Empty Editor");
        return;
    }

    try {

        const obj = JSON.parse(text);

        jsonInput.value = JSON.stringify(obj, null, 4);

        updateStats();

        setStatus("JSON formatted successfully.");

        showToast("JSON Formatted");

    } catch (error) {

        setStatus(error.message, false);

        showToast("Invalid JSON");

    }

});

// ==========================================
// Minify JSON
// ==========================================

minifyBtn.addEventListener("click", () => {

    const text = jsonInput.value.trim();

    if (!text) {

        setStatus("Please paste JSON first.", false);

        return;

    }

    try {

        const obj = JSON.parse(text);

        jsonInput.value = JSON.stringify(obj);

        updateStats();

        setStatus("JSON minified successfully.");

        showToast("JSON Minified");

    } catch (error) {

        setStatus(error.message, false);

        showToast("Invalid JSON");

    }

});

// ==========================================
// Validate JSON
// ==========================================

validateBtn.addEventListener("click", () => {

    const text = jsonInput.value.trim();

    if (!text) {

        setStatus("Please paste JSON first.", false);

        return;

    }

    try {

        JSON.parse(text);

        setStatus("Valid JSON.");

        showToast("Valid JSON");

    } catch (error) {

        setStatus(error.message, false);

        showToast("Invalid JSON");

    }

});

// ==========================================
// Copy
// ==========================================

copyBtn.addEventListener("click", async () => {

    const text = jsonInput.value;

    if (!text.trim()) {

        setStatus("Nothing to copy.", false);

        return;

    }

    try {

        await navigator.clipboard.writeText(text);

        setStatus("Copied to clipboard.");

        showToast("Copied");

    } catch {

        setStatus("Clipboard permission denied.", false);

    }

});

// ==========================================
// Download
// ==========================================

downloadBtn.addEventListener("click", () => {

    const text = jsonInput.value;

    if (!text.trim()) {

        setStatus("Nothing to download.", false);

        return;

    }

    const blob = new Blob([text], {

        type: "application/json"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "toolbucket-json.json";

    a.click();

    URL.revokeObjectURL(url);

    setStatus("Download started.");

    showToast("Downloaded");

});

// ==========================================
// Clear
// ==========================================

clearBtn.addEventListener("click", () => {

    jsonInput.value = "";

    updateStats();

    setStatus("Editor cleared.");

    showToast("Editor Cleared");

});


/* ==========================================
   Part 3 - Premium Features
========================================== */

// ==========================================
// Upload JSON File
// ==========================================

uploadBtn.addEventListener("click", () => {

    jsonFile.click();

});

jsonFile.addEventListener("change", () => {

    const file = jsonFile.files[0];

    if (!file) return;

    if (!file.name.endsWith(".json")) {

        setStatus("Please select a JSON file.", false);

        showToast("Invalid File");

        return;

    }

    const reader = new FileReader();

    reader.onload = (e) => {

        jsonInput.value = e.target.result;

        updateStats();

        setStatus("JSON file loaded.");

        showToast("File Loaded");

    };

    reader.readAsText(file);

});

// ==========================================
// Paste Button
// ==========================================

pasteBtn.addEventListener("click", async () => {

    try {

        const text = await navigator.clipboard.readText();

        jsonInput.value = text;

        updateStats();

        setStatus("Clipboard pasted.");

        showToast("Pasted");

    } catch {

        setStatus("Clipboard permission denied.", false);

    }

});

// ==========================================
// Theme Switch
// ==========================================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("light")){

        icon.className = "fa-solid fa-sun";

        showToast("Light Theme");

    }else{

        icon.className = "fa-solid fa-moon";

        showToast("Dark Theme");

    }

});

// ==========================================
// Drag & Drop
// ==========================================

const toolBox = document.querySelector(".tool-box");

toolBox.addEventListener("dragover", (e) => {

    e.preventDefault();

    toolBox.classList.add("drag");

});

toolBox.addEventListener("dragleave", () => {

    toolBox.classList.remove("drag");

});

toolBox.addEventListener("drop", (e) => {

    e.preventDefault();

    toolBox.classList.remove("drag");

    const file = e.dataTransfer.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

        jsonInput.value = event.target.result;

        updateStats();

        setStatus("JSON file loaded.");

        showToast("Drag & Drop Success");

    };

    reader.readAsText(file);

});

// ==========================================
// Keyboard Shortcuts
// ==========================================

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.shiftKey) {

        switch (e.key.toLowerCase()) {

            case "f":

                e.preventDefault();

                formatBtn.click();

                break;

            case "m":

                e.preventDefault();

                minifyBtn.click();

                break;

            case "v":

                e.preventDefault();

                validateBtn.click();

                break;

        }

    }

});

// ==========================================
// Auto Validation
// ==========================================

jsonInput.addEventListener("keyup", () => {

    const text = jsonInput.value.trim();

    if(text === ""){

        statusText.textContent = "Ready";

        return;

    }

    try{

        JSON.parse(text);

        statusText.textContent = "Valid";

    }

    catch{

        statusText.textContent = "Invalid";

    }

});


/* ==========================================
   FAQ Accordion
========================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.addEventListener("click", () => {

        const isOpen = item.classList.contains("active");

        // Close all FAQs
        faqItems.forEach(faq => {

            faq.classList.remove("active");

            faq.querySelector(".faq-answer").style.maxHeight = null;

            faq.querySelector(".faq-question i").className =
                "fa-solid fa-plus";

        });

        // Open selected FAQ
        if(!isOpen){

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

            button.querySelector("i").className =
                "fa-solid fa-minus";

        }

    });

});