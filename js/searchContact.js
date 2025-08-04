'use strict';
import { Contacts } from './js.js'
import { renderContacts } from './js.js';
const search = document.getElementById("searchInput");


search.addEventListener("input", (event) => {
    event.preventDefault();
    const searchTerm = event.target.value;

    const results = Contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.tag && contact.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    renderContacts(results);
});