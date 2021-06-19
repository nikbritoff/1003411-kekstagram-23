import {getRandomNumberInRange} from './utils.js';

const START_COMMENT_ID = 1001;
const END_COMMENT_ID = 1099;
const AVATARS_QUANTITY = 6;
const commentsID = [];

const photoDescriptions = [
  'Лучшее фото',
  'Стильно',
  'Модно',
  'Кринж',
  'Сфоткано на тапок',
];

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

/// Генерация комментариев

const createAvatar = (amount) => `img/avatar-${getRandomNumberInRange(1, amount)}.svg`;

const createUniqueID = (start, end, arr = []) => {
  let id = getRandomNumberInRange(start, end);

  while ( arr.includes(id) ) {
    id = getRandomNumberInRange(start,end);
  }

  arr.push(id);

  return id;
};

const createMessage = (messages) => {
  const messagesAmount = getRandomNumberInRange(1, 2);
  const firstMessage = getRandomNumberInRange(0, messages.length - 1);

  if (messagesAmount === 1) {
    return messages[firstMessage];
  } else {
    let secondMessage = getRandomNumberInRange(0, messages.length - 1);
    while (firstMessage === secondMessage) {
      secondMessage = getRandomNumberInRange(0, messages.length - 1);
    }
    return `${messages[firstMessage]} ${messages[secondMessage]}`;
  }
};

const createName = (names) => names[getRandomNumberInRange(0, names.length - 1)];

const createComment = () => ({
  id: createUniqueID(START_COMMENT_ID, END_COMMENT_ID, commentsID),
  avatar: createAvatar(AVATARS_QUANTITY),
  message: createMessage(commentMessages),
  name: createName(commentNames),
});

const generateComments = () => {
  const amountComments = getRandomNumberInRange(1, 3);

  return new Array(amountComments).fill('').map( () => createComment());
};

//// Генерация фотокарточек

const createPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: `${photoDescriptions[getRandomNumberInRange(0, photoDescriptions.length - 1)]}`,
  likes: getRandomNumberInRange(15, 200),
  comments: generateComments(),
});

const generatePhotos = (amount) => new Array(amount).fill('').map((element, index) => createPhoto(index));

export {generatePhotos};
