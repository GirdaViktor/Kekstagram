import {isEscapeKey} from '../Utils/Utils.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const createComment = (obj) => {
  const comment = document.createElement('li');
  const avatar = document.createElement('img');
  const socialText = document.createElement('p');
  comment.classList.add('social__comment');
  avatar.classList.add('social__picture');
  avatar.alt = obj.name;
  avatar.width = 35;
  avatar.height = 35;
  avatar.src = obj.avatar;
  socialText.classList.add('social__text');
  socialText.textContent = obj.message;

  comment.appendChild(avatar);
  comment.appendChild(socialText);

  return comment;
};

const viewSocialComments = (arr) => {
  const socialComments = document.querySelector('.social__comments');
  const fragment = document.createDocumentFragment();

  socialComments.textContent = '';
  arr.forEach((item) => {
    fragment.appendChild(createComment(item));
  });
  socialComments.appendChild(fragment);

  return socialComments;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onPopupCloseBigPicture = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

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

  viewSocialComments(obj.comments);
  document.addEventListener('keydown', onPopupEscKeydown);
  cancelBigPicture.addEventListener('click', onPopupCloseBigPicture);
};

export const onClickOpenBigPicturePopup = (obj) => {
  showBigPicture(obj);
};
