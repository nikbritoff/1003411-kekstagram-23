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

const START_COMMENT_ID = 1001;
const END_COMMENT_ID = 1099;
const AVATARS_QUANTITY = 6;
const DATA_AMOUNT = 25;
const commentatorsID = [];

const getRandomNumberOfRange = (min, max) => {
  if (min < 0 || min >= max) {
    throw new Error('This function accepts values greater than zero');
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
};

const checkLength = (string, maxLength) => string.length <= maxLength;

///// Генерация комментариев

const createAvatar = (amount) => `img/avatar-${getRandomNumberOfRange(1, amount)}`;

const createUniqeID = (arr, start = 6350, end = 6999) => {
  let id = getRandomNumberOfRange(start, end);

  while ( arr.includes(id) ) {
    id = getRandomNumberOfRange(start,end);
  }

  arr.push(id);

  return id;
};

const createMessage = (messages) => {
  const messagesAmount = getRandomNumberOfRange(1, 2);
  const firstMessage = getRandomNumberOfRange(0, messages.length - 1);

  if (messagesAmount === 1) {
    return messages[firstMessage];
  } else {
    let secondMessage = getRandomNumberOfRange(0, messages.length - 1);
    while (firstMessage === secondMessage) {
      secondMessage = getRandomNumberOfRange(0, messages.length - 1);
    }
    return `${messages[firstMessage]} ${messages[secondMessage]}`;
  }
};

const createName = (names) => names[getRandomNumberOfRange(0, names.length - 1)];

const createComment = () => {
  const comment = {
    id: createUniqeID(commentatorsID, START_COMMENT_ID, END_COMMENT_ID),
    avatar: createAvatar(AVATARS_QUANTITY),
    message: createMessage(commentMessages),
    name: createName(commentNames),
  };
  return comment;
};

const generateComments = () => {
  const amountComments = getRandomNumberOfRange(1, 3);
  return new Array(amountComments).fill('').map( () => createComment());
};

//// Генерация фотокарточек

const createPhoto = (index) => {
  const photo = {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: `${photoDescriptions[getRandomNumberOfRange(0, photoDescriptions.length - 1)]}`,
    likes: getRandomNumberOfRange(15, 200),
    comments: generateComments(),
  };
  return photo;
};

const generatePhotos = (amount) => new Array(amount).fill('').map((element, index) => createPhoto(index));

generatePhotos(DATA_AMOUNT);
checkLength('aa', 2);
