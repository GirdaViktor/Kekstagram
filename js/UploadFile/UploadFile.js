import {isEscapeKey} from '../Utils/Utils.js';
import {activeSlider, destroySlider} from '../Slider/slider.js';
import {clearFormItem, validationForm} from '../Validation/Validation.js';
import {sendData} from '../NetworkData/NetworkData.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const STEP_RESIZE = 25;
const MIN_PREVIEW_SIZE = 25;
const MAX_PREVIEW_SIZE = 100;
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const FILTER_RANGE = {
  chrome: {
    start: 0,
    end: 1,
    step: 0.1,
  },
  sepia: {
    start: 0,
    end: 1,
    step: 0.1,
  },
  marvin: {
    start: 0,
    end: 100,
    step: 1,
  },
  phobos: {
    start: 0,
    end: 3,
    step: 0.1,
  },
  heat: {
    start: 1,
    end: 3,
    step: 0.1,
  },
};

const resizePreview = (evt) => {
  let currentValue = parseInt(scaleControlValue.value, 10);

  if (evt.target.closest('.scale__control--bigger')) {
    currentValue >= MAX_PREVIEW_SIZE ? MAX_PREVIEW_SIZE : currentValue += STEP_RESIZE;
  }

  if (evt.target.closest('.scale__control--smaller')) {
    currentValue <= MIN_PREVIEW_SIZE ? MIN_PREVIEW_SIZE : currentValue -= STEP_RESIZE;
  }

  scaleControlValue.value = `${currentValue}%`;
  scaleControlValue.currentValue = `${currentValue}%`;
  imgPreview.style.transform = `scale(${currentValue / 100})`;
};

const closeOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  imgUploadPreviewContainer.removeEventListener('click', resizePreview);

  uploadFile.value = '';
  uploadFile.currentValue = '';
  document.removeEventListener('keydown', onCloseUploadEscPress);
  imgUploadCancel.removeEventListener('click', closeOverlay);
  effectsList.removeEventListener('click', onSelectEffect);
};

const onCloseUploadEscPress = (evt) => {
  if(isEscapeKey(evt)) {
    closeOverlay();
  }
};

const effectPreview = (effect) => {
  imgPreview.className = '';
  if (effect !== 'none') {
    if (effectLevelSlider.closest('.noUi-target')) {
      destroySlider();
    }
    imgPreview.classList.add(`effects__preview--${effect}`);
    activeSlider(FILTER_RANGE[`${effect}`]);
  } else {
    imgPreview.removeAttribute('class');
    destroySlider();
  }
};

const onSelectEffect = (evt)=> {
  if (evt.target.closest('input')) {
    effectPreview(evt.target.closest('input').value);
  }
};

const updatePreviewEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${value * 3}px)`;
      break;
    case 'none':
      imgPreview.style.filter = '';
      effectLevelElement.value = '';
      break;
    default:
      imgPreview.style.filter = '';
      effectLevelElement.value = '';
  }
};

const openUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadPreviewContainer.addEventListener('click', resizePreview);
  imgUploadEffectLevel.style = 'display: none';
  scaleControlValue.value = '100%';
  scaleControlValue.currentValue = '100%';

  validationForm();

  document.addEventListener('keydown', onCloseUploadEscPress);
  imgUploadCancel.addEventListener('click', closeOverlay);

  imgUploadForm.addEventListener('keydown', clearFormItem);

  effectsList.addEventListener('click', onSelectEffect);
};

const setPictureFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

uploadFile.addEventListener('change', openUploadOverlay);

export {closeOverlay, effectPreview, updatePreviewEffect, setPictureFormSubmit};
