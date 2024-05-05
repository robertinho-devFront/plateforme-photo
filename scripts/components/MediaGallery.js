import Media from "./Media.js";

export const render = (photographerName, medias) => {
  return `
    <div class="gallery">
      ${medias.map((media) => Media.render(media, photographerName)).join("")}
    </div>
  `;
};

export const events = (photographer, medias) => {
  Media.events(photographer, medias);
};

export default {
  render,
  events,
};

