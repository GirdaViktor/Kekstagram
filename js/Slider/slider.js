import '../Slider/slider.js';
import {updatePreviewEffect} from '../UploadFile/UploadFile.js';

const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');

const getCurrentEffect = () => {
  let classNameEffect;
  classNameEffect = 'none';

  if(imgPreview.hasAttribute('class')) {
    classNameEffect = imgPreview.className.slice(imgPreview.className.lastIndexOf('-') + 1);
  }

  return classNameEffect;
};

const activeSlider = (effect) => {
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

const destroySlider = () => {
  imgUploadEffectLevel.style = 'display: none';
  imgPreview.style.filter = '';
  effectLevelSlider.noUiSlider.destroy();
};

export {activeSlider, destroySlider};
