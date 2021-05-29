function getRandomNumberOfRange(min, max) {
  if (min < 0 || min >= max) {
    throw new Error('This function accepts values greater than zero');
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
}

function checkLength(string, maxLength) {
  return string.length <= maxLength;
}


getRandomNumberOfRange();
checkLength();
