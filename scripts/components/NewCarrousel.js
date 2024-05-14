import { getPhotographerById } from "../utils/api.js";

function getFolderNameFromPhotographerName(photographerName) {
    if (!photographerName) {
        console.error("Le nom du photographe est indéfini ou vide.");
        return 'default-folder';
    }
    return photographerName.split(" ").join("-").toLowerCase();
}



export const render = async (medias, photographerId) => {
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
            events(medias);  // Appel des événements après le rendu pour éviter les problèmes de timing.
        } else {
            console.error("Élément container du carrousel non trouvé dans le DOM.");
        }

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


};

export const events = (medias, currentIndex) => {
    const overlay = document.querySelector(".carousel-overlay");
    document.querySelector(".carousel-close").addEventListener("click", () => overlay.style.display = 'none');

    document.querySelector(".carousel-control.left").addEventListener("click", () => {
        const newIndex = (currentIndex + medias.length - 1) % medias.length;
        render(medias, newIndex);
    });

    document.querySelector(".carousel-control.right").addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % medias.length;
        render(medias, newIndex);
    });
    

    const leftButton = overlay.querySelector(".carousel-control.left");
    const rightButton = overlay.querySelector(".carousel-control.right");
    const closeButton = overlay.querySelector(".carousel-close");

    let currentMediaIndex = medias.findIndex(media => media.id.toString() === new URLSearchParams(window.location.search).get('mediaId'));

    closeButton.addEventListener("click", () => overlay.style.display = 'none');
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    leftButton.addEventListener("click", () => {
        currentMediaIndex = (currentMediaIndex + medias.length - 1) % medias.length;
        const newMedia = medias[currentMediaIndex];
        const newFilePath = `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(newMedia.photographer.name)}/${newMedia.image || newMedia.video}`;
        document.querySelector(".carousel-image").src = newFilePath;
    });

    rightButton.addEventListener("click", () => {
        currentMediaIndex = (currentMediaIndex + 1) % medias.length;
        const newMedia = medias[currentMediaIndex];
        const newFilePath = `assets/images/SamplePhotos/${getFolderNameFromPhotographerName(newMedia.photographer.name)}/${newMedia.image || newMedia.video}`;
        document.querySelector(".carousel-image").src = newFilePath;
    });
};

export default {
    render,
    events
};