'use strict';
import {sortData} from './functions.js';

// Function to render contacts

const peopleList = document.getElementById("peopleList");
const peopleCount = document.getElementById("peopleCount");

export function rednderData(data) {
    peopleList.innerHTML = `
    <li class="personheader">
      <div class="pfp">Profile</div>
      <div class="name">Name</div>
      <div class="tag">Tags</div>
      <div class="favorite">Favorite</div>
      <div class="actions">Actions</div>
      </li>
  `;
    if (data.length === 0) {//check if Contacts is empty
        const msg = document.createElement("li");
        msg.classList.add("person");
        msg.innerHTML = `<div class="name">No contacts available.</div>`;
        peopleList.appendChild(msg);
        return; // Exit if no contacts
    }
    const sortedContacts = sortData(data);
    sortedContacts.forEach((data, index) => {

        const personItem = document.createElement('li');
        personItem.classList.add('person');
        personItem.setAttribute('data-index', index);
        personItem.innerHTML = `
            <div class="pfp">
                <img src="${data.image || '/images/add.png'}" alt="img" />
            </div>
            <div class="name">${data.name}</div>
            <div class="tag">${data.tag || ''}</div>
            <div class="favorite">
               <button class="favorite-btn"><img src="${data.isfavorite ? '/images/favorite.png' : '/images/favorite.png'}" alt="favorite" /></button>
            </div>
            <div class="btns">
                <button class="info-btn"><img class="btn" src="/images/info.png" alt="info" /></button>
                <button class="edit-btn"><img class="btn" src="/images/edit.png" alt="edit" /></button>
                <button class="delete-btn"><img class="btn" src="/images/delete.png" alt="delete" /></button>
            </div>
        `;

        peopleList.appendChild(personItem);
    });
    peopleCount.innerHTML = `<p>People Count: ${data.length}</p>`;

    
}




