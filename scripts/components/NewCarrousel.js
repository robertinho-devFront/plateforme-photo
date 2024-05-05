// const render = (medias) => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const filterBy = urlParams.get("mediaId");
// }

// const events = () => {

// }

// export default {
//  render,
//  events
// }


// export const render = (medias) => {
//     const mediaId = new URLSearchParams(window.location.search).get('mediaId');
//     const selectedMedia = medias.find(media => media.id.toString() === mediaId);
  
//     return `
//       <div class="carousel-overlay" 
//       style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
//         <div class="carousel">
//           <button class="carousel-close">✖</button>
//           <button class="carousel-control left">←</button>
//           <img src="${selectedMedia.imagePath}" alt="${selectedMedia.title}" class="carousel-image">
//           <button class="carousel-control right">→</button>
//         </div>
//       </div>
//     `;
//   };
  
//   export const events = (medias) => {
//     const overlay = document.querySelector('.carousel-overlay');
//     const leftButton = document.querySelector('.carousel-control.left');
//     const rightButton = document.querySelector('.carousel-control.right');
//     const closeButton = document.querySelector('.carousel-close');
//     let currentMediaIndex = medias.findIndex(media => media.id.toString() === new URLSearchParams(window.location.search).get('mediaId'));
  
//     closeButton.addEventListener('click', () => {
//       overlay.style.display = 'none';
//     });
  
//     overlay.addEventListener('click', (event) => {
//       if (event.target === overlay) {
//         overlay.style.display = 'none';
//       }
//     });
  
//     leftButton.addEventListener('click', (event) => {
//       event.stopPropagation();
//       currentMediaIndex = (currentMediaIndex + medias.length - 1) % medias.length;
//       document.querySelector('.carousel-image').src = medias[currentMediaIndex].imagePath;
//     });
  
//     rightButton.addEventListener('click', (event) => {
//       event.stopPropagation();
//       currentMediaIndex = (currentMediaIndex + 1) % medias.length;
//       document.querySelector('..carousel-image').src = medias[currentMediaIndex].imagePath;
//     });
//   };
  
//   export default {
//     render,
//     events
//   };

// export const render = (medias) => {
//     // Extraction de l'ID média de l'URL pour déterminer quel média afficher
//     const mediaId = new URLSearchParams(window.location.search).get('mediaId');
//     const selectedMedia = medias.find(media => media.id.toString() === mediaId);

//     if (!selectedMedia) {
//         console.error("Selected media not found");
//         return '';  // Retourner une chaîne vide si le média n'est pas trouvé
//     }

//     // Rendu du carrousel avec le média sélectionné
//     return `
//         <div class="carousel-overlay" 
//         style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
//             <div class="carousel">
//                 <button class="carousel-close">✖</button>
//                 <button class="carousel-control left">←</button>
//                 <img src="${selectedMedia.imagePath}" alt="${selectedMedia.title}" class="carousel-image">
//                 <button class="carousel-control right">→</button>
//             </div>
//         </div>
//     `;
// };



// export const render = (medias) => {
//     const mediaId = new URLSearchParams(window.location.search).get('mediaId');
//     const selectedMedia = medias.find(media => media.id.toString() === mediaId);

//     if (!selectedMedia) {
//         console.error("Selected media not found");
//         return '';  // Retourner une chaîne vide si le média n'est pas trouvé
//     }

//     // Ajout de la construction du chemin d'image
//     const imagePath = `/assets/images/SamplePhotos/${selectedMedia.filename}`;  // Assurez-vous que le nom de fichier est correct

//     // Rendu du carrousel avec le média sélectionné
//     return `
//         <div class="carousel-overlay" 
//         style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
//             <div class="carousel">
//                 <button class="carousel-close">✖</button>
//                 <button class="carousel-control left">←</button>
//                 <img src="${imagePath}" alt="${selectedMedia.title}" class="carousel-image">
//                 <button class="carousel-control right">→</button>
//             </div>
//         </div>
//     `;
// };

// export const events = (medias) => {
//     const overlay = document.querySelector('.carousel-overlay');
//     const leftButton = document.querySelector('.carousel-control.left');
//     const rightButton = document.querySelector('.carousel-control.right');
//     const closeButton = document.querySelector('.carousel-close');
//     let currentMediaIndex = medias.findIndex(media => media.id.toString() === new URLSearchParams(window.location.search).get('mediaId'));

