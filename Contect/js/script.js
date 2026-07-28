const form = document.getElementById("contactForm");
const result = document.getElementById("form-result");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const button = form.querySelector("button");

    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.success) {

        result.className = "form-result success";
        result.innerHTML = "✅ Message sent successfully! We will get back to you soon.";

        form.reset();

    } else {

        result.className = "form-result error";
        result.innerHTML = "❌ Something went wrong. Please try again.";

    }

    button.disabled = false;
    button.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

});