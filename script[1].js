document.addEventListener("DOMContentLoaded", displayFeedback);

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("username").value.trim();
    let email = document.getElementById("useremail").value.trim();
    let message = document.getElementById("usermessage").value.trim();
    let formMessage = document.getElementById("formMessage");

    if (name === "") {
        alert("Name cannot be empty!");
        return;
    }

    let emailCheck = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailCheck)) {
        alert("Enter a valid email address!");
        return;
    }

    let feedbackData = { name, email, message };

    let storedFeedback = JSON.parse(localStorage.getItem("userFeedback")) || [];
    storedFeedback.push(feedbackData);
    localStorage.setItem("userFeedback", JSON.stringify(storedFeedback));

    formMessage.textContent = "Message sent successfully!";

    document.getElementById("contactForm").reset();

    displayFeedback();
});

function displayFeedback() {
    let container = document.getElementById("feedbackContainer");
    container.innerHTML = "";

    let storedFeedback = JSON.parse(localStorage.getItem("userFeedback")) || [];

    storedFeedback.forEach(function(item) {
        let div = document.createElement("div");
        div.classList.add("project-box");
        div.innerHTML = `<strong>${item.name}</strong><br>${item.email}<br>${item.message}`;
        container.appendChild(div);
    });
}
