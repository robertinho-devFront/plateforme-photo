

import {
  getPhotographerById,
  fetchMediaForPhotographer,
} from "../utils/api.js";
import Headline from "../components/headline.js";
import MediaFilters from "../components/MediaFilters.js";
import MediaLikes from "../components/MediaLikes.js";
import MediaGallery from "../components/MediaGallery.js";
import NewCarrousel from "../components/NewCarrousel.js";

async function loadData(photographerId) {
  try {
    const photographer = await getPhotographerById(photographerId);
    const medias = await fetchMediaForPhotographer(photographerId);
    if (photographer && medias) {
      displayPage(photographer, medias);
    } else {
      console.error("Failed to load photographer or media data.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");
  const mediaId = urlParams.get("mediaId");

  if (photographerId) {
    loadData(photographerId);
  } else {
    console.error("No photographer ID found in URL.");
  }
});

function displayPage(photographer, medias, mediaId) {
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
      likes: medias.reduce((total, currentMedia) => total + currentMedia.likes, 0),
    })}
    ${mediaId ? NewCarrousel.render(photographer.name, medias, mediaId) : ''}
  `;

  attachEvents(photographer, medias, mediaId);
}

function attachEvents(photographer, medias, mediaId) {
  console.log("Attaching events...");
  Headline.events();
  MediaFilters.events(photographer, medias);
  MediaGallery.events(photographer, medias);

  function onClickMedia(event) {
    const mediaId = event.currentTarget.dataset.id;
    const newUrl = `${window.location.origin}${window.location.pathname}?id=${photographer.id}&mediaId=${mediaId}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    NewCarrousel.render(photographer.name, medias, mediaId); // Assurez-vous de passer mediaId ici
    NewCarrousel.events(medias);
  }

  const mediaItems = document.querySelectorAll('.media-item');
  mediaItems.forEach(item => {
    item.addEventListener('click', function() {
      const mediaId = this.dataset.id;
      console.log("Media clicked:", mediaId);
      const newUrl = `${window.location.origin}${window.location.pathname}?id=${photographer.id}&mediaId=${mediaId}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
      NewCarrousel.render(photographer.name, medias, mediaId);
      NewCarrousel.events(medias);
    });
  });
}
