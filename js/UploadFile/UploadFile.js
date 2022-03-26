import {isEscapeKey} from '../Utils/Utils.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const STEP_RESIZE = 25;
const MIN_PREVIEW_SIZE = 25;
const MAX_PREVIEW_SIZE = 100;
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textDescription = document.querySelector('.text__description');
const textHashTags = document.querySelector('.text__hashtags');

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
};

const onCloseUploadEscPress = (evt) => {
  if(isEscapeKey(evt)) {
    closeOverlay();
  }
};

const clearFormItem = (evt) => {
  if (evt.target.closest('input') || evt.target.closest('textarea')) {
    if(isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.target.value = '';
      evt.target.currentValue = '';
    }
  }
};

const checkDuplicates = (array) => (new Set(array)).size !== array.length;

const validationComment = () => {
  if (textDescription.value.length > 140) {
    textDescription.setCustomValidity('Комментарий не может превышать 140 символов');
  } else {
    textDescription.setCustomValidity('');
  }

  textDescription.reportValidity();
};

const validationHashTagCount = (arr) => {
  let messageError = '';
  if(arr.length > 5 ) {
    messageError = 'Нельзя указать больше пяти хэш-тегов';
  } else {
    messageError = '';
  }

  return messageError;
};

const validationHashTag = (str) => {
  const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  let messageError = '';

  if (str[0] !== '#') {
    messageError = 'хэш-тег начинается с символа # (решётка)';
  } else {
    if (str.length > 20) {
      messageError = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    } else if (str.length === 1) {
      messageError = 'хеш-тег не может состоять только из одной решётки';
    } else {
      if (!RE.test(str)) {
        messageError = 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;'
      } else {
        messageError = '';
      }
    }
  }
  return messageError;
};

const validationHashTags = () => {
  const hashTagArr = textHashTags.value.toLowerCase().split(' ');
  let message = '';

  message = validationHashTagCount(hashTagArr);
  hashTagArr.forEach((item) => {
    if (checkDuplicates(hashTagArr)) {
      message = 'хеш-теги не могут повторяться';
    } else {
      message = validationHashTag(item);
    }
  });

  textHashTags.setCustomValidity(message);
  textHashTags.reportValidity();
};


textDescription.addEventListener('input', validationComment);
textHashTags.addEventListener('input', validationHashTags);

const openUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadPreviewContainer.addEventListener('click', resizePreview);

  scaleControlValue.value = '100%';
  scaleControlValue.currentValue = '100%';

  document.addEventListener('keydown', onCloseUploadEscPress);
  imgUploadCancel.addEventListener('click', closeOverlay);

  imgUploadForm.addEventListener('keydown', clearFormItem);
};

uploadFile.addEventListener('change', openUploadOverlay);
