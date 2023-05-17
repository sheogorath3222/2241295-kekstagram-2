import {isNotLongerThan} from './utils.js';

const pictureForm = document.querySelector('#upload-select-image');

const MAX_HASH_TAGS_VALUE = 3;
const MAX_HASH_TAG_LENGTH = 10;
const MAX_COMMENT_LENGTH = 100;

const validateHashTags = (hashTagsString) => {
  if (hashTagsString.length === 0) {
    return true;
  }

  const hashTags = hashTagsString.toLowerCase().split(' ');

  if (hashTags.length > MAX_HASH_TAGS_VALUE) {
    return false;
  }

  return hashTags.every((hashTag) => /(^|\B)#(?![0-9]+\b)([a-zA-Z0-9]{1,19})(\b|\r)/g.test(hashTag)
    && isNotLongerThan(hashTag, MAX_HASH_TAG_LENGTH));
};

const validateComment = (comment) => (isNotLongerThan(comment, MAX_COMMENT_LENGTH));

const pristine = new Pristine(pictureForm);

pristine.addValidator(
  pictureForm.querySelector('.text__hashtags'),
  validateHashTags,
  'Максимальное число хэш-тегов - 3'
);

pristine.addValidator(
  pictureForm.querySelector('.text__description'),
  validateComment,
  'Максимум 100 символов'
);

pictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
