const MAX_HASHTAGS_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const PATTERN_HASHTAG = /^#[\wа-яa-z]{1,19}$/i;
const ERRORS = {
  hashtagAmount: `Максимальное количество хэштегов - ${MAX_HASHTAGS_AMOUNT}.`,
  hashtagDuplicates: 'Хэштеги не должны повторяться. #ХэшТег и #хэштег считаются одним и тем же тегом.',
  hashtagPattern: `Хэштег должен начинаться с # и содержать только буквы и цифры. Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов`,
  commentLength: `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`,
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('#upload-file');
const uploadEdit = uploadForm.querySelector('.img-upload__overlay');
// const uploadSubmit = uploadForm.querySelector('#upload-submit');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');

const uploadHashtagsInput = uploadForm.querySelector('.text__hashtags');
const uploadCommentInput = uploadForm.querySelector('.text__description');

const hashtagCheckValidity = () => {
  const hashtags = uploadHashtagsInput.value.trim().split(' ');
  const result = [];

  const validateAmount = () => {
    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      result.push(`Максимальное количество хэштегов - ${MAX_HASHTAGS_AMOUNT}.`);
    }
  };

  const validateDuplicates = () => {
    const newSet = new Set;
    hashtags.forEach((hashtag) => {
      newSet.add(hashtag.toLowerCase());
    });

    if (newSet.length !== hashtags.length) {
      result.push(ERRORS.hashtagDuplicates);
    }

    uploadHashtagsInput.setCustomValidity(result);
    uploadHashtagsInput.reportValidity();
  };

  const patternCheck = () => {
    let isValid = true;

    hashtags.forEach((hash) => {
      if (!PATTERN_HASHTAG.test(hash)) {
        isValid = false;
      }
    });

    if (!isValid) {
      result.push(ERRORS.hashtagPattern);
    }
  };

  if (uploadHashtagsInput.value.length > 0) {
    validateAmount();
    patternCheck();
    validateDuplicates();
  }

  uploadHashtagsInput.setCustomValidity(result);
  uploadHashtagsInput.reportValidity();
};

const commentCheckValidity = () => {
  const result = [];

  if (uploadCommentInput.value.length > MAX_COMMENT_LENGTH) {
    result.push(ERRORS.commentLength);
  }

  uploadCommentInput.setCustomValidity(result);
  uploadCommentInput.reportValidity();
};

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

