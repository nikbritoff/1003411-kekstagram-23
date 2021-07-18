const getRandomNumberInRange = (min, max) => {
  if (min < 0 || min >= max) {
    throw new Error('This function accepts values greater than zero');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {getRandomNumberInRange};
