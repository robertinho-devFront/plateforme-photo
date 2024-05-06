


// export const getFolderNameFromPhotographerName = (photographerName) => {
//   if (typeof photographerName !== 'string') {
//     console.error("photographerName is not a string:", photographerName);
//     return ''; // Ou une autre valeur par défaut appropriée
//   }
//   return photographerName.split(" ").join("-").toLowerCase();
// };

// export const render = (photographerName, medias) => {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const imageId = urlParams.get("imageId");

//   // const currentImage = medias.find(({id}) => id === Number(imageId));
//   const currentImage = medias.find(media => media.id === Number(mediaId));

//   if (!currentMedia) {
//     console.error("Selected media not found");
//     return '';
//   }

//   const isImage = Boolean(currentMedia.image);
//   const folderName = getFolderNameFromPhotographerName(photographerName);


// // Choix de l'affichage en fonction du type de média
//   const mediaPath = isImage ? 
//   `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(photographerName)}/${currentMedia.image}` :
//   `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(photographerName)}/${currentMedia.video}`;

//   const mediaTag = isImage ?
//   `<img src="${mediaPath}" alt="${currentMedia.title}" class="carousel-image">` :
//   `<video controls src="${mediaPath}" class="carousel-video"></video>`;
//   // 1. missing video
  
//   return `      
//     <div id="carrouselContainer_v2" style="position: fixed; z-index: ${!!currentImage ? 0 : -1}; display: flex; justify-content: center; align-items: center; top: 0; bottom: 0; left: 0; right: 0;">
//       <div class="carousel_v2" style="z-index: -1;" data-id="${currentImage.id}">
//         <button class="carousel-close_v2">✖</button>
//         <button class="carousel-control-v2 left_v2">←</button>
//         ${isImage ? `<img src="${`assets/images/SamplePhotos/${getFolderNameFromPhotographerName(photographerName)}/${currentImage.image}`}" alt="${currentImage.title}" class="carousel-image">` : `<video></video>`}
//         <button class="carousel-control_v2 right_v2">→</button>
//       </div>
//     </div>
//   `;
// }

// export const events = () => {
//   // 1. handle previous and next event 
//     // 1. get the current id from data-id 
//     // 2. depending on the even find the next or previous image
//     // 3. set the url (without reloading) + call displayPage 

//   // 2. Make sure when someone click on an image to set the url + display page (should be inside Media)

//   // 3. handle close -> remove param from url + displayPage

//   // 4. add the Carousel events in photagrephs


//   const overlay = document.querySelector('#carrouselContainer');
//   const closeButton = document.querySelector('.carousel-close');
//   const leftButton = document.querySelector('.carousel-control.left');
//   const rightButton = document.querySelector('.carousel-control.right');
//   let currentMediaIndex = medias.findIndex(media => media.id === Number(overlay.dataset.id));

//   const updateMediaDisplay = (newIndex) => {
//     const newMedia = medias[newIndex];
//     const isImage = Boolean(newMedia.image);
//     const mediaPath = isImage ?
//       `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(newMedia.photographerName)}/${newMedia.image}` :
//       `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(newMedia.photographerName)}/${newMedia.video}`;

//     const mediaTag = isImage ?
//       `<img src="${mediaPath}" alt="${newMedia.title}" class="carousel-image">` :
//       `<video controls src="${mediaPath}" class="carousel-video"></video>`;

//     overlay.querySelector('.carousel').innerHTML = `
//       <button class="carousel-close">✖</button>
//       <button class="carousel-control left">←</button>
//       ${mediaTag}
//       <button class="carousel-control right">→</button>
//     `;
//     overlay.dataset.id = newMedia.id.toString();
//     events(medias); // reattach event handlers
//   };

//   closeButton?.addEventListener('click', () => {
//     overlay.style.display = 'none';
//   });

//   leftButton?.addEventListener('click', () => {
//     if (currentMediaIndex > 0) {
//       updateMediaDisplay(--currentMediaIndex);
//     }
//   });

//   rightButton?.addEventListener('click', () => {
//     if (currentMediaIndex < medias.length - 1) {
//       updateMediaDisplay(++currentMediaIndex);
//     }
//   });

//   overlay.addEventListener('click', (event) => {
//     if (event.target === overlay) {
//       overlay.style.display = 'none';
//     }
//   });

//   // Reattach the events in case of innerHTML changes which remove all events
//   document.addEventListener('DOMContentLoaded', () => events(medias));

//   // Ajouter d'autres logiques pour les événements, si nécessaire
// }

// export default { render, events };

export const getFolderNameFromPhotographerName = (photographerName) => {
  return photographerName.split(" ").join("-").toLowerCase();
};

export const render = (photographerName, medias) => {
  const urlParams = new URLSearchParams(window.location.search);
  const mediaId = Number(urlParams.get("imageId"));
  const currentMedia = medias.find(media => media.id === mediaId);

  if (!currentMedia) {
    console.error("Selected media not found");
    return '';
  }

  const mediaType = currentMedia.image ? "image" : "video";
  const mediaPath = `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(photographerName)}/${currentMedia[mediaType]}`;
  const mediaTag = mediaType === "image" ?
    `<img src="${mediaPath}" alt="${currentMedia.title}" class="carousel-image">` :
    `<video controls src="${mediaPath}" class="carousel-video"></video>`;

  return `
    <div id="carrouselContainer" class="carousel-overlay" style="display: flex;">
      <div class="carousel-content" data-id="${currentMedia.id}">
        <button class="carousel-close">✖</button>
        <button class="carousel-control left">←</button>
        ${mediaTag}
        <button class="carousel-control right">→</button>
      </div>
    </div>
  `;
};

export const events = (medias) => {
  const overlay = document.querySelector('.carousel-overlay');
  const closeButton = document.querySelector('.carousel-close');
  const leftButton = document.querySelector('.carousel-control.left');
  const rightButton = document.querySelector('.carousel-control.right');
  let currentMediaIndex = medias.findIndex(media => media.id === Number(overlay.querySelector('.carousel-content').dataset.id));

  const updateMediaDisplay = (newIndex) => {
    const newMedia = medias[newIndex];
    const mediaType = newMedia.image ? "image" : "video";
    const mediaPath = `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(newMedia.photographerName)}/${newMedia[mediaType]}`;
    const mediaTag = mediaType === "image" ?
      `<img src="${mediaPath}" alt="${newMedia.title}" class="carousel-image">` :
      `<video controls src="${mediaPath}" class="carousel-video"></video>`;

    const carouselContent = document.querySelector('.carousel-content');
    carouselContent.innerHTML = `
      <button class="carousel-close">✖</button>
      <button class="carousel-control left">←</button>
      ${mediaTag}
      <button class="carousel-control right">→</button>
    `;
    carouselContent.dataset.id = newMedia.id.toString();
    attachEvents(medias);
  };

  const attachEvents = (medias) => {
    closeButton.addEventListener('click', () => overlay.style.display = 'none');
    leftButton.addEventListener('click', () => {
      if (currentMediaIndex > 0) updateMediaDisplay(--currentMediaIndex);
    });
    rightButton.addEventListener('click', () => {
      if (currentMediaIndex < medias.length - 1) updateMediaDisplay(++currentMediaIndex);
    });
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) overlay.style.display = 'none';
    });
  };

  attachEvents(medias);
};

export default { render, events };