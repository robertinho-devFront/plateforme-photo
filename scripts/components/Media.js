import { displayPage } from "../pages/photographer.js";
import { getFolderNameFromPhotographerName } from "../utils/getFolderNameFromPhotographerName.js";


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

  return `
    <div class="media-item" data-id="${media.id}" data-media-type="${mediaType}">
      ${
        mediaType === "image"
          ? `<img src="${mediaPath}" alt="${media.title}" class="media-content"/>`
          : `<video controls class="media-content">
              <source src="${mediaPath}" type="video/mp4">
            </video>`
      }
      <div class="media-item-infos"> 
        <h3>${media.title}</h3>
        <button class="likes" id="button-like-${media.id}" data-id="${media.id}">
          ${media.likes}
          <img src="assets/images/favorite.png" alt="red-heart">
        </button>
      </div>
    </div>
  `;
};

const events = (photographer, medias) => {
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

      displayPage(photographer, updatedMedias, -1); // Reset currentIndex after like update
    });
  });
};

export default {
  render,
  events,
};
