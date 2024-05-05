export const render = () => {
    return `
        <div class="modal" id="contactModal" style="display:none;">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <form id="contactForm">
                    <label for="name">Votre nom :</label>
                    <input type="text" id="name" name="name" required>
  
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
    const openModalbutton = document.querySelector("#openModalButton");
    const closeModalButton = document.querySelector(".close-button")[0];
    const contactForm = document.querySelector("#contactForm");
  
    if (openModalbutton) {
      openModalbutton.onclick = function() {
        modal.style.display = "block";
      }
    }
  
    if (closeModalButton) {
      closeModalButton.onclick = function() {
        modal.style.display = "none";
      }
    }
  
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  
    if (contactForm) {
      contactForm.onsubmit = function(event) {
        event.preventDefault(); // Empêche la soumission réelle du formulaire pas necessaire
        
        alert('Message envoyé !'); // action
        modal.style.display = "none";
      }
    }
  };
  
  export default {
    render,
    events,
  };