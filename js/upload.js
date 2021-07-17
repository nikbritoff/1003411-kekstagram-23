import {hashtagCheckValidity, commentCheckValidity} from './validate.js';
import { setScaleListeners, removeScaleListeners } from './scale.js';
import { removeSlider, setSlider } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('#upload-file');
const uploadEdit = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadHashtagsInput = uploadForm.querySelector('.text__hashtags');
const uploadCommentInput = uploadForm.querySelector('.text__description');

const previewImage = document.querySelector('.img-upload__preview').querySelector('img');
const previewEffects = document.querySelectorAll('.effects__preview');

const showPreviews = () => {
  const file = uploadField.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  if (file.type !== 'image/jpeg' &&  file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/svg') {
    alert('Выберите изображение');
    closeUploadModal();
  }

  reader.onload = function() {
    previewImage.src = reader.result;

    previewEffects.forEach((preview) => {
      preview.style.backgroundImage = `url("${reader.result}")`;
    });
  };
};

const openUploadModal = () => {
  uploadEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadHashtagsInput.addEventListener('change', () => hashtagCheckValidity());
  uploadCommentInput.addEventListener('change', () => commentCheckValidity());

  uploadForm.addEventListener('submit', (evt) => uploadFormHandler(evt));
  setScaleListeners();
  setSlider();
  showPreviews();

};

const closeUploadModal = () => {

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

const uploadCancelHandler = () => {
  closeUploadModal();
};

const windowButtonEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeUploadModal();
  }
};

const inputUploadHandler = () => {
  if (uploadEdit.classList.contains('hidden')) {
    openUploadModal();
    uploadCancelButton.addEventListener('click', uploadCancelHandler);
    window.addEventListener('keydown', windowButtonEscHandler);
  }
};

const uploadFormHandler = (evt) => {
  if (!hashtagCheckValidity() || !commentCheckValidity()) {
    evt.preventDefault();
  }
};

uploadField.addEventListener('change', () => inputUploadHandler());

uploadForm.addEventListener('submit', uploadFormHandler);
