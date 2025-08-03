'use strict';
import { renderContacts } from './js.js';


export function deleteContact(Contacts, index) {
    console.log(`Deleting contact at index ${index}...`);
    Contacts.splice(index, 1); // Remove one contact at index
    renderContacts(Contacts, index);
}

