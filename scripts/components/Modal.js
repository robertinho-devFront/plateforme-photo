export const render = (photographerName = "") => {
  return `
    <div class="modal" id="contactModal" style="display:none;">
      <div class="modal-content">
        <h2 class="modal-title">Contactez Moi</h2>
        <h3 class="modal-title">${photographerName}</h3>  <!-- Ajouter le nom du photographe ici -->
        <span class="close-button" >&times;</span>
        <form id="contactForm">
          <label for="name"> Nom :</label>
          <input type="text" id="name" name="name" required>

          <label for="lastname"> Prénom :</label>
          <input type="text" id="lastname" name="lastname" required>
  
          <label for="email">Votre email :</label>
          <input type="email" id="email" name="email" required>
  
          <label for="message">Votre message :</label>
          <textarea id="message" name="message" required></textarea>
  
          <input type="submit" value="Envoyer">
        </form>
      </div>
    </div>
  `;
};

export const events = () => {
  const modal = document.querySelector("#contactModal");
  const openModalButton = document.querySelector("#openModalButton");
  const closeModalButton = document.querySelector(".close-button");

  if (openModalButton) {
    openModalButton.onclick = () => {
      modal.style.display = "block";
    };
  }

  if (closeModalButton) {
    closeModalButton.onclick = () => {
      modal.style.display = "none";
    };
  }

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Gestion de la fermeture de la modal avec la touche "Echap"
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.onsubmit = (event) => {
      event.preventDefault(); // Empêche la soumission réelle du formulaire

      alert("Message envoyé !"); // Action à effectuer après la soumission du formulaire
      modal.style.display = "none";
    };
  }
};

export default {
  render,
  events,
};
