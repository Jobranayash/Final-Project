'use strict';
import { rednderData } from './showData.js';
import { data } from './data.js';

const personList = document.getElementById("peopleList");

personList.addEventListener("click", (e) => {
    e.preventDefault();

    const index = parseInt(e.target.closest("li").getAttribute("data-index"));
    const btn = e.target.closest("button");
    if (btn) {
        if (btn.getAttribute("class") === "edit-btn") {
            showPreIfo(data, index); // Show previous info in the edit form

            // editInfo(data, index); // Call the function to edit contact info
            rednderData(data);
            createForm.reset(); // Reset the form fields
        }
        else if (btn.getAttribute("class") === "delete-btn") {
            // Handle delete button click
            const confirmation = confirm(`Are you sure you want to delete ${data[index].name}?`);
            if (confirmation) {
                data.splice(index, 1); // Remove the contact from the data array
                rednderData(data); // Re-render the contact list
            }
        }
        else if (btn.getAttribute("class") === "info-btn") {
            // Handle info button click
            showInfo(data, index); // Call the function to show contact info

        }
    }
});


//show info function
function showInfo(data, index) {
    const infoPopup = document.getElementById("info");
    const infoForm = document.getElementById("infoForm");

    infoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Handle form submission
    });

    infoPopup.classList.remove("hidden");

    // Fill contact details
    document.getElementById("infoName").textContent = ` ${data[index].name}`;
    document.getElementById("infoPhone").textContent = `${data[index].phone}`;
    document.getElementById("infoAddress").textContent = `${data[index].address ? `Address: ${data[index].address}` : ''}`;
    document.getElementById("infoTag").textContent = ` ${data[index].tag ? `Tag: ${data[index].tag}` : ''}`;
    document.getElementById("infoImage").src = data[index].image ? data[index].image : '/images/add.png';
    document.getElementById("infoEmail").textContent = `${data[index].email ? `Email: ${data[index].email}` : ''}`;
    document.getElementById("infoBirthday").textContent = `${data[index].birthday ? `Birthday: ${data[index].birthday}` : ''}`;
    document.getElementById("age").textContent = `${data[index].age ? `Age: ${data[index].age}` : ''}`;
    document.getElementById("infoAddTime").textContent = `${data[index].addTime ? `Added on: ${data[index].addTime}` : ''}`;
    document.getElementById("infoEditTime").textContent = `${data[index].editTime ? `last edit : ${data[index].editTime}` : ''}`;

    // Setup close button
    const closeBtn = document.getElementById("closeInfoBtn");
    closeBtn.onclick = () => {
        infoPopup.classList.add("hidden");
    };

}
//end of show info function




// Function to handle contact information editing
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const addressInput = document.getElementById("addressInput");
const tagInput = document.getElementById("tagInput");
const ageInput = document.getElementById("ageInput");
const emailInput = document.getElementById("emailInput");
const popup = document.getElementById("create");
const createForm = document.getElementById("createForm");
const imageInput = document.getElementById("imageInput");


// popup.addEventListener("click", (e) => {
//     const btn = e.target.closest("button");
//     const index = parseInt(popup.getAttribute("data-index"));
//     if (btn && btn.id === "cancelBtn") {
//         popup.classList.add("hidden");
//     }
//     else if (btn && btn.id === "submit") {
//         e.preventDefault();
//         data[index].name = nameInput.value || data[index].name;
//         data[index].phone = phoneInput.value || data[index].phone;
//         data[index].address = addressInput.value || data[index].address;
//         data[index].tag = tagInput.value || data[index].tag;
//         data[index].age = ageInput.value || data[index].age;
//         data[index].email = emailInput.value || data[index].email;
//         const file = imageInput.files[0];
//         data[index].image = file ? URL.createObjectURL(file) : data[index].image;
//         rednderData(data);
//         popup.classList.add("hidden");
//     }

// });
popup.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    const index = popup.getAttribute("data-index");
    if (!btn) return;

    if (btn.id === "cancelBtn") {
        popup.classList.add("hidden");
        popup.removeAttribute("data-index");
    }

    if (btn.id === "submit") {
        e.preventDefault();

        const file = imageInput.files[0];
        const newImage = file ? URL.createObjectURL(file) : '/images/add.png';

        if (index !== null && index !== "") {
            // Edit mode
            data[index].name = nameInput.value || data[index].name;
            data[index].phone = phoneInput.value || data[index].phone;
            data[index].address = addressInput.value || data[index].address;
            data[index].tag = tagInput.value || data[index].tag;
            data[index].age = ageInput.value || data[index].age;
            data[index].email = emailInput.value || data[index].email;
            data[index].image = newImage || data[index].image;
            data[index].editTime = new Date().toISOString();
        } else {
            // Add mode
            const newContact = {
                name: nameInput.value,
                phone: phoneInput.value,
                address: addressInput.value || '',
                tag: tagInput.value || '',
                age: ageInput.value || '',
                email: emailInput.value || '',
                image: newImage || '/images/add.png',
                addTime: new Date().toISOString(),
                editTime: "",
                isfavorite: false
            };

            data.push(newContact);

        }

        popup.classList.add("hidden");
        popup.removeAttribute("data-index");
        createForm.reset();
        rednderData(data);
    }
});




const showPreIfo = function (data, index) {
    nameInput.setAttribute("placeholder", data[index].name);
    phoneInput.setAttribute("placeholder", data[index].phone);
    addressInput.setAttribute("placeholder", data[index].address);
    tagInput.setAttribute("placeholder", data[index].tag);
    ageInput.setAttribute("placeholder", data[index].age);
    emailInput.setAttribute("placeholder", data[index].email);
    imageInput.src = data[index].image ? data[index].image : '/images/add.png';
    popup.setAttribute("data-index", index);
    popup.classList.remove("hidden");
};
/******************************************************************/
// add button functionality

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    popup.removeAttribute("data-index"); // Make sure it's add mode
    nameInput.value = '';
    phoneInput.value = '';
    addressInput.value = '';
    tagInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    imageInput.value = ''; // clear file input
    popup.classList.remove("hidden");
});



