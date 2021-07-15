import '../nouislider/nouislider.js';

const effectsList = document.querySelector('.effects');
const uploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

const sliderElement = document.querySelector('.effect-level__slider');

const sliderOptionsConfig = {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
};

// noUiSlider.create(sliderElement, sliderOptionsConfig);

const changeSliderOptions = (filter) => {
  const min = 0;
  let max = 100;
  let step = 1;

  switch(filter) {
    case 'chrome':
    case 'sepia':
      max = 1;
      step = 0.1;
      break;
    case 'marvin':
      max = 100;
      step = 1;
      break;
    case 'phobos':
    case 'heat':
      max = 3;
      step = 0.1;
      break;
  }

  sliderOptionsConfig.step = step;
  sliderOptionsConfig.range.min = min;
  sliderOptionsConfig.range.max = max;

  sliderElement.noUiSlider.set(0);
  sliderElement.noUiSlider.updateOptions(sliderOptionsConfig);
  console.log(sliderElement.noUiSlider);
};

const deleteFilters = () => {
  uploadPreview.className = '';
};

const changeFilter = (filter) => {
  changeSliderOptions(filter);
  const currentClass = `effects__preview--${filter}`;
  uploadPreview.classList.add(currentClass);
};

const getStyle = (filter, value) => {
  let style = '';
  switch(filter) {
    case 'chrome':
      style = `grayscale(${value})`;
      break;
    case 'sepia':
      style = `sepia(${value})`;
      break;
    case 'marvin':
      style = `invert(${value}%)`;
      break;
    case 'phobos':
      style = `blur(${value}px)`;
      break;
    case 'heat':
      style = `brightness(${value})`;
      break;
    case 'none':
      style = '';
      break;
  }

  return style;
};

effectsList.addEventListener('change', (evt) => {
  const filterName = evt.target.value;
  deleteFilters();
  if (filterName !== 'none' && sliderElement.noUiSlider === undefined) {
    noUiSlider.create(sliderElement, sliderOptionsConfig);

    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      const value = unencoded[handle];
      uploadPreview.style.filter = getStyle(filterName, value);
    });
  }

  changeFilter(filterName);

  if (filterName === 'none') {
    deleteFilters();
    sliderElement.noUiSlider.destroy();
  }

});

