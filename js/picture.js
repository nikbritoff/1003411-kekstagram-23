import {generatePhotos} from './data.js';

const addPicture = (template, element) => {
  const pictureTemplate = template.cloneNode(true);
  const picture = pictureTemplate.querySelector('.picture');
  const pictureImage = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureImage.src = element.url;
  pictureLikes.textContent = element.likes;
  pictureComments.textContent = element.comments.length;

  return picture;
};

const addPicturesOnPage = (amount) => {
  const templatePicture = document.querySelector('#picture').content;
  const album = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  const pictures = generatePhotos(amount);

  pictures.forEach((picture) => {
    fragment.appendChild(addPicture(templatePicture, picture));
  });

  album.appendChild(fragment);
};

export {addPicturesOnPage};
