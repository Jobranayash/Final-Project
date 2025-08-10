'use strict'

const galleryItems = [
    {
        title: "URBAN LANDSCAPE NIGHT",
        image: "https://picsum.photos/id/1021/160/90",
        alt: "Image 1"
    },
    {
        title: "RIVER FLOWING THROUGH MOUNTAINS",
        image: "https://picsum.photos/id/1022/160/90",
        alt: "Image 2"
    },
    {
        title: "LONE TREE IN THE FOG",
        image: "https://picsum.photos/id/1023/160/90",
        alt: "Image 3"
    },
    {
        title: "SUNSET ON THE BEACH",
        image: "https://picsum.photos/id/1024/160/90",
        alt: "Image 4"
    },
    {
        title: "SNOWY MOUNTAIN PEAK",
        image: "https://picsum.photos/id/1025/160/90",
        alt: "Image 5"
    },
    {
        title: "DENSE FOREST TRAIL",
        image: "https://picsum.photos/id/1026/160/90",
        alt: "Image 6"
    },
    {
        title: "CITY SKYLINE AT DUSK",
        image: "https://picsum.photos/id/1027/160/90",
        alt: "Image 7"
    }
];

const photosNav = document.getElementById("photos-nav");
const viewerSection = document.getElementById("viewer-section");

const fillPhotosNav = function (imagesData) {
    imagesData.forEach((imgData, idx) => {
        const li = document.createElement("li");
        li.className = "contact-photo-item";
        li.setAttribute("data-id", idx);
        li.innerHTML =
            `
        <div class="contact-photo-div">
            <img src=${imgData.image} alt=${imgData.alt}>
        </div>
        <div class="img-title">
            <span class="title">${imgData.title}</span>
        </div>
        `;
        photosNav.appendChild(li);
    });
}

const viewPhoto = function (id) {
    viewerSection.innerHTML =
        `
    <div id="photo-viewer">
        <img id="large-photo" src=${galleryItems[id].image} alt=${galleryItems[id].alt}>
    </div>
    <div id="photo-title">
        <span id="large-photo-title">
            ${galleryItems[id].title } 
        </span>
    </div>
    `;
}

photosNav.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    const dataId = li.getAttribute("data-id");
    viewPhoto(dataId);
})


fillPhotosNav(galleryItems);
viewPhoto(0);