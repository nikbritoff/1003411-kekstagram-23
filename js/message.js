const ALERT_SHOW_TIME = 3000;

const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '5%';
  alertContainer.style.right = '0';
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

const templateSuccessMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const templateErrorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

let windowEscHandler = null;

const showMessage = (template) => {
  const removeModal = () => {
    template.remove();
    window.removeEventListener('keydown', windowEscHandler);
  };

  windowEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      removeModal();
    }
  };

  const templateClickHandler = (evt) => {
    if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('error__inner')) {
      removeModal();
    }
  };

  document.body.appendChild(template);
  template.addEventListener('click', templateClickHandler);
  window.addEventListener('keydown', windowEscHandler);
};

const showSuccessSendMessage = () => {
  const template = templateSuccessMessage.cloneNode(true);
  showMessage(template);
};

const showErrorSendMessage =() => {
  const template = templateErrorMessage.cloneNode(true);
  showMessage(template);
};

export {showErrorMessage, showSuccessSendMessage, showErrorSendMessage};
