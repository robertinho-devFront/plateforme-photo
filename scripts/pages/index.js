// On importe la fonction getPhotographerHTML du fichier 'photographer.js' dans le dossier 'templates'.
// Cette fonction génère le HTML correspondant à chaque photographe.
import { getPhotographerHTML } from '../templates/photographer.js'

// Cette fonction asynchrone utilise 'fetch' pour récupérer les données des photographes depuis un fichier JSON.
async function fetchPhotographers() {
    // On fait une requête pour obtenir le fichier JSON contenant les informations des photographes.
    const response = await fetch('data/photographers.json'); 
    // On extrait les données au format JSON à partir de la réponse de l'API.
    const data = await response.json();
    // On retourne uniquement la liste des photographes.
    return data.photographers;
}

// Cette fonction gère la récupération des photographes. Si cela échoue, elle renvoie une donnée de secours.
async function getPhotographers() {
    try {
        // On tente de récupérer les photographes via la fonction fetchPhotographers.
        return fetchPhotographers();
    } catch (error) {
        // En cas d'erreur (par exemple, si le fichier JSON ne peut pas être récupéré), on affiche un message d'erreur dans la console.
        console.error("Could not fetch photographers:", error);
        // On retourne un ensemble de données statiques comme solution de secours.
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

// Cette fonction asynchrone sert à afficher les données des photographes dans la section dédiée sur la page d'accueil.
async function displayData(photographers) {
    // On sélectionne l'élément HTML qui contiendra les cartes des photographes (élément avec la classe .photographer_section).
    const photographersSection = document.querySelector(".photographer_section");
    
    // On transforme les objets "photographers" en HTML grâce à la fonction getPhotographerHTML.
    // La méthode .map parcourt chaque photographe et génère le HTML, puis .join("") concatène toutes les chaînes de HTML en une seule chaîne.
    const photographersHTML = photographers.map(getPhotographerHTML).join("");
    
    // On insère le HTML généré dans la section dédiée aux photographes sur la page.
    photographersSection.innerHTML = photographersHTML;
}

// Cette fonction init initiale est appelée au chargement de la page pour démarrer l'affichage des photographes.
async function init() {
    // On récupère les données des photographes en appelant la fonction getPhotographers.
    const photographers = await getPhotographers();
    
    // On passe ces données à la fonction displayData pour qu'elles soient affichées sur la page.
    displayData(photographers);
}

// On appelle la fonction init pour démarrer le processus dès le chargement de la page.
init();
