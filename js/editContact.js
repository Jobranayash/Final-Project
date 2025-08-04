
'use strict';

export function editContact(Contacts, index) {
    const contact = Contacts[index];
    if (!contact) return;

    // Populate form with existing data
    document.getElementById("nameInput").value = contact.name;
    document.getElementById("phoneInput").value = contact.phone;
    document.getElementById("addressInput").value = contact.address;
    document.getElementById("tagInput").value = contact.tag;

    // Show the form
    const form = document.getElementById("createForm");
    const popup = document.getElementById("create");
    popup.classList.remove("hidden");
}
