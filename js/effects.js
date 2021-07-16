import '../nouislider/nouislider.js';
import {EFFECTS_DATA} from './effects-data.js';

const effectsList = document.querySelector('.effects');
const preview = document.querySelector('.img-upload__preview img');
const effectLevelInput = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderBlock = document.querySelector('.img-upload__effect-level');

const deleteFilters = () => {
  preview.className = '';
  preview.style.filter = '';
  effectLevelInput.value = '';
};

const getSliderValue = (filter, units) => {
  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelInput.value = values[handle];
    if (units) {
      preview.style.filter = `${filter}(${effectLevelInput.value}${units})`;
    } else {
      preview.style.filter = `${filter}(${effectLevelInput.value})`;
    }
  });
};

const setEffect = (evt) => {
  const currentEffect = EFFECTS_DATA[evt.target.value];

  if (!currentEffect) {
    deleteFilters();
    sliderBlock.classList.add('hidden');
  } else {
    sliderBlock.classList.remove('hidden');
    preview.classList.add(currentEffect.class);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: currentEffect.min,
        max: currentEffect.max,
      },
      start: currentEffect.start,
      step: currentEffect.step,
    });
    getSliderValue(EFFECTS_DATA[evt.target.value].filter, EFFECTS_DATA[evt.target.value].units);
  }
};

const effectsListChangeHandler = (evt) => {
  deleteFilters();
  setEffect(evt);
};

const removeSlider = () => {
  sliderElement.noUiSlider.destroy();
  preview.style.filter = '';
  effectLevelInput.value = '';
  preview.className = '';
  effectsList.removeEventListener('change',effectsListChangeHandler);
};

const setSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
  sliderBlock.classList.add('hidden');
  effectsList.addEventListener('change',effectsListChangeHandler);
};

export {setSlider, removeSlider};
