import Modal from './Modal.js';

export const render = ({ name, city, country, tagline, portrait }) => {
  return `
    <div class="headline">
      <div class="headline__photographer-informations">
        <h2 class="headline__photographer-informations__name">${name}</h2>
        <p class="headline__photographer-informations__location">${city}, ${country}</p>
        <p class="headline__photographer-informations__tagline">${tagline}</p>
      </div>
      <button class="headline__contact-button" id="openModalButton">Contactez-moi</button>
      <img class="headline__avatar" src="assets/images/Photographers-ID-Photos/${encodeURIComponent(
        portrait
      )}" alt="${name}" />
    </div>
   ${Modal.render()}
  `;
};

export const events = () => {
  Modal.events();
};

export default {
  render,
  events,
};


