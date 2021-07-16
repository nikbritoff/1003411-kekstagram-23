import '../nouislider/nouislider.js';
import {EFFECTS_DATA} from './effects-data.js';

const effectsList = document.querySelector('.effects');
const preview = document.querySelector('.img-upload__preview img');
const effectLevelInput = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderBlock = document.querySelector('.img-upload__effect-level');

// const sliderOptionsConfig = {
//   range: {
//     min: 0,
//     max: 100,
//   },
//   start: 0,
//   step: 1,
//   connect: 'lower',
// };

// const changeSliderOptions = (filter) => {
//   const min = 0;
//   let max = 100;
//   let step = 1;

//   switch(filter) {
//     case 'chrome':
//     case 'sepia':
//       max = 1;
//       step = 0.1;
//       break;
//     case 'marvin':
//       max = 100;
//       step = 1;
//       break;
//     case 'phobos':
//     case 'heat':
//       max = 3;
//       step = 0.1;
//       break;
//   }

//   sliderOptionsConfig.step = step;
//   sliderOptionsConfig.range.min = min;
//   sliderOptionsConfig.range.max = max;

//   sliderElement.noUiSlider.set(0);
//   sliderElement.noUiSlider.updateOptions(sliderOptionsConfig);
//   console.log(sliderElement.noUiSlider);
// };

const deleteFilters = () => {
  preview.className = '';
  preview.style.filter = '';
  effectLevelInput.value = '';
};

// const changeFilter = (filter) => {
//   changeSliderOptions(filter);
//   const currentClass = `effects__preview--${filter}`;
//   preview.classList.add(currentClass);
// };

// const getStyle = (filter, value) => {
//   let style = '';
//   switch(filter) {
//     case 'chrome':
//       style = `grayscale(${value})`;
//       break;
//     case 'sepia':
//       style = `sepia(${value})`;
//       break;
//     case 'marvin':
//       style = `invert(${value}%)`;
//       break;
//     case 'phobos':
//       style = `blur(${value}px)`;
//       break;
//     case 'heat':
//       style = `brightness(${value})`;
//       break;
//     case 'none':
//       style = '';
//       break;
//   }

//   return style;
// };

// effectsList.addEventListener('change', (evt) => {
//   const filterName = evt.target.value;
//   deleteFilters();

//   if (filterName !== 'none' && sliderElement.noUiSlider === undefined) {
//     noUiSlider.create(sliderElement, sliderOptionsConfig);
//   }

//   sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
//     const value = unencoded[handle];
//     preview.style.filter = getStyle(filterName, value);
//   });

//   changeFilter(filterName);

//   if (filterName === 'none') {
//     deleteFilters();
//     sliderElement.noUiSlider.destroy();
//   }

// });

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
