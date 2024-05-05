export const fetchMediaForPhotographer = async (photographerId) => {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();

    return data.media.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );
  } catch (error) {
    console.error("Could not fetch media for photographer:", error);
    return [];
  }
};

export const fetchPhotographers = async () => {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    
    return data.photographers;
  } catch (error) {
    console.error("Could not fetch media for photographers:", error);
    return [];
  }
};

export const getPhotographerById = async (id) => {
  const photographersData = await fetchPhotographers();
  return photographersData.find((p) => p.id.toString() === id);
};
