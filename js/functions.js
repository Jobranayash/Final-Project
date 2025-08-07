'use strict';
//Sorting func
export const sortData = function (Contacts) {
    const sorted = Contacts.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
    return sorted;
};

//favorite toggle function


export function isDuplicateContact(name, phone, data) {
    let msg = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.trim().toLowerCase() === name.trim().toLowerCase()) {
            msg = "Contact with the same name already exists.";
            break;
        }
        if (data[i].phone.trim() === phone.trim()) {
            msg = "Contact with the same phone number already exists.";
            break;
        }
    }
    if (msg) {
        alert(msg);
        return true; // Duplicate found
    }
    return false;
}

export function isDuplicateContactE(name, phone, data ,index ) {
    let msg = "";
    for (let i = 0; i < data.length ; i++) {
        if(i=== index) continue; // Skip the current contact if editing
        if (data[i].name.trim().toLowerCase() === name.trim().toLowerCase()) {
            msg = "Contact with the same name already exists.";
            break;
        }
        if (data[i].phone.trim() === phone.trim()) {
            msg = "Contact with the same phone number already exists.";
            break;
        }
    }
    if (msg) {
        alert(msg);
        return true; // Duplicate found
    }
    return false;
}

export function isDuplicateName(name, Contacts, skipContact = null) {
    for (const contact of Contacts) {
        if (contact !== skipContact && contact.name.trim().toLowerCase() === name.trim().toLowerCase()) {
            return true;
        }
    }
    return false;
}

export function isDuplicatePhone(phone, Contacts, skipContact = null) {
    for (const contact of Contacts) {
        if (contact !== skipContact && contact.phone.trim() === phone.trim()) {
            return true;
        }
    }
    return false;
}

export function validatePhoneNumber(phone) {

    if (!/^\d+$/.test(phone)) {
        alert("Phone number must contain only digits.");
        return false;
    }
    if (phone.length != 10) {
        alert("Phone number must be 10 digits long.");
        return false;
    }
    return true;
}

export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

export function isExsistingContact(name, phone) {

    if (!name) {
        alert("Name is required.");
        return false;
    }
    if (!phone) {
        alert("Phone number is required.");
        return false;
    }
    return true;
}