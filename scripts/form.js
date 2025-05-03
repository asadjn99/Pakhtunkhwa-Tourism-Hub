// function validateTripForm(event) {
//     event.preventDefault(); // Prevent direct form submission

//     let name = document.getElementById("tripName");
//     let email = document.getElementById("tripEmail");
//     let phone = document.getElementById("tripPhone");
//     let emergency = document.getElementById("tripEmergency");
//     let departure = document.getElementById("tripDeparture");
//     let destination = document.getElementById("tripDestination");
//     let transport = document.getElementById("tripTransport");
//     let accommodation = document.getElementById("tripAccommodation");
//     let budget = document.getElementById("tripBudget");
//     let specialRequests = document.getElementById("tripSpecialRequests");
//     let fromDate = document.getElementById("tripFromDate");
//     let toDate = document.getElementById("tripToDate");
//     let spinner = document.getElementById("loadingSpinnerTrip");

//     let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     let phonePattern = /^[0-9]{10,}$/;

//     document.querySelectorAll(".error-msg").forEach(msg => msg.remove());

//     let isValid = true;

//     if (name.value.trim() === "") {
//         showError(name, "Full name is required.");
//         isValid = false;
//     }
//     if (!emailPattern.test(email.value.trim())) {
//         showError(email, "Enter a valid email.");
//         isValid = false;
//     }
//     if (!phonePattern.test(phone.value.trim())) {
//         showError(phone, "Enter a valid phone number (at least 10 digits).");
//         isValid = false;
//     }
//     if (fromDate.value.trim() === "" || toDate.value.trim() === "") {
//         showError(fromDate, "Both dates are required.");
//         isValid = false;
//     }

//     if (!isValid) return;

//     submitTripForm();
// }

// function showError(input, message) {
//     let errorMsg = document.createElement("small");
//     errorMsg.className = "text-danger error-msg";
//     errorMsg.textContent = message;
//     input.parentElement.appendChild(errorMsg);
// }


// function submitTripForm() {
//     let submitButton = document.querySelector("#tripForm button[type='submit']");
//     let spinner = document.getElementById("loadingSpinnerTrip");
//     let successToastEl = document.getElementById("tripSuccessToast");
//     let successToast = new bootstrap.Toast(successToastEl);

//     submitButton.disabled = true;
//     spinner.classList.remove("d-none");

//     let formData = {
//         formType: "tripBooking",
//         name: document.getElementById("tripName").value.trim(),
//         email: document.getElementById("tripEmail").value.trim(),
//         contact: document.getElementById("tripPhone").value.trim(),
//         emergency: document.getElementById("tripEmergency").value.trim(),
//         departure: document.getElementById("tripDeparture").value.trim(),
//         destination: document.getElementById("tripDestination").value.trim(),
//         transport: document.getElementById("tripTransport").value.trim(),
//         accommodation: document.getElementById("tripAccommodation").value.trim(),
//         budget: document.getElementById("tripBudget").value.trim(),
//         special: document.getElementById("tripSpecialRequests").value.trim(),
//         fromDate: document.getElementById("tripFromDate").value.trim(),
//         toDate: document.getElementById("tripToDate").value.trim(),
//     };

//     let sheetURL = "https://script.google.com/macros/s/AKfycbzSnCqtD5sPBjxVQ3Mlkh72kKc7Qdi7G4dqLV1hjRqq-qAwdHj9SvWfHsRRW6CoaYGqdw/exec";

//     fetch(sheetURL, {
//         method: "POST",
//         mode: "no-cors",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//     }).then(() => {
//         document.getElementById("tripForm").reset(); // form clear hota hai

//         successToast.show(); 

//         // Hide the msg after 10 seconds
//         setTimeout(() => {
//             successToast.hide();
//         }, 10000);
//     }).catch(error => {
//         console.error("Error submitting form:", error);
//     }).finally(() => {
//         submitButton.disabled = false;
//         spinner.classList.add("d-none"); // Hide spinner
//     });
// }





