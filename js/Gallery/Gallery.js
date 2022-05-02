import {getPicture} from '../Picture/Picture.js';

export const getGallery = (arr) => {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  arr.forEach((item) => {
    fragment.appendChild(getPicture(item));
  });

  pictures.appendChild(fragment);
};
