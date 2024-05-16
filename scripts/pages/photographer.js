// // import {
// //   getPhotographerHTML,
  
// // } from "../templates/photographer.js";

// import {
//   getPhotographerById,
//   fetchMediaForPhotographer,
// } from "../utils/api.js";



// // import { render as CarrouselRender, events as CarrouselEvents } from '../components/NewCarrousel.js';

// import Headline from '../components/headline.js'; 
// import MediaFilters from '../components/MediaFilters.js';
// import MediaLikes from '../components/MediaLikes.js';
// import MediaGallery from "../components/MediaGallery.js";
// // import Carrousel from '../components/NewCarrousel.js';

// function updateUrlWithMediaId(mediaId) {
//   const url = new URL(window.location);
//   url.searchParams.set('mediaId', mediaId);
//   window.history.pushState({}, '', url);
// }

// const attachEvents = (photographer, medias) => {
//   Headline.events();
//   MediaFilters.events(photographer, medias);
//   MediaGallery.events(photographer, medias);
//   attachCarrouselEvents(medias);
// };



// // function handleMediaItemClick(event, medias) {
// //   const mediaId = event.currentTarget.getAttribute('data-id');
// //   if (!mediaId) {
// //     console.error("No media ID found on the clicked item.");
// //     return;
// //   }
// //   updateUrlWithMediaId(mediaId);
// //   updateCarrousel(mediaId, medias);
// // }
// function handleMediaItemClick(event, medias) {
//   const mediaId = event.currentTarget.getAttribute('data-id');
//   if (!mediaId) {
//     console.error("No media ID found on the clicked item.");
//     return;
//   }
//   updateUrlWithMediaId(mediaId);
//   updateCarrousel(mediaId, medias);
// }

// // function updateCarrousel(mediaId, medias) {
// //   const selectedMediaIndex = medias.findIndex(media => media.id.toString() === mediaId);
// //   if (selectedMediaIndex === -1) {
// //     console.error("Media not found with ID:", mediaId);
// //     return; // Sortie précoce si aucun média correspondant n'est trouvé
// //   }
// //   const carrouselHTML = Carrousel.render(medias, selectedMediaIndex);
// //   const carrouselContainer = document.querySelector('#carrouselContainer');
// //   carrouselContainer.innerHTML = carrouselHTML;
// //   carrouselContainer.style.display = 'block';
// //   Carrousel.events(medias, selectedMediaIndex);
// // }

// // function updateCarrousel(mediaId, medias) {
// //   if (!medias || !Array.isArray(medias)) {
// //       console.error("Invalid or undefined media array provided to updateCarrousel");
// //       return;
// //   }
  
// //   const selectedMediaIndex = medias.findIndex(media => media.id.toString() === mediaId);
// //   if (selectedMediaIndex === -1) {
// //       console.error("Media not found with ID:", mediaId);
// //       return; // Sortie précoce si aucun média correspondant n'est trouvé
// //   }
// //   const carrouselHTML = CarrouselRender(medias, selectedMediaIndex);
// //   const carrouselContainer = document.querySelector('#carrouselContainer');
// //   carrouselContainer.innerHTML = carrouselHTML;
// //   carrouselContainer.style.display = 'block';
// //   CarrouselEvents(medias, selectedMediaIndex);
// // }

// document.addEventListener("DOMContentLoaded", async () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const photographerId = urlParams.get("id");