//     // Gestion de la fermeture du carrousel
//     closeButton.addEventListener('click', () => {
//         overlay.style.display = 'none';
//     });

//     // Fermer le carrousel en cliquant en dehors de l'image
//     overlay.addEventListener('click', (event) => {
//         if (event.target === overlay) {
//             overlay.style.display = 'none';
//         }
//     });

//     // Navigation vers la gauche
//     leftButton.addEventListener('click', (event) => {
//         event.stopPropagation();
//         currentMediaIndex = (currentMediaIndex + medias.length - 1) % medias.length;
//         document.querySelector('.carousel-image').src = medias[currentMediaIndex].imagePath;
//     });

//     // Navigation vers la droite
//     rightButton.addEventListener('click', (event) => {
//         event.stopPropagation();
//         currentMediaIndex = (currentMediaIndex + 1) % medias.length;
//         document.querySelector('.carousel-image').src = medias[currentMediaIndex].imagePath;
//     });
// };

// export default {
//     render,
//     events
// };

// import { getFolderNameFromPhotographerName } from './Media.js';

//  const getFolderNameFromPhotographerName = (photographerName) => {
//     if (!photographerName) {
//         console.error("Photographer name is undefined or empty.");
//         return 'default-folder';  // Utilisez un nom de dossier par défaut ou gérez l'erreur comme il convient.
//     }
//     return photographerName.split(" ").join("-").toLowerCase();
// };

// Fonction pour rendre le carrousel
// export const render = (medias) => {
//     const mediaId = new URLSearchParams(window.location.search).get('mediaId');
//     const selectedMedia = medias.find(media => media.id.toString() === mediaId);

//     if (!selectedMedia || !selectedMedia.photographerName) {
//         console.error("Selected media not found");
//         return '';  // Retourner une chaîne vide si le média n'est pas trouvé
//     }

//     const folderName = getFolderNameFromPhotographerName(selectedMedia.photographerName);
//     console.log(`Folder Name: ${folderName}`);

//     const filePath = selectedMedia.image ?
//         `assets/images/SamplePhotos/${folderName}/${selectedMedia.image}` :
//         `assets/images/SamplePhotos/${folderName}/${selectedMedia.video}`;

//     // Correction: Utilisation de filePath pour l'image du carrousel
//     return `
//         <div class="carousel-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
//             <div class="carousel">
//                 <button class="carousel-close">✖</button>
//                 <button class="carousel-control left">←</button>
//                 <img src="${filePath}" alt="${selectedMedia.title}" class="carousel-image">
//                 <button class="carousel-control right">→</button>
//             </div>
//         </div>
//     `;
// };

// // Fonction pour gérer les événements du carrousel
// export const events = (medias) => {
//     const overlay = document.querySelector('.carousel-overlay');
//     const leftButton = document.querySelector('.carousel-control.left');
//     const rightButton = document.querySelector('.carousel-control.right');
//     const closeButton = document.querySelector('.carousel-close');
//     let currentMediaIndex = medias.findIndex(media => media.id.toString() === new URLSearchParams(window.location.search).get('mediaId'));

//     closeButton.addEventListener('click', () => {
//         overlay.style.display = 'none';
//     });

//     overlay.addEventListener('click', (event) => {
//         if (event.target === overlay) {
//             overlay.style.display = 'none';
//         }
//     });

//     leftButton.addEventListener('click', (event) => {
//         event.stopPropagation();
//         currentMediaIndex = (currentMediaIndex + medias.length - 1) % medias.length;
//         document.querySelector('.carousel-image').src = `/assets/images/SamplePhotos/${medias[currentMediaIndex].photographerId}/${medias[currentMediaIndex].image}`;
//     });

//     rightButton.addEventListener('click', (event) => {
//         event.stopPropagation();
//         currentMediaIndex = (currentMediaIndex + 1) % medias.length;
//         document.querySelector('.carousel-image').src = `/assets/images/SamplePhotos/${medias[currentMediaIndex].photographerId}/${medias[currentMediaIndex].image}`;
//     });
// };


// 2
// export const render = (medias, selectedMediaIndex, folderName) => {
//   if (!medias || !medias.length || selectedMediaIndex === -1) {
//     console.error("No media available or invalid media index.");
//     return '';
//   }

//   const selectedMedia = medias[selectedMediaIndex];
//   const imagePath = `/assets/images/SamplePhotos/${folderName}/${selectedMedia.filename}`;

