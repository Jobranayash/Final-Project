'use strict';
import { Contact } from './ClassContact.js';
import { deleteAllContacts } from './deleteAll.js';
import { deleteContact } from './deleteBtn.js';
import { addContactFormListener } from './addContacts.js';
import { editContact } from './editContact.js';


const peopleList = document.getElementById("peopleList");
const peopleCount = document.getElementById("peopleCount");
export let Contacts = [];
Contacts.push(new Contact("Zach Doe", "123-456-7890", "123 Nazareth St, Nazareth", "/images/add.png", "work"));
Contacts.push(new Contact("Alaa Smith", "987-654-3210", "321 Raineh , St Ahleh", "/images/add.png", "family"));
Contacts.push(new Contact("Joo Jarbone", "054-654-0399", "456 Der Hannah, salah", "/images/add.png", "friend"));
Contacts.push(new Contact("Ben Dover", "050-792-7942", "Ice Wallow come , Alaske", "/images/add.png", ""));






// export function renderContacts(Contacts) {
//     peopleList.innerHTML = '';
//     const sortedContacts = sortContacts(Contacts);
//     sortedContacts.forEach((contact, index) => {
//         const personItem = document.createElement('ul');
//         personItem.classList.add('person');
//         personItem.setAttribute('data-index', index);
//         personItem.innerHTML = `
//         <li class="pfp">
//             <img src="${contact.image || '/Images/add.png'
//             }" alt="img"> 
//         </li>
//         <li class="name">${contact.name}</li>
//         <li class="tag">${contact.tag}</li>
//         <li class="btns"><button class="info-btn"><img class="btn" src="/Images/info.png" alt="info"></button>
//                     <button class="edit-btn"><img class="btn" src="/Images/edit.png" alt="edit"></button>
//                     <button class="delete-btn"><img class="btn" src="/Images/delete.png" alt="delete"></button>
//                 </li>
//     `;
//         peopleList.appendChild(personItem);
//     }
//     );
//     peopleCount.innerHTML = `<p>People Count: ${Contacts.length}</p>`;

// }
export function renderContacts(Contacts) {
    peopleList.innerHTML = `
    <li class="personheader">
      <div class="pfp">Profile</div>
      <div class="name">Name</div>
      <div class="tag">Tags</div>
      <div class="actions">Actions</div>
      </li>
  `;
    if (Contacts.length === 0) {//check if Contacts is empty
        const msg = document.createElement("li");
        msg.classList.add("person");
        msg.innerHTML = `<div class="name">No contacts available.</div>`;
        peopleList.appendChild(msg);
    }
    const sortedContacts = sortContacts(Contacts);
    sortedContacts.forEach((contact, index) => {

        const personItem = document.createElement('li');
        personItem.classList.add('person');
        personItem.setAttribute('data-index', index);
        personItem.innerHTML = `
            <div class="pfp">
                <img src="${contact.image || '/images/add.png'}" alt="img" />
            </div>
            <div class="name">${contact.name}</div>
            <div class="tag">${contact.tag || ''}</div>
            <div class="btns">
                <button class="info-btn"><img class="btn" src="/images/info.png" alt="info" /></button>
                <button class="edit-btn"><img class="btn" src="/images/edit.png" alt="edit" /></button>
                <button class="delete-btn"><img class="btn" src="/images/delete.png" alt="delete" /></button>
            </div>
        `;

        peopleList.appendChild(personItem);
    });
    peopleCount.innerHTML = `<p>People Count: ${Contacts.length}</p>`;
}



//Sorting func
const sortContacts = function (Contacts) {
    const sorted = Contacts.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
    return sorted;
};

renderContacts(Contacts);

//Event listener 
//Delete All Button
const deleteAllButton = document.getElementById("delete-all-btn");
deleteAllButton.addEventListener("click", () => {
    confirm(`Are you sure you want to delete all?`) && deleteAllContacts(Contacts, 0);

});


//Add Contact Button
//Add Contact Form Listener
const addBtn = document.getElementById("add-btn");
const createPopup = document.getElementById("create");
const cancelBtn = document.getElementById("cancelBtn");
addBtn.addEventListener("click", () => {
    createPopup.classList.remove("hidden");
});
cancelBtn.addEventListener("click", () => {
    document.getElementById("createForm").reset();
    createPopup.classList.add("hidden");
});
addContactFormListener(
    (newContact) => {
        Contacts.push(newContact);
        renderContacts(Contacts);
    },
    (index, updatedValues) => {
        const contact = Contacts[index];
        if (!contact) return;

        contact.name = updatedValues.name;
        contact.phone = updatedValues.phone;
        contact.address = updatedValues.address;
        contact.tag = updatedValues.tag;

        if (updatedValues.image) {
            contact.image = updatedValues.image;
        }

        renderContacts(Contacts);
    }
);




//3 Buttons: Delete, Edit, Info
peopleList.addEventListener("click", (event) => {
    event.preventDefault();
    const index = parseInt(event.target.closest('li').getAttribute('data-index'));
    const btn = event.target.closest('button')
    if (btn) {
        if (btn.getAttribute('class') === 'delete-btn') {
            confirm(`Are you sure you want to delete ${Contacts[index].name}?`) && deleteContact(Contacts, index);
        }
        else if (btn.getAttribute('class') === 'edit-btn') {
            editContact(Contacts, index);

        }
        else if (btn.getAttribute('class') === 'info-btn') {
            alert(`Info for ${Contacts[index].name}: \nPhone: ${Contacts[index].phone}\nAddress: ${Contacts[index].address}`);
        }
    }
});