//   if (photographerId) {
//     const photographer = await getPhotographerById(photographerId);
//     const medias = await fetchMediaForPhotographer(photographerId);
//     if (photographer && medias) {
//       displayPage(photographer, medias);
//     } else {
//       console.error("Failed to load photographer or media data.");
//     }
//   } else {
//     console.error("Photographer ID not found in URL.");
//   }
// });
// function updateCarrousel(mediaId, medias) {
//   const selectedMediaIndex = medias.findIndex(media => media.id.toString() === mediaId);
//   if (selectedMediaIndex === -1) {
//     console.error("Media not found with ID:", mediaId);
//     return; // Sortie précoce si le média n'est pas trouvé
//   }
//   const carrouselHTML = CarrouselRender(medias, selectedMediaIndex);
//   const carrouselContainer = document.querySelector('#carrouselContainer');
//   if (carrouselContainer) {
//     carrouselContainer.innerHTML = carrouselHTML;
//     carrouselContainer.style.display = 'block';
//     if (CarrouselEvents && typeof CarrouselEvents === 'function') {
//       CarrouselEvents(medias, selectedMediaIndex); // Assurez-vous que cette fonction est correctement définie
//     }
//   } else {
//     console.error("Carousel container not found in the DOM.");
//   }
// }

// // function updateCarrousel(mediaId, medias) {
// //   const selectedMediaIndex = medias.findIndex(media => media.id.toString() === mediaId);
// //   if (selectedMediaIndex === -1) {
// //     console.error("Media not found with ID:", mediaId);
// //     return;
// //   }
// //   const carrouselHTML = CarrouselRender(medias, selectedMediaIndex);
// //   const carrouselContainer = document.querySelector('#carrouselContainer');
// //   carrouselContainer.innerHTML = carrouselHTML;
// //   carrouselContainer.style.display = 'block';
// //  // S'assurer que le carrousel est entièrement chargé dans le DOM avant d'ajouter des événements
// //   setTimeout(() => {
// //     CarrouselEvents(medias, selectedMediaIndex);
// //   }, 0);
// // }

// // const attachCarrouselEvents = (medias) => {
// //   const images = document.querySelectorAll('.media-item'); // Assurez-vous que c'est la bonne classe pour vos images
// //   images.forEach((image, index) => {
// //     image.addEventListener('click', () => {
// //       const carrouselHTML = Carrousel.render(medias, index); // Assurez-vous que Carrousel.render peut accepter index
// //       const carrouselContainer = document.querySelector('#carrouselContainer');
// //       carrouselContainer.innerHTML = carrouselHTML;
// //       carrouselContainer.style.display = 'block';
// //       Carrousel.events(medias, index); // Passez l'index si nécessaire pour les contrôles
// //     });
// //   });
// // };

// // const attachCarrouselEvents = (photographer, medias) => {
// //   const mediaItems = document.querySelectorAll('.media-item');
// //   mediaItems.forEach((item) => {
// //     item.removeEventListener('click', handleMediaItemClick);
// //     item.addEventListener('click', (event) => handleMediaItemClick(event, medias));
// //   });
// // };
// function attachCarrouselEvents(photographer, medias) {
//   const mediaItems = document.querySelectorAll('.media-item');
//   mediaItems.forEach((item) => {
//     item.removeEventListener('click', handleMediaItemClick); // Nettoyer les anciens événements s'il y en a
//     item.addEventListener('click', (event) => handleMediaItemClick(event, medias));
//   });
// };

// export const displayPage = (photographer, medias) => {
//   const mainElement = document.querySelector("#main");
//   // const photographerDetailsHTML = getPhotographerHTML(photographer);
//   // const mediaId = new URLSearchParams(window.location.search).get('mediaId');

//   mainElement.innerHTML = `
//     ${Headline.render(photographer)}
//     ${MediaFilters.render()}
//     ${MediaGallery.render(photographer.name, medias)}
//     ${MediaLikes.render({
//       price: photographer.price,
//       likes: medias.reduce((total, curentMedia) => {
//         return total + curentMedia.likes
//       }, 0)
//     })}
//     <div id="carrouselContainer" style="display: none;"></div>
//   `;

