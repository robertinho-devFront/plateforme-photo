export const render = ({ price, likes }) => {
  return `<div class="media-likes"> 
    <div class="media-likes__totalblock">
      <p class="media-likes__totals">${likes}</p>
      <img src="assets/images/black-heart.png" class="media-likes__heart" alt="">
    </div>
    <div class="media-likes__photographer">
      <p class="media-likes__photographer-price">${price}€/jour</p>
    </div>
  </div>`;
};

export default {
  render,
};
