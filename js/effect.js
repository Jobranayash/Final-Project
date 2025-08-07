'use strict';

const effectButton = document.getElementById("effect");
const effectIcon = document.getElementById("effectIcon");

effectButton.addEventListener("click", () => {
    const body = document.body;
    body.classList.toggle("dark-mode");
    effectButton.classList.toggle("active");

    if (body.classList.contains("dark-mode")) {
        effectIcon.src = "./images/effectimg.png";
        effectIcon.alt = "darkmode";
    } else {
        effectIcon.src = "./images/effectimg.png";
        effectIcon.alt = "lightmode";
    }
});
