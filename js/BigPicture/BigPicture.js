import {isEscapeKey} from '../Utils/Utils.js';
import {comments} from '../Comments/Comments.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const showBigPicture = (obj) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const cancelBigPicture = bigPicture.querySelector('.cancel');

  bigPicture.querySelector('.big-picture__img img').src = obj.url;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  bigPicture.querySelector('.comments-count').textContent = obj.comments.length;
  bigPicture.querySelector('.social__caption').textContent = obj.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  comments(obj.comments);
  document.addEventListener('keydown', closeBigPictureEscKeydown);
  cancelBigPicture.addEventListener('click', closeBigPicture);
};

const closeBigPicture = (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeBigPictureEscKeydown);
};

const closeBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture(evt);
  }
};

export {showBigPicture};
