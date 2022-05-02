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

export {createComment};

