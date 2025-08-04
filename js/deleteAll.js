'use strict';

import { renderContacts } from './js.js';

export function deleteAllContacts(Contacts, index) {
    console.log("Deleting all contacts...");
    Contacts.length = 0; // Clear the array 
    renderContacts(Contacts, index);
    
}