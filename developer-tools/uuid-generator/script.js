const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

const uuidCount = document.getElementById("uuidCount");
const outputBox = document.getElementById("outputBox");

let generatedUUIDs = [];


/* ==========================
      Generate UUIDs
========================== */

generateBtn.addEventListener("click", () => {

    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;

    setTimeout(() => {

        let count = parseInt(uuidCount.value);

        if (isNaN(count) || count < 1) count = 1;
        if (count > 100) count = 100;

        uuidCount.value = count;

        generatedUUIDs = [];
        outputBox.innerHTML = "";

        for (let i = 0; i < count; i++) {

            const uuid = createUUID();

            generatedUUIDs.push(uuid);

            const div = document.createElement("div");

            div.className = "uuid-result";

            div.textContent = uuid;

            outputBox.appendChild(div);

        }

        randomGlow();

        generateBtn.disabled = false;

        generateBtn.innerHTML =
        `<i class="fa-solid fa-wand-magic-sparkles"></i> Generate UUIDs`;

    }, 300);

});


function createUUID() {

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {

        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);

        return v.toString(16);

    });

}

/* ==========================
        Copy UUIDs
========================== */

copyBtn.addEventListener("click", async () => {

    if (generatedUUIDs.length === 0) {
        alert("Generate UUIDs first.");
        return;
    }

    try {

        await navigator.clipboard.writeText(generatedUUIDs.join("\n"));

        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(() => {

            copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy All';

        }, 2000);

    } catch (err) {

        alert("Copy failed!");

        console.error(err);

    }

});


/* ==========================
      Download TXT
========================== */

downloadBtn.addEventListener("click", () => {

    if (generatedUUIDs.length === 0) {

        alert("Generate UUIDs first.");

        return;

    }

    const blob = new Blob(

        [generatedUUIDs.join("\n")],

        { type: "text/plain" }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "uuids.txt";

    a.click();

    URL.revokeObjectURL(url);

});

function showToast(message){

    alert(message);

}

/* ==========================
      Copy Single UUID
========================== */







uuidCount.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

generateBtn.click();

}

});


function downloadCSV() {

    if (generatedUUIDs.length === 0) {

        showToast("Generate UUIDs First");

        return;

    }

    let csv = "UUID\n";

    generatedUUIDs.forEach(uuid => {

        csv += uuid + "\n";

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "uuids.csv";

    a.click();

    URL.revokeObjectURL(url);

}

outputBox.addEventListener("click", (e) => {

    if (!e.target.classList.contains("uuid-result")) return;

    navigator.clipboard.writeText(e.target.textContent);

    e.target.style.borderLeft = "5px solid #22C55E";

    setTimeout(() => {

        e.target.style.borderLeft = "5px solid #3B82F6";

    }, 700);

    showToast("UUID Copied");

});

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key === "Enter") {

        generateBtn.click();

    }

});


const colors = [

"#3B82F6",
"#2563EB",
"#60A5FA",
"#0EA5E9"

];

function randomGlow() {

    const color = colors[Math.floor(Math.random()*colors.length)];

    generateBtn.style.boxShadow =

    `0 15px 40px ${color}`;

}

outputBox.scrollIntoView({

    behavior:"smooth",

    block:"center"

});