//   if (medias) {
//     const mediaId = new URLSearchParams(window.location.search).get('mediaId');
//     if (mediaId) {
//       const selectedMediaIndex = medias.findIndex(media => media.id.toString() === mediaId);
//       if (selectedMediaIndex !== -1) {
//         const carrouselHTML = CarrouselRender(medias, selectedMediaIndex);
//         const carrouselContainer = document.querySelector('#carrouselContainer');
//         carrouselContainer.innerHTML = carrouselHTML;
//         carrouselContainer.style.display = 'block';
//         CarrouselEvents(medias, selectedMediaIndex);
//       }
//     }
//   }

//   // ici , repartir de la meme logique  => render ensuite events , 2 types 

//   attachEvents(photographer, medias);
// };

// // document.addEventListener("DOMContentLoaded", async () => {
// //   const queryString = window.location.search;
// //   const urlParams = new URLSearchParams(queryString);
// //   const photographerId = urlParams.get("id");

// //   if (photographerId) {
// //     const photographer = await getPhotographerById(photographerId);
// //     const medias = await fetchMediaForPhotographer(photographerId);
// //     if (photographer && medias) {
// //       displayPage(photographer, medias);
// //     }
// //   }
// // });



import {
  getPhotographerById,
  fetchMediaForPhotographer,
} from "../utils/api.js";
import Headline from '../components/Headline.js'; 
import MediaFilters from '../components/MediaFilters.js';
import MediaLikes from '../components/MediaLikes.js';
import MediaGallery from "../components/MediaGallery.js";
import NewCarrousel from '../components/NewCarrousel.js';

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");
  const mediaId = urlParams.get('mediaId');

  console.log("Photographer ID:", photographerId);
  console.log("Media ID from URL:", mediaId);

  if (!photographerId) {
    console.error("Photographer ID not found in URL.");
    return;
  }

  try {
    const photographer = await getPhotographerById(photographerId);
    console.log("Photographer fetched:", photographer); // Debugging line
    const medias = await fetchMediaForPhotographer(photographerId);
    if (!photographer || !medias) {
      console.error("Failed to load photographer or media data.");
      return;
    }
    const currentIndex = mediaId ? medias.findIndex(media => media.id.toString() === mediaId) : -1;
    displayPage(photographer, medias, currentIndex);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

export function displayPage(photographer, medias, currentIndex) {
  const mainElement = document.querySelector("#main");

  if (!mainElement) {
    console.error("Main element not found in the DOM");
    return;
  }

  mainElement.innerHTML = `
    ${Headline.render(photographer)}
    ${MediaFilters.render()}
    ${MediaGallery.render(photographer.name, medias)}
    ${MediaLikes.render({
      price: photographer.price,
      likes: medias.reduce((total, currentMedia) => total + currentMedia.likes, 0)
    })}
    <div id="carouselContainer" style="display: none;"></div>
  `;

  if (currentIndex !== -1) {
    NewCarrousel.render(medias, photographer.id, currentIndex);
  }

  attachEvents(photographer, medias);
}

function attachEvents(photographer, medias) {
  Headline.events();
  MediaFilters.events(photographer, medias);
  MediaGallery.events(photographer, medias);
  attachCarouselEvents(medias);
}

function attachCarouselEvents(medias) {
  const mediaItems = document.querySelectorAll('.media-item');
  mediaItems.forEach((item) => {
    item.addEventListener('click', (event) => handleMediaItemClick(event, medias));
  });
}

function handleMediaItemClick(event, medias) {
  const mediaId = event.currentTarget.getAttribute('data-id');
  if (!mediaId) {
      console.error("No media ID found on the clicked item.");
      return;
  }
  const currentIndex = medias.findIndex(media => media.id.toString() === mediaId);
  updateUrlWithMediaId(mediaId);
  const photographerId = new URLSearchParams(window.location.search).get('id');
  console.log("handleMediaItemClick - photographerId:", photographerId); // Debugging line
  NewCarrousel.render(medias, photographerId, currentIndex);
}

function updateUrlWithMediaId(mediaId) {
  const url = new URL(window.location);
  url.searchParams.set('mediaId', mediaId);
  window.history.pushState({}, '', url);
}