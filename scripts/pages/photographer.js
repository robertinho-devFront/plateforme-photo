// On importe les fonctions et composants nécessaires pour afficher la page du photographe et gérer les interactions.
// - `getPhotographerById` récupère les données du photographe à partir de son ID.
// - `fetchMediaForPhotographer` récupère les médias associés au photographe.
// - On importe également des composants pour la page (Headline, MediaFilters, MediaLikes, MediaGallery, NewCarrousel) pour construire l'interface utilisateur.
import {
  getPhotographerById,
  fetchMediaForPhotographer,
} from "../utils/api.js";
import Headline from '../components/Headline.js'; 
import MediaFilters from '../components/MediaFilters.js';
import MediaLikes from '../components/MediaLikes.js';
import MediaGallery from "../components/MediaGallery.js";
import NewCarrousel from '../components/NewCarrousel.js';

// Le document attend que la page soit complètement chargée pour exécuter ce code.
// Cela garantit que tous les éléments du DOM sont prêts avant d'essayer d'y accéder.
document.addEventListener("DOMContentLoaded", async () => {
  // On récupère les paramètres de l'URL (par exemple, l'ID du photographe).
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");  // ID du photographe dans l'URL
  const mediaId = urlParams.get('mediaId');    // ID du média spécifique (si fourni dans l'URL)

  // On affiche les IDs dans la console pour s'assurer qu'ils sont bien récupérés.
  console.log("Photographer ID:", photographerId);
  console.log("Media ID from URL:", mediaId);

  // Si l'ID du photographe n'est pas trouvé dans l'URL, on arrête l'exécution du script et on affiche une erreur dans la console.
  if (!photographerId) {
    console.error("Photographer ID not found in URL.");
    return;
  }

  try {
    // On tente de récupérer les données du photographe en utilisant l'ID.
    const photographer = await getPhotographerById(photographerId);
    console.log("Photographer fetched:", photographer); 

    // On récupère également les médias associés à ce photographe.
    const medias = await fetchMediaForPhotographer(photographerId);
    
    // Si les données du photographe ou les médias ne sont pas trouvés, on arrête et on affiche une erreur.
    if (!photographer || !medias) {
      console.error("Failed to load photographer or media data.");
      return;
    }

    // On détermine l'index du média actuel, si un mediaId est présent dans l'URL (utile pour savoir quel média afficher dans la lightbox).
    const currentIndex = mediaId ? medias.findIndex(media => media.id.toString() === mediaId) : -1;
    console.log("Initial currentIndex:", currentIndex); 
    
    // On appelle la fonction displayPage pour afficher les informations du photographe et ses médias sur la page.
    displayPage(photographer, medias, currentIndex);
  } catch (error) {
    // Si une erreur se produit lors de la récupération des données, on l'affiche dans la console.
    console.error("Error fetching data:", error);
  }
});

// Fonction principale qui affiche la page du photographe avec tous ses composants : les informations du photographe, les filtres de médias, la galerie de médias, les likes, etc.
export function displayPage(photographer, medias, currentIndex) {
  // On sélectionne l'élément principal du DOM où le contenu sera inséré.
  const mainElement = document.querySelector("#main");

  // Si l'élément principal n'existe pas, on arrête le script et affiche une erreur.
  if (!mainElement) {
    console.error("Main element not found in the DOM");
    return;
  }

  // Si un mediaId est présent (c'est-à-dire si l'utilisateur a cliqué sur un média spécifique), on affiche la lightbox (carousel).
  // Sinon, on cache le carousel.
  const carouselStyle = currentIndex !== -1 ? 'display: block; z-index: 1000;' : 'display: none;';

  // On génère le HTML pour la page en utilisant les différents composants : Headline pour l'en-tête du photographe,
  // MediaFilters pour les filtres de tri, MediaGallery pour la galerie, et MediaLikes pour les likes.
  mainElement.innerHTML = `
    ${Headline.render(photographer)}
    ${MediaFilters.render()}
    ${MediaGallery.render(photographer.name, medias)}
    ${MediaLikes.render({
      price: photographer.price,
      likes: medias.reduce((total, currentMedia) => total + currentMedia.likes, 0)
    })}
    <div id="carouselContainer" style="${carouselStyle}"></div>
  `;

  // Si un média spécifique est sélectionné, on affiche le carrousel à l'index correspondant.
  if (currentIndex !== -1) {
    NewCarrousel.render(medias, photographer.id, currentIndex);
  }

  // On attache les événements à chaque composant après avoir généré le HTML.
  attachEvents(photographer, medias);
}

