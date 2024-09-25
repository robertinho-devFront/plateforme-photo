// Fonction asynchrone pour récupérer les médias associés à un photographe spécifique.
// Elle utilise l'ID du photographe pour filtrer les médias qui lui appartiennent.
export const fetchMediaForPhotographer = async (photographerId) => {
  try {
    // Requête pour récupérer les données depuis le fichier JSON local "photographers.json"
    const response = await fetch("data/photographers.json");
    // Conversion des données récupérées en format JSON.
    const data = await response.json();
    
    // Retourne uniquement les médias appartenant au photographe dont l'ID correspond à celui passé en argument.
    // Utilise la méthode filter pour sélectionner les médias où `photographerId` correspond.
    return data.media.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );
  } catch (error) {
    // En cas d'erreur lors de la récupération des données, on affiche un message d'erreur et on retourne un tableau vide.
    console.error("Could not fetch media for photographer:", error);
    return [];
  }
};

// Fonction asynchrone pour récupérer la liste complète des photographes.
export const fetchPhotographers = async () => {
  try {
    // Requête pour récupérer les données depuis le fichier JSON local "photographers.json"
    const response = await fetch("data/photographers.json");
    // Conversion des données récupérées en format JSON.
    const data = await response.json();
    
    // Retourne uniquement la liste des photographes.
    return data.photographers;
  } catch (error) {
    // En cas d'erreur lors de la récupération des données, on affiche un message d'erreur et on retourne un tableau vide.
    console.error("Could not fetch photographers:", error);
    return [];
  }
};

// Fonction asynchrone pour récupérer les informations d'un photographe à partir de son ID.
export const getPhotographerById = async (id) => {
  // Récupère la liste complète des photographes en appelant la fonction fetchPhotographers.
  const photographersData = await fetchPhotographers();
  // Recherche le photographe dont l'ID correspond à celui passé en argument.
  // La méthode find permet de renvoyer le premier photographe trouvé dont l'ID correspond.
  const photographer = photographersData.find((p) => p.id.toString() === id.toString());
  
  // Retourne les informations du photographe trouvé.
  return photographer;
};

// Fonction utilitaire pour générer le nom du dossier du photographe à partir de son nom.
// Cette fonction est utilisée pour créer un chemin vers les fichiers du photographe.
const getFolderNameFromPhotographerName = (photographerName) => {
  // Vérifie si le nom du photographe est bien une chaîne de caractères.
  if (typeof photographerName !== 'string') {
    console.error("photographerName is not a string:", photographerName);
    return '';
  }

  // Divise le nom en plusieurs mots s'il contient des espaces.
  const words = photographerName.split(" ");
  // Pour chaque mot, on applique les opérations suivantes :
  // - Si le mot contient un tiret (par exemple : "Jean-Paul"), on le divise en parties séparées par le tiret.
  // - On met la première lettre de chaque partie en majuscule.
  const capitalizedWords = words.map(word => {
    const hyphenatedParts = word.split("-");
    const capitalizedHyphenatedParts = hyphenatedParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return capitalizedHyphenatedParts.join("-");
  });
  
  // On assemble ensuite les mots avec des tirets pour former le nom du dossier.
  const folderName = capitalizedWords.join("-");
  console.log("Converted folder name:", folderName); // Affiche le nom du dossier converti pour faciliter le débogage.
  
  // Retourne le nom du dossier résultant.
  return folderName;
};
