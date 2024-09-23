import { displayPage } from "../pages/photographer.js";

// Fonction qui génère l'interface HTML pour le filtre des médias
export const render = () => {
  // Récupère les paramètres de l'URL pour savoir quel filtre est actuellement sélectionné
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // Par défaut, le filtre est défini sur "popularité"
  const filterBy = urlParams.get("filterBy") || "popularité";

  return `
    <div class="media-filter">
      <label id="filterBy-label" for="filterBy-options">Trier par</label> <!-- Ajout d'une étiquette avec id pour aria-labelledby -->
      <!-- Wrapper pour personnaliser le select -->
      <div class="custom-select-wrapper">
        <div class="custom-select" role="button" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="filterBy-label"> <!-- Role bouton avec ARIA pour accessibilité -->
          <!-- Déclencheur du menu déroulant avec un tabindex pour l'accessibilité clavier -->
          <div class="custom-select__trigger" tabindex="0" aria-labelledby="filterBy-label">
            <span>${filterBy}</span>
            <div class="arrow"></div>
          </div>
          <!-- Options du filtre, chaque option est accessible avec le clavier grâce à tabindex -->
          <div class="custom-options" role="listbox" id="filterBy-options"> <!-- Role listbox pour indiquer qu'il s'agit d'une liste de sélection -->
            <span class="custom-option" data-value="popularity" tabindex="0" role="option" aria-selected="false">Popularité</span>
            <span class="custom-option" data-value="date" tabindex="0" role="option" aria-selected="false">Date</span>
            <span class="custom-option" data-value="titre" tabindex="0" role="option" aria-selected="false">Titre</span>
          </div>
        </div>
      </div>
    </div>`;
};

// Fonction qui gère les événements liés au filtre des médias
export const events = (photographer, medias) => {
  // Sélection des éléments du DOM liés au filtre (le déclencheur et les options)
  const customSelect = document.querySelector(".custom-select");
  const trigger = customSelect.querySelector(".custom-select__trigger span");
  const options = customSelect.querySelectorAll(".custom-option");

  // Ouvre ou ferme le menu déroulant lorsqu'on clique sur le déclencheur
  customSelect.addEventListener("click", function() {
    this.classList.toggle("open");
    const isOpen = this.classList.contains("open");
    this.setAttribute("aria-expanded", isOpen); // Mise à jour de l'attribut ARIA pour indiquer si la liste est ouverte ou fermée
  });

  // Permet d'ouvrir/fermer le menu avec la touche "Entrée" ou "Espace" (pour l'accessibilité clavier)
  customSelect.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      this.classList.toggle("open");
      const isOpen = this.classList.contains("open");
      this.setAttribute("aria-expanded", isOpen);
    }
  });

  // Pour chaque option, on attache un événement qui :
  // 1. Met à jour l'interface avec l'option choisie.
  // 2. Trie les médias selon l'option choisie.
  for (const option of options) {
    option.addEventListener("click", function() {
      // Met à jour le texte affiché dans le déclencheur
      trigger.textContent = this.textContent;
      customSelect.classList.remove("open"); // Ferme le menu déroulant
      customSelect.setAttribute("aria-expanded", "false");

      // Trie les médias selon la valeur sélectionnée
      const sortedMedias = sortMedia(medias, this.dataset.value);

      // Met à jour l'URL avec le nouveau filtre sélectionné
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("filterBy", this.dataset.value);

      // Génère une nouvelle URL pour refléter le tri sélectionné
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
      window.history.pushState({ path: newUrl }, '', newUrl); // Met à jour l'URL sans recharger la page

      // Recharge la page avec les médias triés
      displayPage(photographer, sortedMedias, -1); // Reset l'index après la mise à jour du tri
    });

    // Permet de sélectionner une option avec la touche "Entrée" ou "Espace" (accessibilité clavier)
    option.addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        trigger.textContent = this.textContent;
        customSelect.classList.remove("open");
        customSelect.setAttribute("aria-expanded", "false");

        const sortedMedias = sortMedia(medias, this.dataset.value);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("filterBy", this.dataset.value);

        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
        window.history.pushState({ path: newUrl }, '', newUrl);

        displayPage(photographer, sortedMedias, -1);
      }
    });
  }

  // Ferme le menu déroulant si l'utilisateur clique en dehors du sélecteur
  window.addEventListener("click", function(e) {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("open");
      customSelect.setAttribute("aria-expanded", "false");
    }
  });
};

// Fonction utilitaire pour trier les médias selon le critère sélectionné
const sortMedia = (medias, sortBy) => {
  switch (sortBy) {
    case "popularité":
      return medias.sort((a, b) => b.likes - a.likes); // Trie par popularité décroissante (likes)
    case "title":
      return medias.sort((a, b) => a.title.localeCompare(b.title)); // Trie par ordre alphabétique des titres
    case "date":
      return medias.sort((a, b) => new Date(b.date) - new Date(a.date)); // Trie par date décroissante
    default:
      return medias; // Retourne les médias non triés si aucune option valide n'est choisie
  }
};

// Export des fonctions render et events pour qu'elles puissent être utilisées ailleurs dans le projet
export default {
  render,
  events,
};
