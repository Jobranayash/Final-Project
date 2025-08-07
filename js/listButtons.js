'use strict';
import { rednderData } from './showData.js';
import { data } from './data.js';
import { isDuplicateContact, validatePhoneNumber, isDuplicateContactE } from './functions.js';

const personList = document.getElementById("peopleList");
const favoriteIcon = document.getElementById("favIcon");

personList.addEventListener("click", (e) => {
    e.preventDefault();
    const li = e.target.closest("li");
    const index = parseInt(li.getAttribute("data-index"));
    const btn = e.target.closest("button");
    // if (li && btn.getAttribute("class") !== "delete-btn" && btn.getAttribute("class") !== "edit-btn" && btn.getAttribute("class") !== "favorite-btn") {
    //     console.log(li);
    //     showInfo(data, index);
    // }

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

        else if (btn.getAttribute("class") === "favorite-btn") {
            // Handle favorite button click
            const isFavorite = data[index].isfavorite;
            data[index].isfavorite = !isFavorite;
            rednderData(data);
        }
        else if (btn.getAttribute("id") === "favFilter") {
            if (favoriteIcon.src.includes("yellowStar.png")) {
                favoriteIcon.src = "./images/favorite.png";
                rednderData(data); // Show all contacts
                console.log("Showing all contacts");
            } else {
                console.log("Showing favorite contacts");
                favoriteIcon.src = "./images/yellowStar.png";
                rednderData(getFavoriteContacts()); // Show only favorite contacts
            }
        }

    }
    else if (li) {
        showInfo(data, index);
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
    valuesReset(); // Reset the form values
    infoPopup.classList.remove("hidden");

    // Fill contact details
    document.getElementById("infoName").textContent = ` ${data[index].name}`;
    document.getElementById("infoPhone").textContent = `${data[index].phone}`;
    document.getElementById("infoAddress").textContent = `${data[index].address ? `Address: ${data[index].address}` : ''}`;
    document.getElementById("infoTag").textContent = ` ${data[index].tag ? `Tag: ${data[index].tag}` : ''}`;
    document.getElementById("infoImage").src = data[index].image ? data[index].image : './images/add.png';
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



// Create contact form elements
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const addressInput = document.getElementById("addressInput");
const tagInput = document.getElementById("tagInput");
const ageInput = document.getElementById("ageInput");
const emailInput = document.getElementById("emailInput");
const popup = document.getElementById("create");
const createForm = document.getElementById("createForm");
const imageInput = document.getElementById("imageInput");


// Event listener for the popup form
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
        const newImage = file ? URL.createObjectURL(file) : null;
        // Validate inputs
        if (index === null || index === "") {
            if (nameInput.value.trim() === "" || phoneInput.value.trim() === "") {
                alert("Name and Phone are required!");
                return;
            }
        }




        if (index !== null && index !== "" && !isDuplicateContactE(nameInput.value, phoneInput.value, data, index)) {
            //  Edit mode
            data[index].name = nameInput.value || data[index].name;
            data[index].phone = phoneInput.value || data[index].phone;
            data[index].address = addressInput.value || data[index].address;
            data[index].tag = tagInput.value || data[index].tag;
            data[index].age = ageInput.value || data[index].age;
            data[index].email = emailInput.value || data[index].email;
            data[index].image = newImage || data[index].image;
            data[index].editTime = new Date().toISOString();
            valuesReset(); // Reset the form values
        } else {//add mode

            if (!validatePhoneNumber(phoneInput.value)) {
                return; // If phone validation fails, exit
            }
            if (!isDuplicateContact(nameInput.value, phoneInput.value, data)) {
                const newContact = {
                    name: nameInput.value,
                    phone: phoneInput.value,
                    address: addressInput.value || '',
                    tag: tagInput.value || '',
                    age: ageInput.value || '',
                    email: emailInput.value || '',
                    image: newImage || './images/add.png',
                    addTime: new Date().toISOString(),
                    editTime: "",
                    isfavorite: false
                };
                data.push(newContact);
            }

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
    imageInput.src = data[index].image ? data[index].image : './images/add.png';
    popup.setAttribute("data-index", index);
    popup.classList.remove("hidden");
};
/******************************************************************/
// add button functionality

const valuesReset = function () {

};
const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    popup.removeAttribute("data-index"); // Make sure it's add mode
    nameInput.setAttribute("placeholder", 'Name');
    phoneInput.setAttribute("placeholder", 'Phone');
    addressInput.setAttribute("placeholder", 'Address');
    tagInput.setAttribute("placeholder", 'Tag');
    ageInput.setAttribute("placeholder", 'Age');
    emailInput.setAttribute("placeholder", 'Email');
    imageInput.value = ''; // clear file input
    popup.classList.remove("hidden");
});

/***********************************************************/
// Event listener for favorite filter button
// Select the favorite filter button and its image



const getFavoriteContacts = () => {
    return data.filter(contact => contact.isfavorite);
}



//filters for favorites
personList.addEventListener("mouseover", (e) => {
    const li = e.target.closest("li");
    if (li) {
        li.classList.add("liHover");
    }
});

personList.addEventListener("mouseout", (e) => {
    const li = e.target.closest("li");
    if (li) {
        li.classList.remove("liHover");
    }
});