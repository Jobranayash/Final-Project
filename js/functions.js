'use strict';
//Sorting func
export const sortData = function (Contacts) {
    const sorted = Contacts.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
    return sorted;
};

//favorite toggle function


export function isDuplicateContact(name, phone, Contacts) {
    for (const contact of Contacts) {
        if (contact.name.trim().toLowerCase() === name.trim().toLowerCase())
        {
            alert("Contact with the same name already exists.");
            return true;
        }
            if(contact.phone.trim() === phone.trim()) {
            alert("Contact with the same  phone number already exists.");
            return true;
        }
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

export function validatePhoneNumber(name, phone) {

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