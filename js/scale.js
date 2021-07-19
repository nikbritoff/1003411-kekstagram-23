const SCALE_CHANGE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleField = document.querySelector('.scale');
const smallerButton = scaleField.querySelector('.scale__control--smaller');
const biggerButton = scaleField.querySelector('.scale__control--bigger');
const scaleInput = scaleField.querySelector('.scale__control--value');

scaleInput.value = `${DEFAULT_SCALE_VALUE}%`;

const increaseScale = () => {
  let value = scaleInput.value;
  value = parseInt(value, 10) + SCALE_CHANGE_STEP;
  if (value > MAX_SCALE_VALUE) {
    value = MAX_SCALE_VALUE;
  }

  return value;
};

const decreaseScale = () => {
  let value = scaleInput.value;
  value = parseInt(value, 10) - SCALE_CHANGE_STEP;
  if (value < MIN_SCALE_VALUE) {
    value = MIN_SCALE_VALUE;
  }

  return value;
};

const setScale = (value) => {
  scaleInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value}%)`;
};

const scaleBiggerClickHandler = () => {
  setScale(increaseScale());
};

const scaleSmallerClickHandler = () => {
  setScale(decreaseScale());
};

const setScaleListeners = () => {
  scaleInput.value = `${DEFAULT_SCALE_VALUE}%`;
  imagePreview.style.transform = `scale(${DEFAULT_SCALE_VALUE}%)`;

  biggerButton.addEventListener('click', scaleBiggerClickHandler);
  smallerButton.addEventListener('click', scaleSmallerClickHandler);
};

const removeScaleListeners = () => {
  biggerButton.removeEventListener('click', scaleBiggerClickHandler);
  smallerButton.removeEventListener('click', scaleSmallerClickHandler);
};

export {setScaleListeners, removeScaleListeners};
