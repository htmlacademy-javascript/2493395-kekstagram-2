import {
  EFFECTS
} from './constants.js';

export const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const img = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

sliderContainer.classList.add('hidden');

const effects = EFFECTS;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  effectValue.value = value;

  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  if (selectedEffect !== 'none') {
    const effect = effects[selectedEffect];
    img.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
});

effectsList.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectName = evt.target.value;
    const effect = effects[effectName];

    img.style.filter = 'none';

    if (effectName === 'none') {
      sliderContainer.classList.add('hidden');
    } else {
      sliderContainer.classList.remove('hidden');

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: effect.min,
          max: effect.max
        },
        start: effect.max,
        step: effect.step
      });
    }
  }
});

document.querySelector('#effect-none').checked = true;
effectValue.value = '';
img.style.filter = 'none';
