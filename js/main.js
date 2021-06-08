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
// checkLength();

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

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
  'Гарсон'
]
// const comments = [];

// for (let i = 0; i < 3; i++) {
//   comments[i] = {
//     message: commentMessages[getRandomNumberOfRange(0, commentMessages.length - 1)],
//     name: commentNames[getRandomNumberOfRange(0, commentNames.length - 1)],
//     id: i + 1001,
//     avatar : `img/avatar-${getRandomNumberOfRange(1, 6)}`
//   }
// }

// console.log(comments);

function createComments(quantity = 3) {
  const comments = [];

  for (let i = 0; i < quantity; i++) {
    comments[i] = {
      message: commentMessages[getRandomNumberOfRange(0, commentMessages.length - 1)],
      name: commentNames[getRandomNumberOfRange(0, commentNames.length - 1)],
      id: i + 1001,
      avatar : `img/avatar-${getRandomNumberOfRange(1, 6)}`
    }
  }

  return comments;
}

function createPhotoDescription(currentIndex) {
  let id = currentIndex;
  let url =  currentIndex;
  let description = 'Краткость - сестра таланта, поэтому комментарий такой небольшой. Фото - пушшшка!';
  let likes = getRandomNumberOfRange(15, 200);
  let comments = createComments(3);

  let photoDescription = {
    id,
    url,
    description,
    likes,
    comments
  }

  return photoDescription;
}

const descriptionArray = new Array(25).fill('').map((obj, index) => {
  return createPhotoDescription(index);
});
console.log(descriptionArray);


