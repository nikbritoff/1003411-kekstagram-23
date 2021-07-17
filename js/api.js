import {setPicturesListener} from './full-size-picture.js';

const SERVER_ADRESS = 'https://23.javascript.pages.academy/kekstagram/data';

const getData = (generatePhotos, renderPhotos) => {
  fetch(SERVER_ADRESS)
    .then((response) => response.json())
    .then((response) => {
      const photos = generatePhotos(response);
      renderPhotos(photos);
      setPicturesListener(photos);
    });
};

export {getData};
