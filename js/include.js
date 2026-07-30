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

// Current page path
const path = window.location.pathname;

// Default path
let basePath = "..";

// Home Page
if (
    path === "/" ||
    path.endsWith("/index.html") && !path.includes("/blog/")
) {
    basePath = ".";
}

// Blog Home
if (
    path.includes("/blog/") &&
    (path.endsWith("/blog/") || path.endsWith("/blog/index.html"))
) {
    basePath = "..";
}

// Blog Articles
if (
    path.includes("/blog/") &&
    !path.endsWith("/blog/") &&
    !path.endsWith("/blog/index.html")
) {
    basePath = "../..";
}

// Load Components
loadComponent("navbar", "/components/navbar.html");
loadComponent("footer", "/components/footer.html");
