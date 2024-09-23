// Importation des fonctions nécessaires pour afficher les médias
import { displayPage } from "../pages/photographer.js";
import { getFolderNameFromPhotographerName } from "../utils/getFolderNameFromPhotographerName.js";

// Cette fonction génère le HTML pour un média (image ou vidéo) avec la gestion des likes
const render = (media, photographerName) => {
  const mediaType = media.image ? "image" : "video"; // Vérifie le type de média
  const mediaFile = media.image || media.video; // Récupère le fichier média (image ou vidéo)
  const sanitizedMediaFile = encodeURIComponent(mediaFile);
  const sanitizedFolderName = encodeURIComponent(
    getFolderNameFromPhotographerName(photographerName) // Récupère le nom du dossier associé au photographe
  );

  // Définition du chemin du média (image ou vidéo)
  const mediaPath =
    mediaType === "image"
      ? `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`
      : `assets/videos/${sanitizedFolderName}/${sanitizedMediaFile}`;

  return `
    <!-- Utilisation d'une section pour chaque média avec article pour contenir les informations -->
    <section class="media-item" data-id="${media.id}" data-media-type="${mediaType}">
      <article>
        ${mediaType === "image"
          ? `<img src="${mediaPath}" alt="${media.title}" class="media-content"/>`
          : `<video controls class="media-content">
              <source src="${mediaPath}" type="video/mp4">
            </video>`
        }
        <!-- Informations sur le média et gestion des likes -->
        <div class="media-item-infos"> 
          <h3>${media.title}</h3>
          <button class="likes" id="button-like-${media.id}" data-id="${media.id}">
            ${media.likes}
            <img src="assets/images/favorite.png" alt="Icône de cœur rouge indiquant le nombre de likes">
          </button>
        </div>
      </article>
    </section>
  `;
};

// Cette fonction gère les événements pour la mise à jour des likes
const events = (photographer, medias) => {
  const likeButtons = document.querySelectorAll(".likes"); // Sélectionne tous les boutons de like

  // Ajout d'événements de clic pour chaque bouton de like
  likeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche la propagation du clic sur l'élément parent
      const mediaId = parseInt(button.getAttribute("data-id")); // Récupère l'ID du media

      // Mise à jour des likes pour le média cliqué
      const updatedMedias = medias.map(media => {
        if (media.id === mediaId) {
          return { ...media, likes: media.likes + 1 }; // Incrémente le nombre de likes
        }
        return media;
      });

      displayPage(photographer, updatedMedias, -1); // Réaffiche la page avec les nouveaux likes
    });
  });
};

// Exportation de la fonction render et events pour être utilisée ailleurs
export default {
  render,
  events,
};
