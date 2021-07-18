import {renderPictures} from './picture.js';
import {getRandomNumberInRange, debounce} from './utils.js';

const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';

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
  clearPhotos();
  renderPictures(sortData);
};

const getRandomPhotos = (data) => {
  clearPhotos();
  const randomPhotos = [];

  while (randomPhotos.length < 10) {
    const randomPhoto = data[getRandomNumberInRange(0, data.length - 1)];

    if (!randomPhotos.includes(randomPhoto)) {
      randomPhotos.push(randomPhoto);
    }
  }

  renderPictures(randomPhotos);
};

const filterClickHandler = (evt, data) => {
  if (evt.target.classList.contains('img-filters__button')) {
    filter.querySelectorAll('button').forEach((button) => {
      button.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
    });

    evt.target.classList.add(ACTIVE_FILTER_BUTTON_CLASS);

    if (evt.target.id === 'filter-default') {
      clearPhotos();
      renderPictures(data);
    }

    if (evt.target.id === 'filter-discussed') {
      getMostDiscussPhotos(data);
    }

    if (evt.target.id === 'filter-random') {
      getRandomPhotos(data);
    }

  }
};

const sorting = (data) => {
  filter.addEventListener('click', (evt) => {
    filterClickHandler(evt, data);
  });
};

export {sorting};
