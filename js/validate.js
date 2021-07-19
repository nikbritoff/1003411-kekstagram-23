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
const uploadHashtagsInput = uploadForm.querySelector('.text__hashtags');
const uploadCommentInput = uploadForm.querySelector('.text__description');

const hashtagCheckValidity = () => {
  const hashtags = uploadHashtagsInput.value.trim().split(' ');
  let result = '';


  uploadHashtagsInput.setCustomValidity('');

  const validateAmount = () => {
    let isValid = true;
    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      result += ERRORS.hashtagAmount;
      isValid = false;
    }

    return isValid;
  };

  const validateDuplicates = () => {
    const newSet = new Set;
    let isUnique = true;
    hashtags.forEach((hashtag) => {
      newSet.add(hashtag.toLowerCase());
    });

    if (newSet.size !== hashtags.length) {
      isUnique = false;
      uploadHashtagsInput.setCustomValidity(ERRORS.hashtagDuplicates);
      result += ERRORS.hashtagDuplicates;
    }
    return isUnique;
  };

  const patternCheck = () => {
    let isValid = true;
    hashtags.forEach((hash) => {
      if (!PATTERN_HASHTAG.test(hash)) {
        isValid = false;
      }
    });

    if (!isValid) {
      result += ERRORS.hashtagPattern;
    }

    return isValid;
  };


  if (uploadHashtagsInput.value.length > 0) {
    if (!patternCheck() || !validateDuplicates() || !validateAmount()) {
      uploadHashtagsInput.setCustomValidity(result);
      uploadHashtagsInput.reportValidity();
      return false;
    } else {
      uploadHashtagsInput.setCustomValidity('');
      uploadHashtagsInput.reportValidity();
      return true;
    }
  } else {
    return true;
  }
};

const commentCheckValidity = () => {
  let result = '';
  let isValid = true;

  if (uploadCommentInput.value.length > MAX_COMMENT_LENGTH) {
    result = ERRORS.commentLength;
    isValid = false;
  }

  uploadCommentInput.setCustomValidity(result);
  uploadCommentInput.reportValidity();

  return isValid;
};

export {hashtagCheckValidity, commentCheckValidity};
