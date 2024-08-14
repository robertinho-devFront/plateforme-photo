import { displayPage } from "../pages/photographer.js";

export const render = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const filterBy = urlParams.get("filterBy") || "popularity";

  return `
    <div class="media-filter">
      <p>Trier par</p>
      <div class="custom-select-wrapper">
        <div class="custom-select">
          <div class="custom-select__trigger" tabindex="0">
            <span>${filterBy}</span>
            <div class="arrow"></div>
          </div>
          <div class="custom-options">
            <span class="custom-option" data-value="popularity" tabindex="0">Popularité</span>
            <span class="custom-option" data-value="date" tabindex="0">Date</span>
            <span class="custom-option" data-value="titre" tabindex="0">Titre</span>
          </div>
        </div>
      </div>
    </div>`;
};

export const events = (photographer, medias) => {
  const customSelect = document.querySelector(".custom-select");
  const trigger = customSelect.querySelector(".custom-select__trigger span");
  const options = customSelect.querySelectorAll(".custom-option");

  customSelect.addEventListener("click", function() {
    this.classList.toggle("open");
  });

  customSelect.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      this.classList.toggle("open");
    }
  });

  for (const option of options) {
    option.addEventListener("click", function() {
      trigger.textContent = this.textContent;
      customSelect.classList.remove("open");
      const sortedMedias = sortMedia(medias, this.dataset.value);

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("filterBy", this.dataset.value);

      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
      window.history.pushState({path: newUrl}, '', newUrl);

      displayPage(photographer, sortedMedias, -1); // Reset currentIndex after filter update
    });
    option.addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        trigger.textContent = this.textContent;
        customSelect.classList.remove("open");
        const sortedMedias = sortMedia(medias, this.dataset.value);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("filterBy", this.dataset.value);

        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
        window.history.pushState({path: newUrl}, '', newUrl);

        displayPage(photographer, sortedMedias, -1); // Reset currentIndex after filter update
      }
    });
  }

  window.addEventListener("click", function(e) {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("open");
    }
  });
};

const sortMedia = (medias, sortBy) => {
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
};

export default {
  render,
  events,
};