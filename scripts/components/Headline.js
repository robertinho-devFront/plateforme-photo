// Importation du module Modal pour afficher une fenêtre modale de contact
import Modal from './Modal.js';

// Fonction 'render' pour générer dynamiquement le contenu HTML du header et des informations du photographe
export const render = ({ name, city, country, tagline, portrait }) => {
  // Retourne une chaîne de caractères qui représente la structure HTML complète de la section de l'en-tête et des informations du photographe
  return `
    <header>
      <!-- Lien de retour à la page d'accueil avec un aria-label pour améliorer l'accessibilité -->
      <a href="index.html" aria-label="Retour à la page d'accueil">
        <!-- Image du logo avec une description explicite pour les lecteurs d'écran -->
        <img src="assets/images/logo.png" class="logo" alt="Fisheye Home page"/>
      </a>
    </header>

    <!-- Section qui contient les informations du photographe -->
    <div class="headline">
      <div class="headline__photographer-informations">
        <!-- Nom du photographe en titre, balise h2 pour indiquer une hiérarchie -->
        <h2 class="headline__photographer-informations__name">${name}</h2>
        <!-- Localisation du photographe : ville et pays -->
        <p class="headline__photographer-informations__location">${city}, ${country}</p>
        <!-- Slogan ou description courte du photographe -->
        <p class="headline__photographer-informations__tagline">${tagline}</p>
      </div>

      <!-- Bouton pour ouvrir la fenêtre de contact avec un aria-label pour les utilisateurs de lecteurs d'écran -->
      <button class="headline__contact-button" id="openModalButton" aria-label="Ouvrir la fenêtre de contact">
        Contactez-moi
      </button>

      <!-- Image de l'avatar du photographe avec une description alt explicite -->
      <img class="headline__avatar" src="assets/images/Photographers-ID-Photos/${encodeURIComponent(portrait)}" alt="Portrait de ${name}" />
    </div>

    <!-- Rendu du composant Modal pour afficher la fenêtre modale de contact -->
    ${Modal.render(name)}
  `;
};

// Fonction 'events' pour gérer les événements liés au composant Modal
export const events = () => {
  // Attache les événements du composant Modal (comme l'ouverture et la fermeture de la fenêtre modale)
  Modal.events();
};

// Lors du chargement complet de la page, on injecte la modal dans le DOM et on attache les événements correspondants
document.addEventListener("DOMContentLoaded", () => {
  // Ajoute le rendu de la modale à la fin du body
  document.body.innerHTML += Modal.render();
  // Active les événements de la modale (comme le clic pour ouvrir/fermer)
  Modal.events();
});

// Exportation de la fonction par défaut 'render' et 'events' pour une utilisation dans d'autres modules
export default {
  render,
  events,
};
