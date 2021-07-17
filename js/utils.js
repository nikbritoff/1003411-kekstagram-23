const ALERT_SHOW_TIME = 3000;

const getRandomNumberInRange = (min, max) => {
  if (min < 0 || min >= max) {
    throw new Error('This function accepts values greater than zero');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkLength = (string, maxLength) => string.length <= maxLength;

const generateElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '5%';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.border = '3px solid white';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'orange';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessSendMessage = () => {
  const templateMessageBlock = document.querySelector('#success').content;
  const template = templateMessageBlock.cloneNode(true);
  const closeButton = template.querySelector('.success__button');

  const removeModal = () => {
    const modal = document.querySelector('.success');
    document.body.removeChild(modal);
    document.removeEventListener('click', bodyClickHandler);
    window.removeEventListener('keydown', windowEscHandler);
  };

  const closeButtonClickHandler = () => {
    removeModal();
  };

  const bodyClickHandler = (evt) => {
    const modalDiv = document.querySelector('.success > .success__inner');
    if (evt.target !== modalDiv) {
      removeModal();
    }
  };

  const windowEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      removeModal();
    }
  };

  document.body.appendChild(template);
  closeButton.addEventListener('click', () => closeButtonClickHandler());
  document.addEventListener('click', bodyClickHandler);
  window.addEventListener('keydown', windowEscHandler);
};

const showErrorSendMessage =() => {
  const templateMessageBlock = document.querySelector('#error').content;
  const template = templateMessageBlock.cloneNode(true);
  const closeButton = template.querySelector('.error__button');

  const removeModal = () => {
    const modal = document.querySelector('.error');
    document.body.removeChild(modal);
    document.body.removeEventListener('click', bodyClickHandler);
    window.removeEventListener('keydown', windowButtonEscHandler);
  };

  const closeButtonClickHandler = () => {
    removeModal();
  };

  const bodyClickHandler = (evt) => {
    const modalDiv = document.querySelector('.error > .error__inner');

    if (evt.target !== modalDiv) {
      removeModal();
    }
  };

  const windowButtonEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      removeModal();
    }
  };

  document.body.appendChild(template);
  closeButton.addEventListener('click', () => closeButtonClickHandler);
  document.body.addEventListener('click', bodyClickHandler);
  window.addEventListener('keydown', windowButtonEscHandler);
};

export {getRandomNumberInRange, checkLength, generateElement, showErrorMessage, showSuccessSendMessage, showErrorSendMessage};
