'use strict';
const peopleList = document.getElementById("peopleList");


let people = [
    {
        image: "./images/add.png",
        name: "John Doe",
        phone: "123-456-7890",
        address: "123 Nazareth St, Nazareth",
    },
    {
        image: "./images/add.png",
        name: "Jane Smith",
        phone: "987-654-3210",
        address: "321 Raineh , St Ahleh",
    },
    {
        image: "./images/add.png",
        name: "Joo Jarbone",
        phone: "054-654-0399",
        address: "456 Der Hannah, salah"
    }
];

people.forEach((person, index) => {
    const personItem = document.createElement('ul');
    personItem.classList.add('person');
    personItem.innerHTML = `
        <li class="pfp">
            <img src="${person.image}" alt="img">
        </li>
        <li class="name">${person.name}</li>
        <li class="btns"><button class="info-btn"><img class="btn" src="./images/info.png" alt="info"></button>
                    <button class="edit-btn"><img class="btn" src="./images/edit.png" alt="edit"></button>
                    <button class="delete-btn"><img class="btn" src="./images/delete.png" alt="delete">
                </li>
    `;
    peopleList.appendChild(personItem);
}
);

