import {getPicture} from '../Picture/Picture.js';

const getGallery = (arr) => {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  arr.forEach((item) => {
    fragment.appendChild(getPicture(item));
  });

  pictures.appendChild(fragment);
};

export {getGallery};
