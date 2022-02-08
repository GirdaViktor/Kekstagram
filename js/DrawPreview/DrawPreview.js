import {onClickOpenBigPicturePopup} from '../BigPicture/BigPicture.js';

const picture  = document.querySelector('#picture ').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const fillPicture = (obj) => {
  const template = picture.cloneNode(true);
  template.querySelector('.picture__img').src = obj.url;
  template.querySelector('.picture__likes').textContent = obj.likes;
  template.querySelector('.picture__comments').textContent = obj.comments.length;
  template.addEventListener(`click`, () => {
    onClickOpenBigPicturePopup(obj);
  });

  return template;
};

export const fillGallery = (arr) => {
  const fragment = document.createDocumentFragment();

  arr.forEach((item) => {
    fragment.appendChild(fillPicture(item));
  });

  pictures.appendChild(fragment);
};
