import {openBigPicture} from './big-picture.js';
import {pictures} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPicture = ({url, comments, likes}, index) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').dataset.photoIndex = index;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  return pictureElement;
};

const showPictures = (photos) => {
  const picturesListFragment = document.createDocumentFragment();
  photos.forEach((photo, index) => {
    const pictureElement = renderPicture(photo, index);
    picturesListFragment.appendChild(pictureElement);
  });

  picturesContainer.innerHTML = '';
  picturesContainer.appendChild(picturesListFragment);
};

const handlePhotoListClick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    evt.preventDefault();
    openBigPicture(pictures[evt.target.dataset.photoIndex]);
  }
};

picturesContainer.addEventListener('click', handlePhotoListClick);

export {showPictures};
