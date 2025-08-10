'use strict';
import { rednderData } from './showData.js';
import { data } from './data.js';
import { isDuplicateContact, validatePhoneNumber, isDuplicateContactE, sortData } from './functions.js';

const personList = document.getElementById("peopleList");
const favoriteIcon = document.getElementById("favIcon");

/* -------------------- List click handling (row buttons) -------------------- */
personList.addEventListener("click", (e) => {
    e.preventDefault();

    const li = e.target.closest(".person");
    const liFav = e.target.closest(".personheader");

    // Header favorite filter toggle
    if (liFav) {
        const btn = e.target.closest("button");
        if (btn && btn.id === "favFilter") {

            if (favoriteIcon.src.includes("yellowStar.png")) {
                favoriteIcon.src = "./images/favorite.png";
                rednderData(data); // all
            } else {
                favoriteIcon.src = "./images/yellowStar.png";
                rednderData(getFavoriteContacts()); // only favorites
            }
            
        }
        return;
    }

    if (!li) return; 

    const id = li.getAttribute("data-index");      // this is the contact id (string or number)
    const btn = e.target.closest("button");
    const contact = getContactId(id, data);         // OBJECT (or null)

    if (btn) {
        const cls = btn.getAttribute("class");

        if (cls === "edit-btn") {
            showPreIfo(data, id);
            createForm.reset();
            rednderData(data);
            return;
        }

        if (cls === "delete-btn") {
            const contactToDelete = getContactId(id, data);
            if (!contactToDelete) return;

            const ok = confirm(`Are you sure you want to delete ${contactToDelete.name}?`);
            if (!ok) return;

            const idx = getContactIndex(id,data);
            if (idx !== -1) {
                data.splice(idx, 1);
                rednderData(data);
            }
        }

        if (cls === "info-btn") {
            showInfo(data, id);
            return;
        }

        if (cls === "favorite-btn") {
            if (!contact) return;
            
            contact.isfavorite = !contact.isfavorite;
            rednderData(data);
            return;
        }
    } else {
        // clicking the row (not a button) shows info
        showInfo(data, id);
    }
});

/* --------------------------- Show info popup --------------------------- */
function showInfo(data, id) {
    const c = getContactId(id, data);
    if (!c) return;

    const infoPopup = document.getElementById("info");
    const infoForm = document.getElementById("infoForm");

    infoForm.addEventListener("submit", (e) => e.preventDefault());
    valuesReset();
    infoPopup.classList.remove("hidden");

    document.getElementById("infoName").textContent = ` ${c.name}`;
    document.getElementById("infoPhone").textContent = `${c.phone}`;
    document.getElementById("infoAddress").textContent = `${c.address ? `Address: ${c.address}` : ''}`;
    document.getElementById("infoTag").textContent = ` ${c.tag ? `Tag: ${c.tag}` : ''}`;
    document.getElementById("infoImage").src = c.image ? c.image : './images/add.png';
    document.getElementById("infoEmail").textContent = `${c.email ? `Email: ${c.email}` : ''}`;
    document.getElementById("infoBirthday").textContent = `${c.birthday ? `Birthday: ${c.birthday}` : ''}`;
    document.getElementById("age").textContent = `${c.age ? `Age: ${c.age}` : ''}`;
    document.getElementById("infoAddTime").textContent = `${c.addTime ? `Added on: ${c.addTime}` : ''}`;
    document.getElementById("infoEditTime").textContent = `${c.editTime ? `last edit : ${c.editTime}` : ''}`;

    document.getElementById("closeInfoBtn").onclick = () => {
        infoPopup.classList.add("hidden");
    };
}

/* ----------------------- Create/Edit popup wiring ---------------------- */
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const addressInput = document.getElementById("addressInput");
const tagInput = document.getElementById("tagInput");
const ageInput = document.getElementById("ageInput");
const emailInput = document.getElementById("emailInput");
const popup = document.getElementById("create");
const createForm = document.getElementById("createForm");
const imageInput = document.getElementById("imageInput");

