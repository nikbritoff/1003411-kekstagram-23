const LOAD_COMMETS_AMOUNT = 5;

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const fullScreen = document.querySelector('.big-picture');
const fullScreenPicture = fullScreen.querySelector('.big-picture__img').children[0];
const fullScreenLikes = fullScreen.querySelector('.likes-count');
const commentsList = fullScreen.querySelector('.social__comments');
const comment = fullScreen.querySelector('.social__comment');
const showCommentsCount = fullScreen.querySelector('.social__comment-count');
const fullScreenCommentsCount = fullScreen.querySelector('.comments-count');
const commentsLoaderButton = fullScreen.querySelector('.social__comments-loader');
const fullScreenDescription = fullScreen.querySelector('.social__caption');
const closeFullScreenButton = fullScreen.querySelector('.big-picture__cancel');

// Временное скрытие счетчика комментов и кнопку загрузки остальных комментариев
// const commentCounts = fullScreen.querySelector('.social__comment-count');
// const commentLoader = fullScreen.querySelector('.comments-loader');
const tempClosingElements = () => {
  // commentLoader.classList.add('hidden');
  // commentCounts.classList.add('hidden');
};

const buildComment = ({avatar, name, message}) => {
  tempClosingElements();

  const commentTemplate = comment.cloneNode(true);
  const commentTemplateAvatar = commentTemplate.querySelector('.social__picture');
  const commentTemplateMessage = commentTemplate.querySelector('.social__text');

  commentTemplateAvatar.src = avatar;
  commentTemplate.alt = name;
  commentTemplateMessage.textContent = message;

  return commentTemplate;
};

const renderComments = (comments) => {
  const setCommentsCount = () => {
    const amount = commentsList.children.length;
    const template = fullScreenCommentsCount.cloneNode(true);
    showCommentsCount.textContent = `${amount} из `;
    template.textContent = `${comments.length} комментариев`;
    showCommentsCount.appendChild(template);
  };

  const addComments = () => {
    const amount = commentsList.children.length;
    const fragment = document.createDocumentFragment();
    for (let i = amount; i < amount + LOAD_COMMETS_AMOUNT; i++) {
      if (i >= comments.length) {
        break;
      }
      const currentComment = comments[i];
      fragment.append(buildComment(currentComment));
    }

    commentsList.append(fragment);
    setCommentsCount();
  };

  addComments(comments);
};

const clearComments = () => {
  commentsList.innerHTML = '';
};

const closeFullScreen = () => {
  fullScreen.classList.add('hidden');
  body.classList.remove('modal-open');
};

const commentsLoaderButtonClickHandler = (comments) => {
  renderComments(comments);
};

const renderFullSize = ({url, description, likes, comments}) => {
  body.classList.add('modal-open');
  fullScreen.classList.remove('hidden');

  // Заношу информацию в соотвествующие поля
  fullScreenPicture.src = url;
  fullScreenDescription.textContent = description;
  fullScreenLikes.textContent = likes;
  fullScreenCommentsCount.textContent = comments.length;

  // Удаление старых комментариев
  clearComments();
  // Отрисовка новых комментариев
  renderComments(comments);

  const setCommentsLoaderButtonListener = () => {
    commentsLoaderButtonClickHandler(comments);
  };

  commentsLoaderButton.addEventListener('click', setCommentsLoaderButtonListener);
};

const picturesClickHandler = (evt, data) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const photoID = Number(evt.target.closest('.picture').dataset.id);
    const currentPhoto = data.find((el) => el.id === photoID);
    renderFullSize(currentPhoto);
  }
};

const setPicturesListener = (data) => {
  pictures.addEventListener('click', (evt) => picturesClickHandler(evt, data));
};

closeFullScreenButton.addEventListener('click', () => {
  closeFullScreen();
});

window.addEventListener('keydown', ({key}) => {
  if (key === 'Escape') {
    closeFullScreen();
  }
});

export {setPicturesListener};