//   return `
//     <div class="carousel-overlay">
//       <div class="carousel">
//         <button class="carousel-close">✖</button>
//         <button class="carousel-control left">←</button>
//         <img src="${filePath}" alt="${selectedMedia.title}" class="carousel-image">
//         <button class="carousel-control right">→</button>
//       </div>
//     </div>
//   `;
// };

// export const events = (medias, currentIndex) => {
//   const overlay = document.querySelector('.carousel-overlay');
//   const leftButton = document.querySelector('.carousel-control.left');
//   const rightButton = document.querySelector('.carousel-control.right');
//   const closeButton = document.querySelector('.carousel-close');

//   if (!overlay || !leftButton || !rightButton || !closeButton) {
//     console.error("Carousel elements not found in the DOM.");
//     return;
//   }

//   closeButton.addEventListener('click', () => {
//     overlay.style.display = 'none';
//   });

//   leftButton.addEventListener('click', () => {
//     const newIndex = (currentIndex + medias.length - 1) % medias.length;
//     document.querySelector('.carousel-image').src = `assets/images/${medias[newIndex].filename}`;
//     currentIndex = newIndex;
//   });

//   rightButton.addEventListener('click', () => {
//     const newIndex = (currentIndex + 1) % medias.length;
//     document.querySelector('.carousel-image').src = `assets/images/${medias[newIndex].filename}`;
//     currentIndex = newIndex;
//   });

//   overlay.addEventListener('click', (event) => {
//     if (event.target === overlay) {
//       overlay.style.display = 'none';
//     }
//   });
// };

import { getFolderNameFromPhotographerName } from './media.js';
import { getPhotographerById } from '../utils/api.js';

export const getPhotographerNameFromId = async (photographerId) => {
    // Utilisez getPhotographerById pour récupérer les informations du photographe à partir de son identifiant.
    const photographer = await getPhotographerById(photographerId);
    
    // Si le photographe est trouvé, retournez son nom, sinon retournez une chaîne vide.
    return photographer ? photographer.name : '';
};

const render = async (medias, photographerId) => {
    // Utilisez await pour attendre la résolution de la promesse
    const photographer = await getPhotographerById(photographerId);
    const photographerName = photographer.name; // Supposons que le nom du photographe est stocké dans une propriété "name"
    const currentMedia = medias[currentIndex];
    const mediaType = currentMedia.image ? "image" : "video";
    // const photographerName = getPhotographerNameFromId(currentMedia.photographerId);
    const folderName = getFolderNameFromPhotographerName(photographerName);
    const mediaPath = mediaType === "image" ?
        `assets/images/SamplePhotos/${folderName}/${currentMedia.image}` :
        `assets/images/SamplePhotos/${folderName}/${currentMedia.video}`;

    let carouselHTML = `<div class="carousel">`;
    medias.forEach(media => {
        const sanitizedFolderName = encodeURIComponent(getFolderNameFromPhotographerName(photographerName));
        const sanitizedMediaFile = encodeURIComponent(mediaType === "image" ? media.image : media.video);
        const mediaPath = `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`;
        carouselHTML += `<img src="${mediaPath}" alt="${media.title}">`;
    });
    carouselHTML += `</div>`;

    return carouselHTML;
};



const events = () => {
    const overlay = document.querySelector('.carousel-overlay');
    if (overlay) {
      const leftButton = document.querySelector('.carousel-control.left');
      const rightButton = document.querySelector('.carousel-control.right');
      const closeButton = document.querySelector('.carousel-close');
      
      // Ajouter des écouteurs d'événements uniquement si les éléments existent dans le DOM
      leftButton.addEventListener('click', (event) => {
        event.stopPropagation();
        currentMediaIndex = (currentMediaIndex + medias.length - 1) % medias.length;
        document.querySelector('.carousel-image').src = `/assets/images/SamplePhotos/${medias[currentMediaIndex].photographerId}/${medias[currentMediaIndex].image}`;
    });
  
    rightButton.addEventListener('click', (event) => {
        event.stopPropagation();
        currentMediaIndex = (currentMediaIndex + 1) % medias.length;
        document.querySelector('.carousel-image').src = `/assets/images/SamplePhotos/${medias[currentMediaIndex].photographerId}/${medias[currentMediaIndex].image}`;
    });
  
      closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
  
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          overlay.style.display = 'none';
        }
      });
    } else {
      console.error("Overlay element not found in the DOM.");
    }
  };

export default {
    render,
    events
};
