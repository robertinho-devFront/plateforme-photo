import { getPhotographerById } from "../utils/api.js";

export const getFolderNameFromPhotographerName = (photographerName) => {
    if (typeof photographerName !== 'string') {
        console.error("photographerName is not a string:", photographerName);
        return '';
    }
    return photographerName.split(" ").join("-").toLowerCase();
};

export const render = async (medias, photographerId, currentIndex) => {
    console.log("render - photographerId:", photographerId); // Debugging line
    const selectedMedia = medias[currentIndex];
    if (!selectedMedia) {
        console.error("Aucun média sélectionné ou trouvé.");
        document.querySelector("#carouselContainer").innerHTML = "<p>Selected media not found.</p>";
        return '';
    }

    let photographer;
    try {
        photographer = await getPhotographerById(photographerId);
        console.log("Photographer data fetched in NewCarrousel.js:", photographer); // Debugging line
    } catch (error) {
        console.error("Erreur lors de la récupération du photographe:", error);
        return '';
    }

    if (!photographer) {
        console.error("Photographe non trouvé.");
        return '';
    }

    const folderName = getFolderNameFromPhotographerName(photographer.name);
    const mediaFile = selectedMedia.image || selectedMedia.video;
    const filePath = `assets/images/SamplePhotos/${folderName}/${mediaFile}`;

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
        carouselContainer.style.display = 'block';
        events(medias, currentIndex);
    } else {
        console.error("Élément container du carrousel non trouvé dans le DOM.");
    }
};

export const events = (medias, currentIndex) => {
    const overlay = document.querySelector(".carousel-overlay");
    const closeButton = document.querySelector(".carousel-close");
    const leftButton = document.querySelector(".carousel-control.left");
    const rightButton = document.querySelector(".carousel-control.right");

    if (!overlay || !closeButton || !leftButton || !rightButton) {
        console.log("One or more elements are missing:");
        console.log({ overlay, closeButton, leftButton, rightButton });
        return;
    }

    closeButton.addEventListener("click", () => overlay.style.display = 'none');
    leftButton.addEventListener("click", () => {
        const newIndex = (currentIndex + medias.length - 1) % medias.length;
        updateCarousel(medias, newIndex);
    });
    rightButton.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % medias.length;
        updateCarousel(medias, newIndex);
    });
};

const updateCarousel = (medias, newIndex) => {
    const newMediaId = medias[newIndex].id;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('mediaId', newMediaId);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

    const photographerId = new URLSearchParams(window.location.search).get('id');
    console.log("updateCarousel - photographerId:", photographerId); // Debugging line
    render(medias, photographerId, newIndex);
};

export default {
    render,
    events
};