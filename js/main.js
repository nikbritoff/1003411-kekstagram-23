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
checkLength('aa', 2);

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commentNames = [
  'Артём',
  'Данила',
  'Ольга',
  'Никита',
  'Стасян',
  'Василий',
  'Алёша',
  'Виктория',
  'Давид',
  'Гарсон',
];

const descriptionsForPhoto = [
  'Лучшее фото',
  'Стильно',
  'Модно',
  'Кринж',
  'Сфоткано на тапок',
];

function generateArrayOfPhotoComments(quantity) {
  const commentsArray = new Array(quantity).fill({});

  function createPhotoComment(currentIndex) {
    const result = {};
    result.message = commentMessages[getRandomNumberOfRange(0, commentMessages.length - 1)];
    result.name = commentNames[getRandomNumberOfRange(0, commentNames.length - 1)];
    const min = 11;
    const max = min + quantity - 1;
    let idFor = getRandomNumberOfRange(min, max);

    if (currentIndex === 0) {
      result.id = idFor;
    }
    if (currentIndex > 0) {

      for (let j = 0; j < currentIndex; j++) {
        if (commentsArray[j].id === idFor) {
          idFor = getRandomNumberOfRange(min, max);
          j = -1;
        }

        if (j === currentIndex - 1) {
          result.id = idFor;
        }
      }
    }

    return result;
  }

  for (let i = 0; i < commentsArray.length; i++) {
    commentsArray[i] = createPhotoComment(i);
  }
  return commentsArray;
}

function generateArrayOfPhotoDescriptions(quantity) {
  const descrArray = new Array(quantity).fill({});
  const startID = 10001;
  const endID = startID + quantity;

  function generatePhotoDescriprion(currentIndex) {
    const obj = {};
    let objID = getRandomNumberOfRange(startID, endID);
    let objUrl = `photos/${getRandomNumberOfRange(1, 25)}.jpg`;
    obj.comments = generateArrayOfPhotoComments(2);
    obj.likes = getRandomNumberOfRange(15, 200);
    obj.description = descriptionsForPhoto[getRandomNumberOfRange(0, descriptionsForPhoto.length - 1)];

    if (currentIndex === 0) {
      obj.id = objID;
      obj.url = objUrl;
    }

    if (currentIndex > 0) {
      for (let j = 0; j < currentIndex; j++) {

        if (descrArray[j].url === objUrl || descrArray[j].id === objID) {
          objUrl = `photos/${getRandomNumberOfRange(1, 25)}.jpg`;
          objID = getRandomNumberOfRange(startID, endID);
          j = -1;
        }

        if (j === currentIndex - 1) {
          obj.id = objID;
          obj.url = objUrl;
        }
      }
    }
    return obj;
  }

  for (let i = 0; i < descrArray.length; i++) {
    descrArray[i] = generatePhotoDescriprion(i);
  }
  return descrArray;
}

generateArrayOfPhotoDescriptions(25);
