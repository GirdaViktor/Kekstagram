import {getPicture} from '../Picture/Picture.js';
import {sortFilter} from '../Filters/Filters.js';

const getGallery = (arr) => {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  arr.forEach((item) => {
    fragment.appendChild(getPicture(item));
  });

  pictures.appendChild(fragment);
  sortFilter(arr);
};

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
};

export {getGallery, removePictures};
