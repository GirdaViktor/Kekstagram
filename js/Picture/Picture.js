import {showBigPicture} from '../BigPicture/BigPicture.js';

const getPicture = (obj) => {
  const picture  = document.querySelector('#picture').content.querySelector('.picture');

  const template = picture.cloneNode(true);
  template.querySelector('.picture__img').src = obj.url;
  template.querySelector('.picture__likes').textContent = obj.likes;
  template.querySelector('.picture__comments').textContent = obj.comments.length;
  template.addEventListener('click', () => {
    showBigPicture(obj);
  });

  return template;
};

export {getPicture};
