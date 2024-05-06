//import { displayPage } from "../pages/photographer.js";

 export const getFolderNameFromPhotographerName = (photographerName) => {
  if (typeof photographerName !== 'string') {
    console.error("photographerName is not a string:", photographerName);
    return ''; // Ou une autre valeur par défaut appropriée
  }
  return photographerName.split(" ").join("-").toLowerCase();
};

const render = (media, photographerName) => {
  const mediaType = media.image ? "image" : "video";
  const mediaFile = media.image || media.video;
  const sanitizedMediaFile = encodeURIComponent(mediaFile);
  const sanitizedFolderName = encodeURIComponent(
    getFolderNameFromPhotographerName(photographerName)
  );
  const mediaPath =
    mediaType === "image"
      ? `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`
      : `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`;

  return ` <div class="media-item" data-id="${ media.id}" data-media-type="${mediaType}">
            ${
              mediaType === "image"
                ? `<img src="${mediaPath}" alt="${media.title}" class="media-content"/>`
                : `<video controls class="media-content">
                    <source src="${mediaPath}" type="video/mp4">
                    brrrr fait le bowser
                  </video>`
            }
            <div class="media-item-infos"> 
              <h3>${media.title}</h3>
              <button class="likes" id="button-like-${media.id}" data-id="${media.id}">
                ${media.likes}
                <img src="assets/images/favorite.png" alt="red-heart">
              </button>
            </div>
          </div>`;
};


const events = (photographer, medias) => {
  const mediaItems = document.querySelectorAll(".media-item");

  // mediaItems.forEach(item => {
  //   item.addEventListener("click", () => {
  //     const mediaId = parseInt(item.getAttribute("data-id"));
  //     const currentIndex = medias.findIndex(m => m.id === mediaId);
  //     document.body.innerHTML += Carousel.render(medias, currentIndex);
  //     Carousel.events(medias, currentIndex);

  //     /* url base carousel */ 
  //     // 1. getMedia Id
  //     // 2. modify query param (mediaId)
  //     // 3. call displayPage(photographer, medias);

  //     /* js based */
  //     // 1 get mediaId
  //     // 2 call specific function from carousel with the mediaId
  //     // 3 call displayPage(photographer, medias, currentMediaId) should add a parameter to pass down to the carousel render
  //   });
  // });

  const likeButtons = document.querySelectorAll(".likes");

  likeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation(); 
      const mediaId = parseInt(button.getAttribute("data-id"));
      const updatedMedias = medias.map(media => {
        if (media.id === mediaId) {
          return { ...media, likes: media.likes + 1 };
        }
        return media;
      });

      displayPage(photographer, updatedMedias);
    });
  });
};

export default {
  render,
  events,
};
