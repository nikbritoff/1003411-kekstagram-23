import {hashtagCheckValidity, commentCheckValidity} from './validate.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('#upload-file');
const uploadEdit = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const uploadHashtagsInput = uploadForm.querySelector('.text__hashtags');
const uploadCommentInput = uploadForm.querySelector('.text__description');

const openUploadModal = () => {
  uploadEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadHashtagsInput.addEventListener('change', () => hashtagCheckValidity());
  uploadCommentInput.addEventListener('change', () => commentCheckValidity());

  uploadForm.addEventListener('submit', (evt) => uploadFormHandler(evt));
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
  evt.preventDefault();
  hashtagCheckValidity();
  commentCheckValidity();
};

uploadField.addEventListener('change', () => inputUploadHandler());

uploadForm.addEventListener('submit', uploadFormHandler);
