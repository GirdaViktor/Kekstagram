import {isEscapeKey} from '../Utils/Utils.js';
import {comments} from '../Comments/Comments.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const commentsLoader = bigPicture.querySelector('.comments-loader');
const currentCommentsCount = bigPicture.querySelector('.current-comments-count');

const showBigPicture = (obj) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const cancelBigPicture = bigPicture.querySelector('.cancel');
  let currentCommentsCountInt = parseInt(currentCommentsCount.textContent, 10);

  bigPicture.querySelector('.big-picture__img img').src = obj.url;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  bigPicture.querySelector('.comments-count').textContent = obj.comments.length;
  bigPicture.querySelector('.social__caption').textContent = obj.description;
  //bigPicture.querySelector('.social__comment-count').classList.add('hidden');

  comments(obj.comments, currentCommentsCountInt);

  commentsLoader.addEventListener('click', () => {
    currentCommentsCountInt += 5;
    if (currentCommentsCountInt >= obj.comments.length) {
      currentCommentsCountInt = obj.comments.length;
    }
    currentCommentsCount.textContent = currentCommentsCountInt;
    comments(obj.comments, currentCommentsCountInt);
  });

  const closeBigPicture = (evt) => {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigPictureEscKeydown);
    currentCommentsCount.textContent = 5;
    comments(obj.comments, currentCommentsCountInt);
  };

  const closeBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture(evt);
    }
  };

  document.addEventListener('keydown', closeBigPictureEscKeydown);
  cancelBigPicture.addEventListener('click', closeBigPicture);
};

export {showBigPicture};
