import Media from "./Media.js"; // Importation du module pour gérer le rendu des médias
import NewCarrousel from "./NewCarrousel.js"; // Importation pour la gestion du carrousel

// Fonction de rendu de la galerie de médias pour un photographe spécifique
export const render = (photographerName, medias) => {
  return `
    <div class="gallery">
      ${medias.map((media) => Media.render(media, photographerName)).join("")}
    </div>
  `;
};

// Fonction qui attache les événements interactifs (clic, clavier) aux éléments de médias
export const events = (photographer, medias) => {
  // Sélection de chaque élément de média (image ou vidéo)
  const mediaItems = document.querySelectorAll('.media-item');
  
  // Ajout d'un tabindex et d'événements de clic et de navigation clavier
  mediaItems.forEach((item, index) => {
    item.setAttribute("tabindex", "0"); // Permettre l'accès au clavier
    
    // Événement de clic pour ouvrir le carrousel (à moins qu'il s'agisse du bouton "like")
    item.addEventListener("click", (event) => {
      if (!event.target.closest('.likes')) {
        handleMediaClick(medias, index);
      }
    });

    // Événement pour navigation clavier (Enter ou espace) pour ouvrir le carrousel
    item.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !event.target.closest('.likes')) {
        event.preventDefault();
        handleMediaClick(medias, index);
      }
    });
  });
};

// Fonction de gestion du clic sur un média, qui ouvre le carrousel
const handleMediaClick = (medias, index) => {
  const photographerId = new URLSearchParams(window.location.search).get("id");
  NewCarrousel.render(medias, photographerId, index); // Ouvre le carrousel à l'index correspondant
};

export default {
  render,
  events,
};
