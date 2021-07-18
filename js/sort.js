import {renderPictures} from './picture.js';
import {getRandomNumberInRange} from './utils.js';
import { debounce } from './utils/debounce.js';

const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';
const RERENDER_DELAY = 500;

const filter = document.querySelector('.img-filters');

filter.classList.remove('img-filters--inactive');

const clearPhotos = () => {
  const allPictures = document.querySelectorAll('.picture');
  allPictures.forEach((picture) => {
    picture.remove();
  });
};

const compareComments = (a, b) => b.comments.length - a.comments.length;

const getMostDiscussPhotos = (data) => {
  const sortData = data.slice().sort(compareComments);

  return sortData;
};

const getRandomPhotos = (data) => {
  const randomPhotos = [];

  while (randomPhotos.length < 10) {
    const randomPhoto = data[getRandomNumberInRange(0, data.length - 1)];

    if (!randomPhotos.includes(randomPhoto)) {
      randomPhotos.push(randomPhoto);
    }
  }

  return randomPhotos;
};

const sortingClickHandler = (evt, data) => {
  if (evt.target.classList.contains('img-filters__button')) {
    filter.querySelectorAll('button').forEach((button) => {
      button.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
    });

    evt.target.classList.add(ACTIVE_FILTER_BUTTON_CLASS);
    let photos = null;

    if (evt.target.id === 'filter-default') {
      photos = data;
    }

    if (evt.target.id === 'filter-discussed') {
      photos = getMostDiscussPhotos(data);
    }

    if (evt.target.id === 'filter-random') {
      photos = getRandomPhotos(data);
    }

    clearPhotos();
    debounce(() => renderPictures(photos), RERENDER_DELAY)();
  }
};

const setSortingListeners = (data) => {
  filter.addEventListener('click', (evt) => {
    sortingClickHandler(evt, data);
  });
};

export {setSortingListeners};
