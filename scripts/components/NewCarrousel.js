import { getPhotographerById } from "../utils/api.js";

export const getFolderNameFromPhotographerName = (photographerName) => {
    if (typeof photographerName !== 'string') {
      console.error("photographerName is not a string:", photographerName);
      return ''; // Ou une autre valeur par défaut appropriée
    }
    
    // Sépare les mots, capitalise le premier caractère de chaque mot et rejoint avec un tiret
    return photographerName
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("-");
  };


export const render = async (medias, photographerId) => {
    const mediaId = new URLSearchParams(window.location.search).get('mediaId');
    if (!mediaId) {
        console.error("Aucun ID média fourni dans l'URL.");
        document.querySelector("#carouselContainer").innerHTML = "<p>No media ID provided.</p>";
        return '';
    }

    const selectedMedia = medias.find(media => media.id.toString() === mediaId);
    if (!selectedMedia) {
        console.error("Aucun média sélectionné ou trouvé.");
        document.querySelector("#carouselContainer").innerHTML = "<p>Selected media not found.</p>";
        return '';
    }

    const photographer = await getPhotographerById(photographerId);
    if (!photographer) {
        console.error("Photographe non trouvé.");
        return '';  // Cette ligne retourne immédiatement une chaîne vide si le photographe n'est pas trouvé.
    }

    const folderName = getFolderNameFromPhotographerName(photographer.name);
    const mediaFile = selectedMedia.image || selectedMedia.video;
    const filePath = `assets/images/SamplePhotos/${folderName}/${mediaFile}`;

        // Ici, nous insérons directement le HTML dans le DOM après avoir vérifié que le container existe.
        const carouselContainer = document.querySelector("#carouselContainer");
        if (carouselContainer) {
            carouselContainer.innerHTML = `
                <div class="carousel-overlay">
                    <div class="carousel">
                        <button class="carousel-close">✖</button>
                        <button class="carousel-control left">←</button>
                        <img src="${filePath}" alt="${selectedMedia.title}" class="carousel-image">
                        <button class="carousel-control right">→</button>
                    </div>
                </div>
            `;
            console.log("Carousel content inserted");
    const img = document.querySelector(".carousel-image");
    if (img && img.complete) {
        console.log("Image loaded successfully");
    } else {
        console.log("Image not loaded");
    }
    carouselContainer.style.display = 'block';
    events(medias);  // Assurez-vous que cette fonction est appelée après l'insertion
} else {
    console.error("Élément container du carrousel non trouvé dans le DOM.");
}



};

export const events = (medias, currentIndex = 0) => {
    const overlay = document.querySelector(".carousel-overlay");
    const closeButton = document.querySelector(".carousel-close");
    const leftButton = document.querySelector(".carousel-control.left");
    const rightButton = document.querySelector(".carousel-control.right");

    if (!overlay || !closeButton || !leftButton || !rightButton) {
        console.log("One or more elements are missing:");
        console.log({overlay, closeButton, leftButton, rightButton});
        return;
    }

    closeButton.addEventListener("click", () => overlay.style.display = 'none');
    leftButton.addEventListener("click", () => {
        const newIndex = (currentIndex + medias.length - 1) % medias.length;
        render(medias, newIndex);
    });
    rightButton.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % medias.length;
        render(medias, newIndex);
    });
};

export default {
    render,
    events
};