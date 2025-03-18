
function validateForm(event) {
event.preventDefault(); // Prevents direct submission

let email = document.getElementById('email').value;
let contact = document.getElementById('contact').value;
let emergency = document.getElementById('emergency').value;
let fromDate = document.getElementById('fromDate').value;
let toDate = document.getElementById('toDate').value;

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let phonePattern = /^[0-9]{10,}$/;

if (!emailPattern.test(email)) {
alert('Invalid email address');
return;
}
if (!phonePattern.test(contact) || !phonePattern.test(emergency)) {
alert('Invalid phone number (must be at least 10 digits).');
return;
}
if (new Date(fromDate) > new Date(toDate)) {
alert('Invalid date range');
return;
}

submitForm();
}











document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent direct submission

    // Validate the form
    if (!validateForm()) return; 

    // Check if reCAPTCHA is completed
    let recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert("Please complete the reCAPTCHA.");
        return;
    }

    // Call submitForm with reCAPTCHA response
    submitForm(recaptchaResponse);
});

function validateForm() {
    let email = document.getElementById('email').value;
    let contact = document.getElementById('contact').value;
    let emergency = document.getElementById('emergency').value;
    let fromDate = document.getElementById('fromDate').value;
    let toDate = document.getElementById('toDate').value;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10,}$/;

    if (!emailPattern.test(email)) {
        alert('Invalid email address');
        return false;
    }
    if (!phonePattern.test(contact) || !phonePattern.test(emergency)) {
        alert('Invalid phone number (must be at least 10 digits).');
        return false;
    }
    if (new Date(fromDate) > new Date(toDate)) {
        alert('Invalid date range');
        return false;
    }

    return true; // Return true if validation passes
}

function submitForm(recaptchaResponse) {
    let submitButton = document.querySelector("button[type='submit']");
    let spinner = document.getElementById("loadingSpinner");

    submitButton.disabled = true;
    spinner.classList.remove("d-none"); // Show loading spinner

    let formData = {
        fromDate: document.getElementById("fromDate").value,
        toDate: document.getElementById("toDate").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        persons: document.getElementById("persons").value,
        kids: document.getElementById("kids").value,
        contact: document.getElementById("contact").value,
        emergency: document.getElementById("emergency").value,
        departure: document.getElementById("departure").value,
        destination: document.getElementById("destination").value,
        transport: document.getElementById("transport").value,
        accommodation: document.getElementById("accommodation").value,
        budget: document.getElementById("budget").value,
        payment: document.getElementById("payment").value,
        special: document.getElementById("special").value,
        "g-recaptcha-response": recaptchaResponse // Send reCAPTCHA response
    };

    let sheetURL = "https://script.google.com/macros/s/AKfycbz_DsMi9ecu7BQ84yblKlgUcvves2tuCIXCxmV9JFfn1JEHSxgbG9f4Jatcikjdu1J0Pw/exec";

    fetch(sheetURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(() => {
        alert("Your trip has been booked!");
        document.getElementById("bookingForm").reset();
        grecaptcha.reset(); // Reset reCAPTCHA
    })
    .catch(error => {
        alert("Error submitting form. Please try again.");
        console.error("Error:", error);
    })
    .finally(() => {
        submitButton.disabled = false;
        spinner.classList.add("d-none"); // Hide spinner
    });
}
