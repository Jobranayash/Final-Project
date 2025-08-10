'use strict';
import { data } from './data.js';
import { rednderData } from './showData.js';

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) || 
               (contact.tag && contact.tag.toLowerCase().includes(searchTerm));
    });
    rednderData(filteredData);
});
