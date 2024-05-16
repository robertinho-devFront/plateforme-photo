// Importation des Fonctions
import { getPhotographerById } from "../utils/api.js";

// Fonction pour Obtenir le Nom du Dossier du Photographe avec la première lettre de chaque mot en majuscule
const getFolderNameFromPhotographerName = (photographerName) => {
  if (typeof photographerName !== 'string') {
    console.error("photographerName is not a string:", photographerName);
    return '';
  }

  // Split the name into words, capitalize the first letter of each word, join them with hyphens
  const words = photographerName.split(" ");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  const folderName = capitalizedWords.join("-");
  console.log("Converted folder name:", folderName); // Log for debugging
  return folderName;
};

// Vérification de l'Index du Média : Elle vérifie que currentIndex est valide (pas undefined et dans les limites de la liste des médias).
// Sélection du Média : Elle sélectionne le média actuel à partir de medias en utilisant currentIndex.
// Récupération des Infos du Photographe : Elle utilise getPhotographerById pour obtenir les infos du photographe.
// Construction du Chemin du Fichier : Elle construit le chemin du fichier pour l'image ou la vidéo à afficher.
// Affichage du Carrousel : Elle met à jour le contenu HTML du conteneur du carrousel avec le média sélectionné et affiche le carrousel.
export const render = async (medias, photographerId, currentIndex) => {
  console.log("render - photographerId:", photographerId);
  console.log("render - currentIndex:", currentIndex);

  if (typeof currentIndex === 'undefined' || currentIndex < 0 || currentIndex >= medias.length) {
    console.error("Index du média invalide ou non défini.");
    document.querySelector("#carouselContainer").innerHTML = "";
    return;
  }

  const selectedMedia = medias[currentIndex];
  console.log("render - selectedMedia:", selectedMedia);

  let photographer;
  try {
    photographer = await getPhotographerById(photographerId);
    console.log("Photographer data fetched in NewCarrousel.js:", photographer);
  } catch (error) {
    console.error("Erreur lors de la récupération du photographe:", error);
    return;
  }

  if (!photographer) {
    console.error("Photographe non trouvé.");
    return;
  }

  const folderName = getFolderNameFromPhotographerName(photographer.name);
  const mediaFile = selectedMedia.image || selectedMedia.video;
  const filePath = `assets/images/SamplePhotos/${folderName}/${mediaFile}`;

  const carouselContainer = document.querySelector("#carouselContainer");
  if (carouselContainer) {
    carouselContainer.innerHTML = `
      <div class="carousel-overlay" style="z-index: 1000;">
        <div class="carousel">
          <button class="carousel-close">✖</button>
          <button class="carousel-control left">←</button>
          ${
            selectedMedia.image 
            ? `<img src="${filePath}" alt="${selectedMedia.title}" class="carousel-image">`
            : `<video controls class="carousel-image">
                <source src="${filePath}" type="video/mp4">
              </video>`
          }
          <button class="carousel-control right">→</button>
        </div>
      </div>
    `;
    carouselContainer.style.display = 'block';
    attachEvents(medias, currentIndex);
  } else {
    console.error("Élément container du carrousel non trouvé dans le DOM.");
  }
};

const attachEvents = (medias, currentIndex) => {
  const overlay = document.querySelector(".carousel-overlay");
  const closeButton = document.querySelector(".carousel-close");
  const leftButton = document.querySelector(".carousel-control.left");
  const rightButton = document.querySelector(".carousel-control.right");

  if (!overlay || !closeButton || !leftButton || !rightButton) {
    console.log("One or more elements are missing:");
    console.log({ overlay, closeButton, leftButton, rightButton });
    return;
  }

  // Remove previous event listeners
  closeButton.onclick = null;
  leftButton.onclick = null;
  rightButton.onclick = null;
  overlay.onclick = null;

  closeButton.addEventListener("click", closeCarousel);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeCarousel();
    }
  });

  leftButton.addEventListener("click", () => {
    const newIndex = (currentIndex + medias.length - 1) % medias.length;
    updateCarousel(medias, newIndex);
  });

  rightButton.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % medias.length;
    updateCarousel(medias, newIndex);
  });
};

const closeCarousel = () => {
  const overlay = document.querySelector(".carousel-overlay");
  const carouselContainer = document.getElementById('carouselContainer');
  if (overlay) overlay.remove();
  if (carouselContainer) {
    carouselContainer.style.display = 'none';
    carouselContainer.style.zIndex = '';
  }
};

const updateCarousel = (medias, newIndex) => {
  const newMediaId = medias[newIndex].id;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('mediaId', newMediaId);
  window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

  const photographerId = new URLSearchParams(window.location.search).get('id');
  console.log("updateCarousel - photographerId:", photographerId);
  render(medias, photographerId, newIndex);
};

export default {
  render,
  events: attachEvents
};
