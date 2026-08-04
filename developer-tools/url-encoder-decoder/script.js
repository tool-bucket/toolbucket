const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const charCount = document.getElementById("charCount");

// Character Counter
inputText.addEventListener("input", () => {
    charCount.textContent = inputText.value.length;
});

// Encode URL
encodeBtn.addEventListener("click", () => {

    const text = inputText.value.trim();

    if (!text) {
        alert("Please enter a URL.");
        return;
    }

    outputText.value = encodeURIComponent(text);

});

// Decode URL
decodeBtn.addEventListener("click", () => {

    const text = inputText.value.trim();

    if (!text) {
        alert("Please enter an encoded URL.");
        return;
    }

    try {

        outputText.value = decodeURIComponent(text);

    } catch (error) {

        alert("Invalid encoded URL.");

    }

});

// Copy Result
copyBtn.addEventListener("click", async () => {

    if (!outputText.value) {
        alert("Nothing to copy.");
        return;
    }

    try {

        await navigator.clipboard.writeText(outputText.value);

        copyBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Copied
        `;

        setTimeout(() => {

            copyBtn.innerHTML = `
                <i class="fa-regular fa-copy"></i>
                Copy Result
            `;

        }, 2000);

    } catch {

        alert("Copy failed.");

    }

});

// Clear
clearBtn.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";
    charCount.textContent = "0";

    inputText.focus();

});