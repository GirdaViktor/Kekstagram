import {isEscapeKey} from '../Utils/Utils.js';
import {comments} from '../Comments/Comments.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const COMMENT_COUNT = 5;

const showBigPicture = (obj) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const cancelBigPicture = bigPicture.querySelector('.cancel');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const currentCommentsCount = bigPicture.querySelector('.current-comments-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  let currentCommentsCountInt = parseInt(currentCommentsCount.textContent, 10);
  const commentsCountInt = obj.comments.length;

  if (currentCommentsCountInt >= commentsCountInt) {
    currentCommentsCountInt = commentsCountInt;
    commentsLoader.classList.add('hidden');
  } else {
    currentCommentsCountInt = COMMENT_COUNT;
    commentsLoader.classList.remove('hidden');
  }
  currentCommentsCount.textContent = currentCommentsCountInt;
  comments(obj.comments, currentCommentsCountInt);

  bigPicture.querySelector('.big-picture__img img').src = obj.url;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  commentsCount.textContent = commentsCountInt;
  bigPicture.querySelector('.social__caption').textContent = obj.description;

  comments(obj.comments, currentCommentsCountInt);

  commentsLoader.addEventListener('click', () => {
    currentCommentsCountInt += COMMENT_COUNT;
    if (currentCommentsCountInt >= commentsCountInt) {
      currentCommentsCountInt = commentsCountInt;
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
    currentCommentsCount.textContent = currentCommentsCountInt;
    comments(obj.comments, currentCommentsCountInt);
  });

  const closeBigPicture = (evt) => {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigPictureEscKeydown);
    commentsLoader.classList.remove('hidden');
    currentCommentsCount.textContent = COMMENT_COUNT;
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
