import '../Slider/slider.js';
import {updatePreviewEffect} from '../UploadFile/UploadFile.js';
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const getCurrentEffect = () => {
  const imgPreview = document.querySelector('.img-upload__preview img');
  const classNameEffect = imgPreview.className;
  return classNameEffect.slice(classNameEffect.lastIndexOf('-') + 1);
};

export const activeSlider = (effect) => {
  imgUploadEffectLevel.style = 'display: block';

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: effect.start,
      max: effect.end,
    },
    start: effect.end,
    step: effect.step,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', (values) => {
    updatePreviewEffect(getCurrentEffect(), values);
  });
};

export const destroySlider = () => {
  imgUploadEffectLevel.style = 'display: none';
  effectLevelSlider.noUiSlider.destroy();
};

