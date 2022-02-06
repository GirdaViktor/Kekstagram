const getRandomInteger = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (min >= 0 && max >= 0) {
    if (min > max) {
      [min, max] = [max, min];
    }

    return Math.floor(min + Math.random() * (max + 1 - min));
  }
};

const getCheckLengthString = (str) => str.length < 140;

/* Module4-task1 */
const initialData = {
  countPreview: {
    start: 1,
    end: 25,
  },
  names: [
    `Анна`,
    `Мария`,
    `Александр`,
    `Влад`,
    `Константин`,
    `Егор`,
    `Милена`,
    `Эсмеральда`,
  ],
  comments: {
    count: {
      min: 0,
      max: 135,
    },
    avatar: {
      avatarMin: 1,
      avatarMax: 6,
    },
    message: {
      length: {
        min: 1,
        max: 2,
      },
      message: [
        `Всё отлично!`,
        `В целом всё неплохо. Но не всё.`,
        `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
        `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
        `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
        `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
      ],
    },
  },
  likes: {
    min: 15,
    max: 200,
  },
};

const getShuffle = (arr) => {
  const newArr = arr.slice();

  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

const getMessage = (obj) => {
  const {min, max} = obj.comments.message.length;
  const countMessage = getRandomInteger(min, max);
  const messages = [];

  for (let i = min; i <= countMessage; i++) {
    messages.push(getShuffle(obj.comments.message.message)[i]);
  }

  return messages;
};

const getComments = (obj) => {
  const comments = [];
  const {min, max} = obj.comments.count;
  const {avatarMin, avatarMax} = obj.comments.avatar;
  const countComment = getRandomInteger(min, max);

  for (let i = min; i <= countComment; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(avatarMin, avatarMax)}.svg`,
      message: getMessage(obj),
      name: obj.names[getRandomInteger(obj.names.length - 1)],
    });
  }

  return comments;
};

const createData = (obj) => {
  const {start, end} = obj.countPreview;
  const data = [];
  const {min, max} = obj.likes;

  for (let i = start; i <= end; i++) {
    data.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Какое-то описание для фотографии`,
      likes: getRandomInteger(min, max),
      comments: getComments(obj),
    });
  }

  return data;
};

console.log(createData(initialData));
