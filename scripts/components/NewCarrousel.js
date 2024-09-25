// On importe deux fonctions utilitaires pour récupérer les informations du photographe et pour générer le nom du dossier du photographe à partir de son nom.
import { getPhotographerById } from "../utils/api.js";
import { getFolderNameFromPhotographerName } from "../utils/getFolderNameFromPhotographerName.js";

// Fonction principale qui génère et affiche le carrousel/lightbox pour les médias d'un photographe.
export const render = async (medias, photographerId, currentIndex) => {
  console.log("render - photographerId:", photographerId);
  console.log("render - currentIndex:", currentIndex);

  // Vérification de la validité de l'index du média sélectionné (currentIndex).
  if (
    typeof currentIndex === "undefined" ||
    currentIndex < 0 ||
    currentIndex >= medias.length
  ) {
    console.error("Index du média invalide ou non défini.");
    // Si l'index est invalide, on vide le contenu du carrousel et on arrête l'exécution.
    document.querySelector("#carouselContainer").innerHTML = "";
    return;
  }

  // On sélectionne le média correspondant à l'index actuel.
  const selectedMedia = medias[currentIndex];
  console.log("render - selectedMedia:", selectedMedia);

  let photographer;
  try {
    // On récupère les informations du photographe via l'ID.
    photographer = await getPhotographerById(photographerId);
    console.log("Photographer data fetched in NewCarrousel.js:", photographer);
  } catch (error) {
    console.error("Erreur lors de la récupération du photographe:", error);
    return;
  }

  // Si le photographe n'est pas trouvé, on arrête l'exécution.
  if (!photographer) {
    console.error("Photographe non trouvé.");
    return;
  }

  // On génère le nom du dossier où sont stockés les fichiers du photographe à partir de son nom.
  const folderName = getFolderNameFromPhotographerName(photographer.name);
  // On détermine le fichier du média à afficher (image ou vidéo).
  const mediaFile = selectedMedia.image || selectedMedia.video;
  const filePath = `assets/images/SamplePhotos/${folderName}/${mediaFile}`;

  // On sélectionne le conteneur du carrousel dans le DOM.
  const carouselContainer = document.querySelector("#carouselContainer");
  if (carouselContainer) {
    // On génère le contenu HTML du carrousel et on l'affiche.
    carouselContainer.innerHTML = `
      <div class="carousel-overlay" style="z-index: 1000;">
        <div class="carousel">
          <button class="carousel-close">x</button>
          <button class="carousel-control left"><</button>
          ${
            selectedMedia.image
              ? `<img src="${filePath}" alt="${selectedMedia.title}" class="carousel-image">`
              : `<video controls class="carousel-image">
                <source src="${filePath}" type="video/mp4">
              </video>`
          }
          <button class="carousel-control right">></button>
          <div class="carousel-title">${selectedMedia.title}</div>
        </div>
      </div>
    `;
    // On rend visible le carrousel en modifiant son style.
    carouselContainer.style.display = "block";
    // On attache les événements (fermeture, navigation) au carrousel.
    attachEvents(medias, currentIndex);
  } else {
    console.error("Élément container du carrousel non trouvé dans le DOM.");
  }
};

// Fonction qui attache les événements (fermeture, navigation à gauche/droite) au carrousel.
const attachEvents = (medias, currentIndex) => {
  const overlay = document.querySelector(".carousel-overlay");
  const closeButton = document.querySelector(".carousel-close");
  const leftButton = document.querySelector(".carousel-control.left");
  const rightButton = document.querySelector(".carousel-control.right");

  // Si un des éléments est manquant, on arrête et on log les éléments manquants dans la console.
  if (!overlay || !closeButton || !leftButton || !rightButton) {
    console.log("One or more elements are missing:");
    console.log({ overlay, closeButton, leftButton, rightButton });
    return;
  }

  // On donne le focus initial au bouton de fermeture pour la navigation au clavier.
  closeButton.focus();

  // Attache l'événement de fermeture du carrousel au clic sur le bouton de fermeture.
  closeButton.addEventListener("click", closeCarousel);
  closeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      closeCarousel();
    }
  });

  // Ferme le carrousel si on clique en dehors de la zone du carrousel.
  overlay.addEventListener("click", handleOverlayClick);

  // Navigation avec les touches du clavier (fermer avec Échap, gauche/droite pour changer de média).
  overlay.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Escape":
        closeCarousel();
        break;
      case "ArrowLeft":
        handleLeftClick();
        break;
      case "ArrowRight":
        handleRightClick();
        break;
      default:
        break;
    }
  });

  // Navigation au clic sur les boutons gauche/droite.
  leftButton.addEventListener("click", handleLeftClick);
  leftButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleLeftClick();
    }
  });

  rightButton.addEventListener("click", handleRightClick);
  rightButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleRightClick();
    }
  });

  // Donne le focus à l'overlay pour permettre la navigation au clavier.
  overlay.focus();

  // Gère la navigation vers le média précédent.
  function handleLeftClick() {
    const newIndex = (currentIndex + medias.length - 1) % medias.length;
    updateCarousel(medias, newIndex);
  }

  // Gère la navigation vers le média suivant.
  function handleRightClick() {
    const newIndex = (currentIndex + 1) % medias.length;
    updateCarousel(medias, newIndex);
  }

  // Ferme le carrousel si l'utilisateur clique en dehors de la zone du carrousel.
  function handleOverlayClick(event) {
    if (event.target === overlay) {
      closeCarousel();
    }
  }
};

// Fonction qui ferme le carrousel.
const closeCarousel = () => {
  const overlay = document.querySelector(".carousel-overlay");
  const carouselContainer = document.getElementById("carouselContainer");
  if (overlay) overlay.remove();
  if (carouselContainer) {
    carouselContainer.style.display = "none";
    carouselContainer.style.zIndex = "";
  }

  // Met à jour l'URL pour supprimer le paramètre mediaId quand le carrousel est fermé.
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("mediaId");
  window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
};

// Fonction qui met à jour le carrousel quand l'utilisateur navigue entre les médias.
const updateCarousel = (medias, newIndex) => {
  // Mise à jour de l'URL avec le nouvel index du média sélectionné.
  const newMediaId = medias[newIndex].id;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("mediaId", newMediaId);
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${urlParams.toString()}`
  );

  const photographerId = new URLSearchParams(window.location.search).get("id");
  console.log("updateCarousel - photographerId:", photographerId);
  // On appelle la fonction render pour mettre à jour le carrousel avec le nouveau média.
  render(medias, photographerId, newIndex);
};

// Export des fonctions pour qu'elles soient accessibles ailleurs.
export default {
  render,
  events: attachEvents,
};
