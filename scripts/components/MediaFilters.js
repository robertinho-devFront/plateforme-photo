import { displayPage } from "../pages/photographer.js";

export const render = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const filterBy = urlParams.get("filterBy");

  return `
  <div class="media-filter">
    <p>Trier par</p>
    <select id="sortOptions" class="select-sortOptions">
    ${["popularity", "title", "date"].map(type => (
      `<option value="${type}" ${type === filterBy ? "selected" : ""}>${type}</option>`
    )).join("")}
    </select>
  </div>`;
};

export const events = (photographer, medias) => {
  const mediaFilterOptions = document.querySelector("#sortOptions");

  mediaFilterOptions.addEventListener('change', (event) => {
    const sortedMedias = sortMedia(medias, event.target.value);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filterBy",event.target.value);

    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams;
    window.history.pushState({path: newurl}, '', newurl);

    displayPage(photographer, sortedMedias); 
  });
};

const sortMedia = (medias, sortBy) =>{
  switch (sortBy) {
    case "popularity":
      return medias.sort((a, b) => b.likes - a.likes);
    case "title":
      return medias.sort((a, b) => a.title.localeCompare(b.title));
    case "date":
      return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    default:
      return medias;
  }
}

export default {
  render,
  events,
};