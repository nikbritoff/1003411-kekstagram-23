import {hashtagCheckValidity, commentCheckValidity} from './validate.js';
import {setScaleListeners, removeScaleListeners} from './scale.js';
import {removeSlider, setSlider} from './effects.js';
import {sendData} from './api.js';
import { showSuccessSendMessage, showErrorSendMessage } from './message.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('#upload-file');
const uploadEdit = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadHashtagsInput = uploadForm.querySelector('.text__hashtags');
const uploadCommentInput = uploadForm.querySelector('.text__description');

const previewImage = document.querySelector('.img-upload__preview').querySelector('img');
const previewEffects = document.querySelectorAll('.effects__preview');

let uploadFormHandler = null;
let closeUploadModal = null;

const showPreviews = () => {
  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
      previewEffects.forEach((preview) => {
        preview.style.backgroundImage = `url("${reader.result}")`;
      });
    });
  }
};

const openUploadModal = () => {
  uploadEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadHashtagsInput.addEventListener('change', () => hashtagCheckValidity());
  uploadCommentInput.addEventListener('change', () => commentCheckValidity());

  uploadForm.addEventListener('submit', uploadFormHandler);
  setScaleListeners();
  setSlider();
};

const uploadCancelHandler = () => {
  closeUploadModal();
};

const windowButtonEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeUploadModal();
  }
};

const inputUploadHandler = () => {
  showPreviews();
  if (uploadEdit.classList.contains('hidden')) {
    openUploadModal();
    uploadCancelButton.addEventListener('click', uploadCancelHandler);
    window.addEventListener('keydown', windowButtonEscHandler);
  }
};

uploadFormHandler = (evt) => {
  evt.preventDefault();
  // hashtagCheckValidity();
  sendData(showSuccessSendMessage,
    showErrorSendMessage,
    new FormData(evt.target));

  closeUploadModal();
};

closeUploadModal = () => {
  if (document.activeElement !== uploadHashtagsInput &&  document.activeElement !== uploadCommentInput) {
    uploadEdit.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadHashtagsInput.value = '';
    uploadCommentInput.value = '';
    uploadField.value = '';
    uploadCancelButton.removeEventListener('click', uploadCancelHandler);
    window.removeEventListener('keydown', windowButtonEscHandler);
    removeScaleListeners();
    removeSlider();
  }
};

uploadField.addEventListener('change', () => inputUploadHandler());

uploadForm.addEventListener('submit', uploadFormHandler);
