import {showCommentList, clearCommentList} from './comments.js';

const openBigPicture = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  if (!bigPicture) return;

  const imgElement = bigPicture.querySelector('.big-picture__img')?.lastElementChild;
  const socialCaptionElement = bigPicture.querySelector('.social__caption');
  const likesCountElement = bigPicture.querySelector('.likes-count');
  const closePictureElement = bigPicture.querySelector('.big-picture__cancel');

  if (!closePictureElement) return;

  if (imgElement) {
    imgElement.src = photo.url;
    imgElement.setAttribute('alt', 'Фото пользователя');
  }

  if (socialCaptionElement) {
    socialCaptionElement.textContent = photo.description;
  }

  if (likesCountElement) {
    likesCountElement.textContent = photo.likes;
  }

  const onBigPhotoEscKeydown = (evt) => {
    const isEscapeKey = (evt) => evt.code === 'Escape' || evt.code === 'Esc';
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const onClosePictureClick = () => {
    closeBigPicture();
  };

  closePictureElement.addEventListener('click', onClosePictureClick);
  document.addEventListener('keydown', onBigPhotoEscKeydown);

  showCommentList(photo.comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  const bigPicture = document.querySelector('.big-picture');
  if (!bigPicture) return;

  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  clearCommentList();

  const closePictureElement = bigPicture.querySelector('.big-picture__cancel');
  if (closePictureElement) {
    closePictureElement.removeEventListener('click', onClosePictureClick);
  }

  document.removeEventListener('keydown', onBigPhotoEscKeydown);
};

export {openBigPicture, closeBigPicture};