function validateTripForm(event) {
    event.preventDefault();

    let name = document.getElementById("tripName");
    let email = document.getElementById("tripEmail");
    let phone = document.getElementById("tripPhone");
    let emergency = document.getElementById("tripEmergency");
    let departure = document.getElementById("tripDeparture");
    let destination = document.getElementById("tripDestination");
    let transport = document.getElementById("tripTransport");
    let budget = document.getElementById("tripBudget");
    let specialRequests = document.getElementById("tripSpecialRequests");
    let fromDate = document.getElementById("tripFromDate");
    let toDate = document.getElementById("tripToDate");
    let adults = document.getElementById("Adults");
    let women = document.getElementById("Women");
    let children = document.getElementById("Children");
    let spinner = document.getElementById("loadingSpinnerTrip");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10,}$/;

    document.querySelectorAll(".error-msg").forEach(msg => msg.remove());

    let isValid = true;

    if (name.value.trim() === "") {
        showError(name, "Full name is required.");
        isValid = false;
    }
    if (!emailPattern.test(email.value.trim())) {
        showError(email, "Enter a valid email.");
        isValid = false;
    }
    if (!phonePattern.test(phone.value.trim())) {
        showError(phone, "Enter a valid phone number (at least 10 digits).");
        isValid = false;
    }
    if (fromDate.value.trim() === "" || toDate.value.trim() === "") {
        showError(fromDate, "Both dates are required.");
        isValid = false;
    }
    if (departure.value.trim() === "") {
        showError(departure, "Departure location is required.");
        isValid = false;
    }
    if (adults.value.trim() === "") {
        showError(adults, "At least one person is required.");
        isValid = false;
    }

    if (!isValid) return;

    submitTripForm();
}

function showError(input, message) {
    let errorMsg = document.createElement("small");
    errorMsg.className = "text-danger error-msg";
    errorMsg.textContent = message;
    input.parentElement.appendChild(errorMsg);
}

function submitTripForm() {
    let submitButton = document.querySelector("#tripForm button[type='submit']");
    let spinner = document.getElementById("loadingSpinnerTrip");
    let successToastEl = document.getElementById("tripSuccessToast");
    let successToast = new bootstrap.Toast(successToastEl);

    submitButton.disabled = true;
    spinner.classList.remove("d-none");

    let formData = {
        formType: "tripBooking",
        name: document.getElementById("tripName").value.trim(),
        email: document.getElementById("tripEmail").value.trim(),
        contact: document.getElementById("tripPhone").value.trim(),
        emergency: document.getElementById("tripEmergency").value.trim(),
        departure: document.getElementById("tripDeparture").value.trim(),
        destination: document.getElementById("tripDestination").value.trim(),
        transport: document.getElementById("tripTransport").value.trim(),
        budget: document.getElementById("tripBudget").value.trim(),
        special: document.getElementById("tripSpecialRequests").value.trim(),
        fromDate: document.getElementById("tripFromDate").value.trim(),
        toDate: document.getElementById("tripToDate").value.trim(),
        adults: document.getElementById("Adults").value.trim(),
        women: document.getElementById("Women").value.trim(),
        children: document.getElementById("Children").value.trim(),
    };

    let sheetURL = "https://script.google.com/macros/s/AKfycbzPHPTmGyVOzOAxR3YBYDgA1lqsFvJqUM6Izvv71Dvwfqn3xSekg6aIefXMeNwQBu_Phg/exec";

    fetch(sheetURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    }).then(() => {
        document.getElementById("tripForm").reset();
        successToast.show();
        setTimeout(() => successToast.hide(), 15000);
    }).catch(error => {
        console.error("Error submitting form:", error);
    }).finally(() => {
        submitButton.disabled = false;
        spinner.classList.add("d-none");
    });
}
