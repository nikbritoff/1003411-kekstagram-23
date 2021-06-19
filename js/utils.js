const getRandomNumberInRange = (min, max) => {
  if (min < 0 || min >= max) {
    throw new Error('This function accepts values greater than zero');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkLength = (string, maxLength) => string.length <= maxLength;

const generateElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

export {getRandomNumberInRange, checkLength, generateElement};
