// ======================================
// DOM ELEMENTS
// ======================================

const jwtInput = document.getElementById("jwtInput");

const headerOutput = document.getElementById("headerOutput");
const payloadOutput = document.getElementById("payloadOutput");
const signatureOutput = document.getElementById("signatureOutput");

const decodeBtn = document.getElementById("decodeBtn");
const exampleBtn = document.getElementById("exampleBtn");
const clearBtn = document.getElementById("clearBtn");

const errorMessage = document.getElementById("errorMessage");

// ======================================
// EXAMPLE JWT
// ======================================

const exampleJWT =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9vbEJ1Y2tldCIsInJvbGUiOiJEZXZlbG9wZXIiLCJpYXQiOjE3MDAwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// ======================================
// BASE64 URL DECODE
// ======================================

function base64UrlDecode(str){

    str = str.replace(/-/g,"+");
    str = str.replace(/_/g,"/");

    while(str.length % 4){

        str += "=";

    }

    return decodeURIComponent(

        atob(str)

        .split("")

        .map(char =>

            "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)

        )

        .join("")

    );

}

// ======================================
// SHOW ERROR
// ======================================

function showError(message){

    errorMessage.style.display = "flex";

    errorMessage.querySelector("span").textContent = message;

}

// ======================================
// HIDE ERROR
// ======================================

function hideError(){

    errorMessage.style.display = "none";

}

// ======================================
// DECODE JWT
// ======================================

function decodeJWT(){

    hideError();

    const token = jwtInput.value.trim();

    if(token === ""){

        showError("Please enter a JWT token.");

        return;

    }

    const parts = token.split(".");

    if(parts.length !== 3){

        showError("Invalid JWT format.");

        return;

    }

    try{

        const header = JSON.parse(

            base64UrlDecode(parts[0])

        );

        const payload = JSON.parse(

            base64UrlDecode(parts[1])

        );

        const signature = parts[2];

        headerOutput.textContent = JSON.stringify(

            header,

            null,

            4

        );

        payloadOutput.textContent = JSON.stringify(

            payload,

            null,

            4

        );

        signatureOutput.textContent = signature;

    }

    catch(error){

        showError(

            "Unable to decode JWT token."

        );

    }

}

// ======================================
// BUTTON EVENT
// ======================================

decodeBtn.addEventListener(

    "click",

    decodeJWT

);


// ======================================
// EXAMPLE BUTTON
// ======================================

exampleBtn.addEventListener("click", () => {

    jwtInput.value = exampleJWT;

    decodeJWT();

});

// ======================================
// CLEAR BUTTON
// ======================================

clearBtn.addEventListener("click", () => {

    jwtInput.value = "";

    headerOutput.textContent = "{}";

    payloadOutput.textContent = "{}";

    signatureOutput.textContent = "Signature will appear here...";

    hideError();

    jwtInput.focus();

});

// ======================================
// COPY FUNCTION
// ======================================

function copyText(text, button){

    navigator.clipboard.writeText(text)

    .then(() => {

        const original = button.innerHTML;

        button.innerHTML =

        `<i class="fa-solid fa-check"></i> Copied`;

        setTimeout(() => {

            button.innerHTML = original;

        },2000);

    })

    .catch(() => {

        alert("Copy failed.");

    });

}

// ======================================
// COPY HEADER
// ======================================

document.getElementById("copyHeader")

.addEventListener("click", () => {

    copyText(

        headerOutput.textContent,

        document.getElementById("copyHeader")

    );

});

// ======================================
// COPY PAYLOAD
// ======================================

document.getElementById("copyPayload")

.addEventListener("click", () => {

    copyText(

        payloadOutput.textContent,

        document.getElementById("copyPayload")

    );

});

// ======================================
// COPY SIGNATURE
// ======================================

document.getElementById("copySignature")

.addEventListener("click", () => {

    copyText(

        signatureOutput.textContent,

        document.getElementById("copySignature")

    );

});

// ======================================
// DOWNLOAD JSON
// ======================================

document.getElementById("downloadBtn")

.addEventListener("click", () => {

    const data = {

        header: headerOutput.textContent,

        payload: payloadOutput.textContent,

        signature: signatureOutput.textContent

    };

    const blob = new Blob(

        [

            JSON.stringify(

                data,

                null,

                4

            )

        ],

        {

            type:"application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "jwt-decoded.json";

    a.click();

    URL.revokeObjectURL(url);

});


// ======================================
// FAQ ACCORDION
// ======================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(faq => {

            faq.classList.remove("active");

            faq.querySelector(".faq-answer").style.maxHeight = null;

        });

        if(!isActive){

            item.classList.add("active");

            item.querySelector(".faq-answer").style.maxHeight =

            item.querySelector(".faq-answer").scrollHeight + "px";

        }

    });

});

// ======================================
// AUTO DECODE
// ======================================

jwtInput.addEventListener("input", () => {

    const value = jwtInput.value.trim();

    if(value.split(".").length === 3){

        decodeJWT();

    }

});

// ======================================
// CTRL + ENTER
// ======================================

jwtInput.addEventListener("keydown", (e) => {

    if(e.ctrlKey && e.key === "Enter"){

        decodeJWT();

    }

});

// ======================================
// TAB KEY SUPPORT
// ======================================

jwtInput.addEventListener("paste", () => {

    setTimeout(() => {

        const token = jwtInput.value.trim();

        if(token.split(".").length === 3){

            decodeJWT();

        }

    },100);

});

// ======================================
// ESC CLEAR
// ======================================

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        jwtInput.value = "";

        headerOutput.textContent = "{}";

        payloadOutput.textContent = "{}";

        signatureOutput.textContent = "Signature will appear here...";

        hideError();

    }

});

// ======================================
// PAGE LOAD
// ======================================

window.addEventListener("load", () => {

    hideError();

    headerOutput.textContent = "{}";

    payloadOutput.textContent = "{}";

    signatureOutput.textContent = "Signature will appear here...";

});