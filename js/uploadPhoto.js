import {isEsc} from './utils.js';

const uploadPhotoInput = document.querySelector('#upload-file');
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelBtn = document.querySelector('#upload-cancel');

const onUploadPhotoInputChange = (evt) => {
  evt.preventDefault();
  if (uploadPhotoInput.value) {
    openUploadOverlay();
  }
};

const onUploadPhotoEscKeydown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onUploadCancelBtnClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

function openUploadOverlay() {
  uploadPhotoOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
}

function closeUploadOverlay() {
  uploadPhotoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);

  uploadPhotoInput.value = null;
}


uploadPhotoInput.addEventListener('change', onUploadPhotoInputChange);

export {openUploadOverlay, closeUploadOverlay};
