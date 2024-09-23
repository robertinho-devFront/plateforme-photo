// Cette fonction génère le HTML correspondant à chaque photographe
// Elle encode le portrait pour éviter les erreurs d'URL et utilise des balises sémantiques
export const getPhotographerHTML = (photographer) => {
  const sanitizedPortrait = encodeURIComponent(photographer.portrait);

  return `
        <a href="photographer.html?id=${photographer.id}" class="photographer-article">
            <article>
                <!-- Portrait du photographe avec un alt pour l'accessibilité -->
                <img src="assets/images/Photographers-ID-Photos/${sanitizedPortrait}" alt="${photographer.name}" class="photographer-portrait"/>
               
                <!-- Informations du photographe (nom, localisation, slogan et prix) dans un article -->
                <section class="photographer-infos">
                    <h2 class="photographer_section-article-title">${photographer.name}</h2>
                    <p class="photographer-location">${photographer.city}, ${photographer.country}</p>
                    <p class="photographer-tagline">${photographer.tagline}</p>
                    <p class="photographer-price">${photographer.price}€/jour</p>
                </section>
            </article>
        </a>
    `;
};

// Cette fonction génère le HTML pour les médias (images ou vidéos) du photographe
// Utilisation de section et d'articles pour structurer le contenu et améliorer l'accessibilité
export const getMediaHTML = (media, folderName) => {
  const mediaType = media.image ? "image" : "video"; // On vérifie si le media est une image ou une vidéo
  const mediaFile = media.image || media.video; // On obtient le fichier associé au media
  const sanitizedMediaFile = encodeURIComponent(mediaFile);
  const sanitizedFolderName = encodeURIComponent(folderName);

  // Chemin de l'image ou vidéo
  const mediaPath =
    mediaType === "image"
      ? `assets/images/SamplePhotos/${sanitizedFolderName}/${sanitizedMediaFile}`
      : `assets/videos/${sanitizedFolderName}/${sanitizedMediaFile}`;

  return `
        <!-- Utilisation de section et article pour structurer chaque media -->
        <section class="media-item">
            <article>
                ${mediaType === "image"
      ? `<img src="${mediaPath}" alt="${media.title}" class="media-content"/>`
      : `<video controls class="media-content">
                    <source src="${mediaPath}" type="video/mp4">
          </video>`
    }
                <!-- Informations du media avec nombre de likes -->
                <div class="media-item-infos"> 
                    <h3>${media.title}</h3>
                    <p class="likes">${media.likes} 
                        <button class="like-button">
                            <img src="assets/images/favorite.png" alt="Icône de cœur rouge indiquant le nombre de likes">
                        </button>
                    </p>
                </div>
            </article>
        </section>
    `;
};
