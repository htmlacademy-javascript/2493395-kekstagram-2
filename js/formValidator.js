import {
  isEnterKey,
  isEscapeKey
} from './utils.js';
import {
  sliderContainer
} from './effectsSlider.js';
import {
  sendData
} from './api.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_HASHTAGS_COUNT = 5;
const SCALE_STEP = 0.25;
const fileInput = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');
const uploadForm = document.querySelector('.img-upload__form');
const imgInput = uploadForm.querySelector('.img-upload__input');
const imgOverlay = uploadForm.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const img = uploadForm.querySelector('.img-upload__preview img');
let scale = 1;


const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleValue.value = `${scale * 100}%`;
  }
};

fileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    imgPreview.src = URL.createObjectURL(file);
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgModal();
  }
};

function openImgModal() {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  bigger.addEventListener('click', onBiggerClick);
  smaller.addEventListener('click', onSmallerClick);
}

function closeImgModal() {
  imgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);

  bigger.removeEventListener('click', onBiggerClick);
  smaller.removeEventListener('click', onSmallerClick);

  scale = 1;
  img.style.transform = `scale(${scale})`;
  scaleValue.value = `${scale * 100}%`;
}

imgInput.addEventListener('change', () => {
  openImgModal();
});

cancelButton.addEventListener('click', () => {
  closeImgModal();
});

cancelButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImgModal();
  }
});

const validateHashtag = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }

  const hasDuplicates = hashtags.some((tag, index) =>
    hashtags.includes(tag, index + 1)
  );
  if (hasDuplicates) {
    return false;
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  for (const hashtag of hashtags) {
    if (hashtag === '#' || !hashtagRegex.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const getHashtagErrorMessage = (value) => {
  if (!value) {
    return '';
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
  }

  const hasDuplicates = hashtags.some((tag, index) =>
    hashtags.includes(tag, index + 1)
  );
  if (hasDuplicates) {
    return 'Один и тот же хэштег не может быть использован дважды';
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  for (const hashtag of hashtags) {
    if (hashtag === '#' || !hashtagRegex.test(hashtag)) {
      return 'Недопустимый хэштег';
    }
  }

  return '';
};

const validateComment = (value) => value.length <= MAX_LENGTH_COMMENT;

const getCommentErrorMessage = (value) => value.length > MAX_LENGTH_COMMENT ? `Длина комментария не может быть больше ${MAX_LENGTH_COMMENT} символов` : '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentInput,
  validateComment,
  getCommentErrorMessage
);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

bigger.addEventListener('click', onBiggerClick);
smaller.addEventListener('click', onSmallerClick);

const resetForm = () => {
  scale = 1;
  img.style.transform = `scale(${scale})`;
  scaleValue.value = `${scale * 100}%`;
  const originalEffect = uploadForm.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
    img.style.filter = 'none';
  }
  hashtagInput.value = '';
  commentInput.value = '';
  fileInput.value = '';
  imgPreview.src = 'img/upload-default-image.jpg';
  sliderContainer.classList.add('hidden');
};

cancelButton.addEventListener('click', () => {
  closeImgModal();
  resetForm();
});

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successFragment = successTemplate.content.cloneNode(true);
  const successElement = successFragment.querySelector('.success');

  document.body.appendChild(successElement);

  const onSuccessEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccessMessage();
    }
  };

  const onSuccessOutsideClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessMessage();
    }
  };

  function closeSuccessMessage() {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
    document.removeEventListener('click', onSuccessOutsideClick);
  }

  const successButton = successElement.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessOutsideClick);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error');
  const errorFragment = errorTemplate.content.cloneNode(true);
  const errorElement = errorFragment.querySelector('.error');

  document.body.appendChild(errorElement);

  const onErrorEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessage();
    }
  };

  const onErrorOutsideClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  };

  function closeErrorMessage() {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.removeEventListener('click', onErrorOutsideClick);
  }

  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onErrorOutsideClick);
};

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  try {
    const formData = new FormData(uploadForm);
    await sendData(formData);
    closeImgModal();
    resetForm();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
  }
});