// Submit/cancel inside the create/edit popup
popup.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const idAttr = popup.getAttribute("data-index"); // null when adding
    const contact = getContactId(idAttr, data);       // OBJECT if editing

    if (btn.id === "cancelBtn") {
        popup.classList.add("hidden");
        popup.removeAttribute("data-index");
        return;
    }

    if (btn.id === "submit") {
        e.preventDefault();

        const file = imageInput.files[0];//deafult pic
        const newImage = file ? URL.createObjectURL(file) : null;

        const isEdit = !!contact; //isEdit = contact != null;

        // Validate add mode required fields
        if (!isEdit) {
            //validation
            if (nameInput.value.trim() === "" || phoneInput.value.trim() === "") {
                alert("Name and Phone are required!");
                return;
            }
            if (!validatePhoneNumber(phoneInput.value)) return;
            if (isDuplicateContact(nameInput.value, phoneInput.value, data)) return;
        }

        if (isEdit && !isDuplicateContactE(nameInput.value, phoneInput.value, data, idAttr)) {
            // EDIT MODE: mutate the object directly
            contact.name = nameInput.value || contact.name;
            contact.phone = phoneInput.value || contact.phone;
            contact.address = addressInput.value || contact.address;
            contact.tag = tagInput.value || contact.tag;
            contact.age = ageInput.value || contact.age;
            contact.email = emailInput.value || contact.email;
            contact.image = newImage || contact.image;
            contact.editTime = new Date().toISOString();
            valuesReset();
        } else if (!isEdit) {
            // ADD MODE: unique id even after deletions
            const nextId = (data.length ? Math.max(...data.map(c => Number(c.id))) + 1 : 0);
            const newContact = {
                id: nextId,
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

        popup.classList.add("hidden");
        popup.removeAttribute("data-index");
        createForm.reset();
        rednderData(data);
    }
});

/* -------------------------- Prefill edit popup ------------------------- */
const showPreIfo = function (data, id) {
    const c = getContactId(id, data);
    if (!c) return;

    nameInput.setAttribute("placeholder", c.name);
    phoneInput.setAttribute("placeholder", c.phone);
    addressInput.setAttribute("placeholder", c.address || '');
    tagInput.setAttribute("placeholder", c.tag || '');
    ageInput.setAttribute("placeholder", c.age || '');
    emailInput.setAttribute("placeholder", c.email || '');
    imageInput.value = '';
    popup.setAttribute("data-index", c.id);
    popup.classList.remove("hidden");
};

/* ------------------------------- Helpers -------------------------------- */
const valuesReset = function () {
    nameInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
    tagInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
    imageInput.value = "";
};

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    popup.removeAttribute("data-index"); // add mode
    nameInput.setAttribute("placeholder", 'Name');
    phoneInput.setAttribute("placeholder", 'Phone');
    addressInput.setAttribute("placeholder", 'Address');
    tagInput.setAttribute("placeholder", 'Tag');
    ageInput.setAttribute("placeholder", 'Age');
    emailInput.setAttribute("placeholder", 'Email');
    imageInput.value = '';
    popup.classList.remove("hidden");
});

const getFavoriteContacts = () => data.filter(contact => contact.isfavorite);

// Hover effect on rows 
personList.addEventListener("mouseover", (e) => {
    const li = e.target.closest(".person");
    if (li) li.classList.add("liHover");
});
personList.addEventListener("mouseout", (e) => {
    const li = e.target.closest(".person");
    if (li) li.classList.remove("liHover");
});

// Return contact OBJECT by id 
const getContactId = function (id, data) {
    for (let i = 0; i < data.length; i++) {
        if (String(data[i].id) === String(id)) return data[i];
    }
    return null;
};


// get index
const getContactIndex = function (id, data) {
    for (let i = 0; i < data.length; i++) {
        if (String(data[i].id) === String(id)) return i;
    }
    return -1;
};
