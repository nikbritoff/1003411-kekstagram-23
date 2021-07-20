import {renderPictures} from './picture.js';
import {getRandomNumberInRange} from './utils.js';
import {debounce} from './utils/debounce.js';

const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTO_AMOUNT = 10;

const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('button');

const clearPhotos = () => {
  const allPictures = document.querySelectorAll('.picture');
  allPictures.forEach((picture) => {
    picture.remove();
  });
};

const reserButtonActiveClass = () => {
  filterButtons.forEach((button) => {
    button.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
  });
};

const getMostDiscussPhotos = (data) =>  data.slice().sort((a, b) => b.comments.length - a.comments.length);

const getRandomPhotos = (data) => {
  const randomPhotos = [];

  while (randomPhotos.length < RANDOM_PHOTO_AMOUNT) {
    const randomPhoto = data[getRandomNumberInRange(0, data.length - 1)];

    if (!randomPhotos.includes(randomPhoto)) {
      randomPhotos.push(randomPhoto);
    }
  }

  return randomPhotos;
};

const getCurrentPhotos = (filterType, photos) => {
  switch (filterType) {
    case 'filter-default':
      return photos;
    case 'filter-discussed':
      return getMostDiscussPhotos(photos);
    case 'filter-random':
      return getRandomPhotos(photos);
    default:
      throw new Error(`Unknown filter: ${filterType}`);
  }
};

const sortingClickHandler = (evt, data) => {
  if (evt.target.classList.contains('img-filters__button')) {
    reserButtonActiveClass();

    const currentFilter = evt.target.id;
    evt.target.classList.add(ACTIVE_FILTER_BUTTON_CLASS);
    const filteredPhotos = getCurrentPhotos(currentFilter, data);

    clearPhotos();
    renderPictures(filteredPhotos);
  }
};

const setSortingListeners = (data) => {
  filter.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce((evt) => {
    sortingClickHandler(evt, data);
  }));
};

export {setSortingListeners};
