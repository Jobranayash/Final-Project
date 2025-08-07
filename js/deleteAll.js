'use strict';
import { rednderData } from './showData.js';
import { data } from './data.js';
const deleteAllButton = document.getElementById("delete-all-btn");
deleteAllButton.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to delete all contacts?");
    if (confirmation) {
        // Clear the data array
        data.length = 0;
       
        // Re-render the contact list
        rednderData(data);
    }
});     
