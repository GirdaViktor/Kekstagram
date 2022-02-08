export const getRandomInteger = (min, max) => {
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

export const getCheckLengthString = (str) => str.length < 140;

export const getShuffle = (arr) => {
  const newArr = arr.slice();

  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

export const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

export const isEnterKey = (evt) => {
  return evt.key === 'Enter';
};
