import {createComment} from '../Comment/Comment.js';

export const comments = (arr) => {
  const socialComments = document.querySelector('.social__comments');
  const fragment = document.createDocumentFragment();

  socialComments.textContent = '';
  arr.forEach((item) => {
    fragment.appendChild(createComment(item));
  });
  socialComments.appendChild(fragment);

  return socialComments;
};
