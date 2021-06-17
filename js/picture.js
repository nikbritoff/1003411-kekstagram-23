const templatePicture = document.querySelector('#picture').content;
const album = document.querySelector('.pictures');

const addPicture = ({url, likes, comments}) => {
  const template = templatePicture.cloneNode(true);
  const picture = template.querySelector('.picture');
  const pictureImage = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureImage.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return picture;
};

const renderPictures = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    fragment.appendChild(addPicture(picture));
  });

  album.appendChild(fragment);
};

export {renderPictures};
