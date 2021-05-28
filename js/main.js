function getRandom(min, max) {
  let result = 0;

  if (min < 0 || min >= max) {
    min = 0;
  }

  result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
}

function checkLength(string, maxLength) {
  return string.length <= maxLength;
}


getRandom();
checkLength();
