
// export const getFolderNameFromPhotographerName = (photographerName, medias, mediaId) => {
//   mediaId = Number(mediaId);
//   const currentMedia = medias.find(media => media.id === mediaId);

//   if (!currentMedia) {
//     console.error("Selected media not found");
//     return '';
//   }
//   if (!photographerName) {
//     console.error("Photographer name is undefined or empty.");
//     return 'default-folder';
//   }
//   return photographerName.split(" ").join("-").toLowerCase();
// };

// export const render = (photographerName, medias) => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const mediaId = Number(urlParams.get("imageId"));
//   //  mediaId = Number(mediaId);
//   const currentMedia = medias.find(media => media.id === mediaId);

//   if (!currentMedia) {
//     console.error("Selected media not found");
//     return '';
//   }

  
//   const mediaType = currentMedia.image ? "image" : "video";
//   const folderName = getFolderNameFromPhotographerName(photographerName);
//   const mediaPath = `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(photographerName)}/${currentMedia[mediaType]}`;
//   const mediaTag = mediaType === "image" ?
//     `<img src="${mediaPath}" alt="${currentMedia.title}" class="carousel-image">` :
//     `<video controls src="${mediaPath}" class="carousel-video"></video>`;

//   return `
//     <div id="carrouselContainer" class="carousel-overlay" style="display: flex;">
//       <div class="carousel-content" data-id="${currentMedia.id}">
//         <button class="carousel-close">✖</button>
//         <button class="carousel-control left">←</button>
//         ${mediaTag}
//         <button class="carousel-control right">→</button>
//       </div>
//     </div>
//   `;
// };

// export const events = (medias) => {
//   const overlay = document.querySelector('.carousel-overlay');
//   if (!overlay) {
//     console.error("Overlay element not found in the DOM.");
//     return;
//   }

//   const closeButton = document.querySelector('.carousel-close');
//   const leftButton = document.querySelector('.carousel-control.left');
//   const rightButton = document.querySelector('.carousel-control.right');
//   const carouselContent = overlay.querySelector('.carousel-content');

//   let currentMediaIndex = medias.findIndex(media => media.id === Number(carouselContent.dataset.id));


//   const updateMediaDisplay = (newIndex) => {
//     const newMedia = medias[newIndex];
//     const mediaType = newMedia.image ? "image" : "video";
//     const folderName = getFolderNameFromPhotographerName(newMedia.photographerName);
//     const mediaPath = `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(newMedia.photographerName)}/${newMedia[mediaType]}`;
//     // const mediaPath = `assets/images/SamplePhotos/${folderName}/${newMedia[mediaType]}`;
//     const mediaTag = mediaType === "image" ?
//       `<img src="${mediaPath}" alt="${newMedia.title}" class="carousel-image">` :
//       `<video controls src="${mediaPath}" class="carousel-video"></video>`;

//     const carouselContent = document.querySelector('.carousel-content');
//     carouselContent.innerHTML = `
//       <button class="carousel-close">✖</button>
//       <button class="carousel-control left">←</button>
//       ${mediaTag}
//       <button class="carousel-control right">→</button>
//     `;
//     carouselContent.dataset.id = newMedia.id.toString();
//     attachEvents(medias);
//   };

//   const attachEvents = (medias) => {
//     closeButton.addEventListener('click', () => overlay.style.display = 'none');
//     leftButton.addEventListener('click', () => {
//       if (currentMediaIndex > 0) updateMediaDisplay(--currentMediaIndex);
//     });
//     rightButton.addEventListener('click', () => {
//       if (currentMediaIndex < medias.length - 1) updateMediaDisplay(++currentMediaIndex);
//     });
//     overlay.addEventListener('click', (event) => {
//       if (event.target === overlay) overlay.style.display = 'none';
//     });
//   };

//   attachEvents(medias);
// };

// export default { render, events };

export const getFolderNameFromPhotographerName = (photographerName) => {
  if (!photographerName) {
    console.error("Photographer name is undefined or empty.");
    return 'default-folder';
  }
  return photographerName.split(" ").join("-").toLowerCase();
};

export const render = (photographerName, medias, mediaId) => {
  mediaId = Number(mediaId);
  const currentMedia = medias.find(media => media.id === mediaId);

  if (!currentMedia) {
    console.error("Selected media not found");
    return '';
  }

  const mediaType = currentMedia.image ? "image" : "video";
  const folderName = getFolderNameFromPhotographerName(photographerName);
  const mediaPath = `assets/images/SamplePhotos/${folderName}/${currentMedia[mediaType]}`;
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
  if (!overlay) {
    console.error("Overlay element not found in the DOM.");
    return;
  }

  const closeButton = overlay.querySelector('.carousel-close');
  const leftButton = overlay.querySelector('.carousel-control.left');
  const rightButton = overlay.querySelector('.carousel-control.right');
  const carouselContent = overlay.querySelector('.carousel-content');

  let currentMediaIndex = medias.findIndex(media => media.id === Number(carouselContent.dataset.id));

  const updateMediaDisplay = (newIndex) => {
    const newMedia = medias[newIndex];
    const mediaType = newMedia.image ? "image" : "video";
    const folderName = getFolderNameFromPhotographerName(newMedia.photographerName); // Utilisation de newMedia.photographerName
    const mediaPath = `assets/images/SamplePhotos/${folderName}/${newMedia[mediaType]}`;
    const mediaTag = mediaType === "image" ?
      `<img src="${mediaPath}" alt="${newMedia.title}" class="carousel-image">` :
      `<video controls src="${mediaPath}" class="carousel-video"></video>`;

    carouselContent.innerHTML = `
      <button class="carousel-close">✖</button>
      <button class="carousel-control left">←</button>
      ${mediaTag}
      <button class="carousel-control right">→</button>
    `;
    carouselContent.dataset.id = newMedia.id.toString();
    attachEvents(medias,newMedia.photographerName);
  };

  const attachEvents = (medias, photographerName) => {
    closeButton.addEventListener('click', () => overlay.style.display = 'none');
    leftButton.addEventListener('click', () => {
      // Vérifier si medias est défini et qu'il contient des éléments
      if (medias && medias.length > 0 && currentMediaIndex > 0) {
        updateMediaDisplay(--currentMediaIndex);
      }
    });
    rightButton.addEventListener('click', () => {
      // Vérifier si medias est défini et qu'il contient des éléments
      if (medias && medias.length > 0 && currentMediaIndex < medias.length - 1) {
        updateMediaDisplay(++currentMediaIndex);
      }
    });
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) overlay.style.display = 'none';
    });
  };

  attachEvents();
};

export default { render, events };