// Cette fonction attache tous les événements nécessaires aux différents composants de la page (clavier, clics, etc.).
function attachEvents(photographer, medias) {
  Headline.events(); // Gère les événements liés à l'en-tête.
  MediaFilters.events(photographer, medias); // Gère les événements de tri des médias.
  MediaGallery.events(photographer, medias); // Gère les événements de la galerie (comme l'ouverture de la lightbox).
  attachCarouselEvents(photographer, medias); // Attache les événements pour le carrousel (clics sur les médias).
  attachLikeEvents(photographer, medias); // Gère les événements liés aux boutons de like.
}

// Fonction pour gérer les événements liés au carrousel, c'est-à-dire l'ouverture des médias dans une lightbox.
function attachCarouselEvents(photographer, medias) {
  // On sélectionne tous les éléments des médias (images/vidéos) sur la page.
  const mediaItems = document.querySelectorAll('.media-item');
  mediaItems.forEach((item) => {
    // On supprime tout événement déjà attaché pour éviter les doublons.
    item.removeEventListener('click', handleMediaItemClick);
    // On attache l'événement de clic sur chaque média pour l'ouvrir dans le carrousel.
    item.addEventListener('click', (event) => handleMediaItemClick(event, medias));
  });
}

// Fonction pour gérer les likes. Lorsque l'utilisateur clique sur un bouton de like, le nombre de likes est mis à jour.
function attachLikeEvents(photographer, medias) {
  const likeButtons = document.querySelectorAll('.likes');
  likeButtons.forEach((button) => {
    // Pour chaque bouton de like, on écoute l'événement de clic.
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Empêche l'événement de se propager au parent (par exemple, pour éviter d'ouvrir la lightbox par erreur).
      const mediaId = parseInt(button.getAttribute("data-id"));
      // On met à jour le nombre de likes pour le média cliqué.
      const updatedMedias = medias.map(media => {
        if (media.id === mediaId) {
          return { ...media, likes: media.likes + 1 };
        }
        return media;
      });
      // On réaffiche la page avec les likes mis à jour.
      displayPage(photographer, updatedMedias, -1); 
    });
  });
}

// Fonction qui gère l'ouverture d'un média dans le carrousel (lightbox) lors d'un clic sur un média.
function handleMediaItemClick(event, medias) {
  const mediaId = event.currentTarget.getAttribute('data-id');
  if (!mediaId) {
    console.error("No media ID found on the clicked item.");
    return;
  }
  // On trouve l'index du média cliqué.
  const currentIndex = medias.findIndex(media => media.id.toString() === mediaId);
  if (currentIndex === -1) {
    console.error("Media not found in medias array.");
    return;
  }
  console.log("handleMediaItemClick - currentIndex:", currentIndex);
  // On met à jour l'URL avec l'ID du média sélectionné.
  updateUrlWithMediaId(mediaId);
  const photographerId = new URLSearchParams(window.location.search).get('id');
  console.log("handleMediaItemClick - photographerId:", photographerId);
  // On affiche le carrousel pour ce média.
  NewCarrousel.render(medias, photographerId, currentIndex);
  document.getElementById('carouselContainer').style.display = 'block';
}

// Fonction qui met à jour l'URL avec l'ID du média sélectionné, afin que l'utilisateur puisse partager l'URL spécifique.
function updateUrlWithMediaId(mediaId) {
  const url = new URL(window.location);
  url.searchParams.set('mediaId', mediaId); // Ajoute ou met à jour le paramètre mediaId dans l'URL.
  window.history.pushState({}, '', url); // Met à jour l'URL sans recharger la page.
}
