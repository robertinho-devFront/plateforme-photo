// export default class Carousel {
//     static render(medias, currentIndex) {
//         const currentMedia = medias[currentIndex];
//         return `
//             <div class="carousel">
//                 <div class="carousel-content">
//                     <span class="carousel-close">&times;</span>
//                     <button class="carousel-prev">&#10094;</button>
//                     <img src="${currentMedia.url}" alt="${currentMedia.title}" class="carousel-image">
//                     <button class="carousel-next">&#10095;</button>
//                 </div>
//             </div>
//         `;
//     }

//     static events(medias, currentIndex) {
//         const modal = document.querySelector(".carousel");
//         const nextButton = document.querySelector(".carousel-next");
//         const prevButton = document.querySelector(".carousel-prev");
//         const closeButton = document.querySelector(".carousel-close");

//         const updateCarousel = (index) => {
//             const newMedia = medias[index];
//             document.querySelector(".carousel-image").src = newMedia.url;
//             document.querySelector(".carousel-image").alt = newMedia.title;
//         };

//         nextButton.onclick = () => {
//             currentIndex = (currentIndex + 1) % medias.length;
//             updateCarousel(currentIndex);
//         };

//         prevButton.onclick = () => {
//             currentIndex = (currentIndex - 1 + medias.length) % medias.length;
//             updateCarousel(currentIndex);
//         };

//         closeButton.onclick = () => {
//             modal.style.display = "none";
//         };

//         window.onclick = event => {
//             if (event.target === modal) {
//                 modal.style.display = "none";
//             }
//         };
//     }
// }


