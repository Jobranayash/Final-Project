'use strict';
import { Contact } from './ClassContact.js';
import { deleteAllContacts } from './deleteAll.js';
import { deleteContact } from './deleteBtn.js';


const peopleList = document.getElementById("peopleList");
const peopleCount = document.getElementById("peopleCount");
let Contacts = [];
Contacts.push(new Contact("Zach Doe", "123-456-7890", "123 Nazareth St, Nazareth", "/Images/add.png"));
Contacts.push(new Contact("Alaa Smith", "987-654-3210", "321 Raineh , St Ahleh", "/Images/add.png"));
Contacts.push(new Contact("Joo Jarbone", "054-654-0399", "456 Der Hannah, salah", "/Images/add.png"));
Contacts.push(new Contact("Ben Dover", "050-792-7942", "Ice Wallow come , Alaske", "/Images/add.png"));




export function renderContacts(Contacts, index) {
    peopleList.innerHTML = '';
    Contacts.forEach((contact, index) => {
        const personItem = document.createElement('ul');
        personItem.classList.add('person');
        personItem.innerHTML = `
        <li class="pfp">
            <img src="${contact.image || '/Images/add.png'
            }" alt="img"> 
        </li>
        <li class="name">${contact.name}</li>p
        <li class="btns"><button class="info-btn"><img class="btn" src="/Images/info.png" alt="info"></button>
                    <button class="edit-btn"><img class="btn" src="/Images/edit.png" alt="edit"></button>
                    <button class="delete-btn"><img class="btn" src="/Images/delete.png" alt="delete"></button>
                </li>
    `;
        peopleList.appendChild(personItem);
    }
    );
    peopleCount.innerHTML = `<p>People Count: ${Contacts.length}</p>`;
}

//Event listener 
//Delete All Button
const deleteAllButton = document.getElementById("delete-all-btn");
deleteAllButton.addEventListener("click", () => {
    deleteAllContacts(Contacts, 0);
});

//Delete Button
peopleList.addEventListener('click', (event) => {
    if (event.target.closest('.delete-btn')) {
        const personItem = event.target.closest('ul.person');
        const index = Array.from(peopleList.children).indexOf(personItem);
        if (index > -1) {
            deleteContact(Contacts, index);
        }
    }
});

renderContacts(Contacts, 0);







