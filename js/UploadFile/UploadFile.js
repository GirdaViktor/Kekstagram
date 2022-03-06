import {isEscapeKey} from '../Utils/Utils.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const STEP_RESIZE = 25;
const MIN_PREVIEW_SIZE = 25;
const MAX_PREVIEW_SIZE = 100;
const imgUploadCancel = document.querySelector('.img-upload__cancel');

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
  document.removeEventListener('keydown', closeUploadEscPress);
  imgUploadCancel.removeEventListener('click', closeOverlay);
};

const closeUploadEscPress = (evt) => {
  if(isEscapeKey(evt)) {
    closeOverlay();
  }
};


const onOpenUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadPreviewContainer.addEventListener('click', resizePreview);

  scaleControlValue.value = '100%';
  scaleControlValue.currentValue = '100%';
  document.addEventListener('keydown', closeUploadEscPress);
  imgUploadCancel.addEventListener('click', closeOverlay);
};

uploadFile.addEventListener('change', onOpenUploadOverlay);
