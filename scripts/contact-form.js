function validateContactForm(event) {
    event.preventDefault(); // Prevent direct form submission

    let name = document.getElementById("contactName");
    let email = document.getElementById("contactEmail");
    let phone = document.getElementById("contactPhone");
    let message = document.getElementById("contactMessage");
    let successMessage = document.getElementById("contactSuccessMessage"); // Make sure this exists in your HTML
    let spinner = document.getElementById("loadingSpinner2");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10,}$/;

    // Clear previous validation messages
    document.querySelectorAll(".error-msg").forEach(msg => msg.remove());
    if (successMessage) successMessage.classList.add("d-none"); // Hide success message before validation

    let isValid = true;

    // Validation checks
    if (name.value.trim() === "") {
        showError(name, "Full name is required.");
        isValid = false;
    }
    if (!emailPattern.test(email.value.trim())) {
        showError(email, "Enter a valid email.");
        isValid = false;
    }
    if (phone.value.trim() !== "" && !phonePattern.test(phone.value.trim())) {
        showError(phone, "Enter a valid phone number (at least 10 digits).");
        isValid = false;
    }
    if (message.value.trim() === "") {
        showError(message, "Message is required.");
        isValid = false;
    }

    if (!isValid) return; // Stop if validation fails

    submitContactForm();
}

// Function to show inline error messages
function showError(input, message) {
    let errorMsg = document.createElement("small");
    errorMsg.className = "text-danger error-msg";
    errorMsg.textContent = message;
    input.parentElement.appendChild(errorMsg);
}

// Submit the form data to Google Sheets
function submitContactForm() {
    let submitButton = document.querySelector("#contactForm2 button[type='submit']");
    let spinner = document.getElementById("loadingSpinner2");
    let successToastElement = document.getElementById("tripSuccessToast"); // Get the correct toast element
    let successToast = new bootstrap.Toast(successToastElement); // Initialize Bootstrap Toast

    submitButton.disabled = true;
    spinner.classList.remove("d-none"); // Show loading spinner

    let formData = {
        formType: "contactForm2",
        name: document.getElementById("contactName").value.trim(),
        email: document.getElementById("contactEmail").value.trim(),
        contact: document.getElementById("contactPhone").value.trim(),
        message: document.getElementById("contactMessage").value.trim()
    };

    let sheetURL = "https://script.google.com/macros/s/AKfycbzSnCqtD5sPBjxVQ3Mlkh72kKc7Qdi7G4dqLV1hjRqq-qAwdHj9SvWfHsRRW6CoaYGqdw/exec"; // Replace with actual URL

    fetch(sheetURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    }).then(response => {
        document.getElementById("contactForm2").reset(); // form clear krta hai
        successToast.show(); // Show the floating toast

        // Hide the toast after 6 seconds
        setTimeout(() => {
            successToast.hide();
        }, 6000);
    }).catch(error => {
        console.error("Error submitting form:", error);
    }).finally(() => {
        submitButton.disabled = false;
        spinner.classList.add("d-none"); // Hide spinner
    });   



}


