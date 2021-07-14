const SCALE_CHANGE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const scaleField = document.querySelector('.scale');
const smallerButton = scaleField.querySelector('.scale__control--smaller');
const biggerButton = scaleField.querySelector('.scale__control--bigger');
const scaleInput = scaleField.querySelector('.scale__control--value');

scaleInput.value = '100%';

const increaseScale = () => {
  let value = scaleInput.value;
  value = Number(value.slice(0, value.length - 1)) + SCALE_CHANGE_STEP;
  if (value > MAX_SCALE_VALUE) {
    value = MAX_SCALE_VALUE;
  }

  return value = `${value}%`;
};

const decreaseScale = () => {
  let value = scaleInput.value;
  value = Number(value.slice(0, value.length - 1)) - SCALE_CHANGE_STEP;
  if (value < MIN_SCALE_VALUE) {
    value = MIN_SCALE_VALUE;
  }

  return value = `${value}%`;
};

const setScale = (value) => {
  scaleInput.value = value;
  imagePreview.style.transform = `scale(${value})`;
};

const scaleBiggerClickHandler = () => {
  setScale(increaseScale());
};

const scaleSmallerClickHandler = () => {
  setScale(decreaseScale());
};

const setScaleListeners = () => {
  scaleInput.value = '100%';
  biggerButton.addEventListener('click', scaleBiggerClickHandler);
  smallerButton.addEventListener('click', scaleSmallerClickHandler);
};

const removeScaleListeners = () => {
  scaleInput.value = '100%';
  biggerButton.removeEventListener('click', scaleBiggerClickHandler);
  smallerButton.removeEventListener('click', scaleSmallerClickHandler);
};

export {setScaleListeners, removeScaleListeners};
