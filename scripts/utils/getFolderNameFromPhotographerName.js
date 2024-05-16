export const getFolderNameFromPhotographerName = (photographerName) => {
  return photographerName
    .split(" ")
    .join("-")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("-")

};

export default getFolderNameFromPhotographerName;
