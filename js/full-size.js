import {generateElement} from './utils.js';

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const fullScreen = document.querySelector('.big-picture');
const fullScreenPicture = fullScreen.querySelector('.big-picture__img').children[0];
const fullScreenLikes = fullScreen.querySelector('.likes-count');
const commentsList = fullScreen.querySelector('.social__comments');
const comments = fullScreen.querySelectorAll('.social__comment');
const fullScreenCommentsCount = fullScreen.querySelector('.comments-count');
const fullScreenDescription = fullScreen.querySelector('.social__caption');
const closeFullScreenButton = fullScreen.querySelector('.big-picture__cancel');

// Временное скрытие счетчика комментов и кнопку загрузки остальных комментариев
const commentCounts = fullScreen.querySelector('.social__comment-count');
const commentLoader = fullScreen.querySelector('.comments-loader');
const tempClosingElements = () => {
  commentLoader.classList.add('hidden');
  commentCounts.classList.add('hidden');
};

const renderComment = ({avatar, name, message}) => {
  tempClosingElements();

  const comment = generateElement('li', 'social__comment');
  const commentAvatar = generateElement('img', 'social__picture');

  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.width = COMMENT_AVATAR_WIDTH;
  commentAvatar.height = COMMENT_AVATAR_HEIGHT;

  const commentText = generateElement('p', 'social__text');
  commentText.textContent = message;

  comment.append(commentAvatar, commentText);

  return comment;
};

const closeFullScreen = () => {
  fullScreen.classList.add('hidden');
  body.classList.remove('modal-open');
};

const renderFullSize = (data) => {
  pictures.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.classList.contains('picture__img')) {
      body.classList.add('modal-open');
      fullScreen.classList.remove('hidden');
      const photoID = (event.target.parentNode.getAttribute('data-id') - 1);
      const currentPhoto = data[photoID];

      fullScreenPicture.src = currentPhoto.url;
      fullScreenDescription.textContent = currentPhoto.description;
      fullScreenLikes.textContent = currentPhoto.likes;
      fullScreenCommentsCount.textContent = currentPhoto.comments.length;

      // Удаление старых комментариев
      comments.forEach((comment) => {
        comment.remove();
      });

      // Отрисовка новых комментариев
      currentPhoto.comments.forEach((comment) => {
        commentsList.append(renderComment(comment));
      });
    }
  });
};

closeFullScreenButton.addEventListener('click', () => {
  closeFullScreen();
});

window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closeFullScreen();
  }
});

export {renderFullSize};
