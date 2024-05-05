
import {getPhotographerHTML} from '../templates/photographer.js'


async function fetchPhotographers() {
    const response = await fetch('data/photographers.json'); 
    const data = await response.json();
    return data.photographers;
}

async function getPhotographers() {
    try {
        return fetchPhotographers();
    } catch (error) {
        console.error("Could not fetch photographers:", error);
        return [
            {
                "name": "Paul Emploi",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "France Travail",
                "id": 2,
                "city": "Paris aussi",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            }
        ];
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    const photographersHTML = photographers.map(getPhotographerHTML).join("");
    photographersSection.innerHTML = photographersHTML;
}

async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();

