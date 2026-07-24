async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        element.innerHTML = await response.text();

if (id === "navbar" && typeof initNavbar === "function") {
    initNavbar();
}

    } catch (err) {
        console.error(err);
    }
}

const pathParts = location.pathname.split("/").filter(Boolean);

// Home page = / ya /index.html
const isHome =
    pathParts.length === 0 ||
    (pathParts.length === 1 && pathParts[0] === "index.html");

const basePath = isHome ? "." : "..";

loadComponent("navbar", `${basePath}/components/navbar.html`);
loadComponent("footer", `${basePath}/components/footer.html`);