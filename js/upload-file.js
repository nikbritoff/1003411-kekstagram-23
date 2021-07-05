const MAX_HASTAGS_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload');
const uploadField = uploadForm.querySelector('#upload-file');
const uploadEdit = uploadForm.querySelector('.img-upload__overlay');
const uploadSubmit = uploadForm.querySelector('#upload-submit');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const patternHashtag = /^#[\wа-яa-z]{1,19}$/i;

const uploadHashtagsInput = uploadForm.querySelector('.text__hashtags');
const uploadCommentInput = uploadForm.querySelector('.text__description');

//
const hashtagCheckValidity = () => {
  const hashtags = uploadHashtagsInput.value.split(' ');
  const result = [];

  const amountCheck = () => {
    if (hashtags > MAX_HASTAGS_AMOUNT) {
      result.push('Максимальное количество хэштегов - 5.');
    }
  };

  const repeatsCheck = () => {
    const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
    const newArr = [];
    lowerCaseHashtags.forEach((hash) => {
      if (!newArr.includes(hash)) {
        newArr.push(hash);
      }
    });

    if (newArr.length !== lowerCaseHashtags.length) {
      // uploadHashtagsInput.setCustomValidity('Хэштеги не должны повторяться. #ХэшТег и #хэштег считаются одним и тем же тегом.');
      result.push('Хэштеги не должны повторяться. #ХэшТег и #хэштег считаются одним и тем же тегом.');
      return false;
    }
  };

  const patternCheck = () => {
    hashtags.forEach((hash) => {
      if (hash.length > MAX_HASHTAG_LENGTH ) {
        // uploadHashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку.');
        result.push('Максимальная длина одного хэш-тега 20 символов, включая решётку.');
      }

      if (!patternHashtag.test(hash)) {
        // uploadHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка). Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Хеш-тег не может состоять только из одной решётки. Максимальная длина одного хэш-тега 20 символов, включая решётку.');
        result.push('Хэш-тег начинается с символа # (решётка). Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Хеш-тег не может состоять только из одной решётки. Максимальная длина одного хэш-тега 20 символов, включая решётку.');
      }
    });
  };

  if (uploadHashtagsInput.value.length > 0) {
    amountCheck();
    patternCheck();
    repeatsCheck();
  }

  uploadHashtagsInput.setCustomValidity(result);
};

const commentCheckValidity = () => {
  const result = [];

  if (uploadCommentInput.value.length > MAX_COMMENT_LENGTH) {
    result.push('Максимальная длина комментария 140 символов');
  }

  uploadCommentInput.setCustomValidity(result);
};

const openUploadModal = () => {
  uploadEdit.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeUploadModal = () => {
  uploadEdit.classList.add('hidden');
  body.classList.remove('modal-open');
};

const uploadCancelHandler = () => {
  closeUploadModal();
};

const inputUploadHandler = () => {
  if ( uploadEdit.classList.contains('hidden') ) {
    openUploadModal();
    uploadCancelButton.addEventListener('click', uploadCancelHandler);
  }
};

uploadField.addEventListener('change', inputUploadHandler);

uploadSubmit.addEventListener('click', () => {
  // Валидация хэштегов
  hashtagCheckValidity();
  commentCheckValidity();
});

