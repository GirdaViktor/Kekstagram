import {createComment} from '../Comment/Comment.js';

const comments = (arr, count) => {
  const socialComments = document.querySelector('.social__comments');
  const fragment = document.createDocumentFragment();

  socialComments.textContent = '';
  arr.slice(0, count).forEach((item) => {
    fragment.appendChild(createComment(item));
  });
  socialComments.appendChild(fragment);

  return socialComments;
};

export {comments};

