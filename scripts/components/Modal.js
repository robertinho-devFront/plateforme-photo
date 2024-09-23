// Fonction qui génère le HTML pour la modal de contact
export const render = (photographerName = "") => {
  return `
    <div class="modal" id="contactModal" style="display:none;" role="dialog" aria-labelledby="contactModalTitle" aria-modal="true">
      <!-- Contenu de la modal, cachée par défaut avec display: none -->
      <div class="modal-content">
        <!-- Titre de la modal "Contactez Moi" avec aria-labelledby -->
        <h2 class="modal-title" id="contactModalTitle">Contactez Moi</h2>
        <!-- Nom du photographe ajouté dynamiquement pour personnaliser la modal -->
        <h3 class="modal-title">${photographerName}</h3>  
        
        <!-- Bouton de fermeture avec l'icône "X" et aria-label pour accessibilité -->
        <span class="close-button" aria-label="Fermer la fenêtre de contact">&times;</span>
        
        <!-- Formulaire de contact -->
        <form id="contactForm" novalidate> <!-- Ajout de l'attribut novalidate pour gérer la validation manuellement -->
          <!-- Champ pour le nom avec un label accessible et aria-required pour indiquer l'obligation -->
          <label for="name">Nom :</label>
          <input type="text" id="name" name="name" required aria-required="true" aria-label="Nom">
          
          <!-- Champ pour le prénom avec un label accessible -->
          <label for="lastname">Prénom :</label>
          <input type="text" id="lastname" name="lastname" required aria-required="true" aria-label="Prénom">
  
          <!-- Champ pour l'email avec une validation intégrée et une regex pour le format email -->
          <label for="email">Votre email :</label>
          <input type="email" id="email" name="email" required aria-required="true" aria-label="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$">
  
          <!-- Champ texte pour le message avec un aria-label -->
          <label for="message">Votre message :</label>
          <textarea id="message" name="message" required aria-required="true" aria-label="Message"></textarea>
  
          <!-- Bouton de soumission du formulaire -->
          <input type="submit" value="Envoyer" aria-label="Envoyer le formulaire">
        </form>
      </div>
    </div>
  `;
};

// Fonction qui gère les événements de la modal (ouverture, fermeture, soumission du formulaire)
export const events = () => {
  // Sélectionne la modal par son ID
  const modal = document.querySelector("#contactModal");

  // Sélectionne le bouton qui ouvre la modal
  const openModalButton = document.querySelector("#openModalButton");

  // Sélectionne le bouton "X" pour fermer la modal
  const closeModalButton = document.querySelector(".close-button");

  // Si le bouton pour ouvrir la modal est présent, on lui attache l'événement "onclick" pour afficher la modal
  if (openModalButton) {
    openModalButton.onclick = () => {
      modal.style.display = "block"; // Affiche la modal lorsque le bouton est cliqué
    };
  }

  // Si le bouton de fermeture est présent, on lui attache l'événement "onclick" pour cacher la modal
  if (closeModalButton) {
    closeModalButton.onclick = () => {
      modal.style.display = "none"; // Cache la modal lorsque le bouton de fermeture est cliqué
    };
  }

  // Ferme la modal lorsque l'utilisateur clique à l'extérieur du contenu de la modal
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none"; // Cache la modal si l'utilisateur clique en dehors
    }
  };

  // Permet la fermeture de la modal avec la touche "Echap"
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none"; // Cache la modal si l'utilisateur appuie sur "Escape"
    }
  });

  // Gestion de la soumission du formulaire
  const contactForm = document.querySelector("#contactForm");
  
  // Si le formulaire est présent dans la page, on attache un événement "onsubmit"
  if (contactForm) {
    contactForm.onsubmit = (event) => {
      event.preventDefault(); // Empêche le comportement par défaut du formulaire (la soumission)

      // Récupération des valeurs des champs du formulaire
      const name = document.querySelector("#name").value;
      const lastname = document.querySelector("#lastname").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;

      // Affiche les valeurs des champs dans la console pour debug
      console.log("Nom :", name);
      console.log("Prénom :", lastname);
      console.log("Email :", email);
      console.log("Message :", message);

      // Validation supplémentaire si nécessaire (par exemple, format de l'email avec regex)
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(email)) {
        alert("Veuillez entrer un email valide.");
        return; // Empêche la fermeture de la modal si l'email est invalide
      }

      // Action personnalisée après la soumission (ici, une simple alerte pour simuler l'envoi)
      alert("Message envoyé !"); 
      
      // Ferme la modal après l'envoi du message
      modal.style.display = "none";
    };
  }
};

// On exporte la fonction render et la fonction events pour qu'elles soient utilisables ailleurs dans le projet
export default {
  render,
  events,
};
