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
