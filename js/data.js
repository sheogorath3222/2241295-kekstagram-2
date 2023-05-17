import {getRandomNumber} from './utils.js';

const descriptionSentences = [
  'Читайте нас в Telegram',
  'Поддержите нашу работу подпиской на boosty'
];

const commentSentences = [
  'Лица у людей на фотке перекошены, как будто их избивают. ',
  'Как можно было поймать такой неудачный момент?!'
];

const names = ['Айрат', 'Ахмат', 'Тамерлан', 'Тимур', 'Карина', 'Лиза'];

function generateId(type, min, max) {
  let lastGeneratedId = 0;
  const previousValues = new Set();

  return function () {
    if (previousValues.size >= (max - min + 1)) {
      throw new Error('Выход за границы диапазона');
    }

    let currentValue;
    do {
      currentValue = getRandomNumber(min, max);
    } while (previousValues.has(currentValue));

    previousValues.add(currentValue);

    switch (type) {
      case 'publication':
        lastGeneratedId += 1;
        return lastGeneratedId;

      case 'photo':
        lastGeneratedId += 1;
        return `img-${lastGeneratedId}`;

      case 'comment':
        return currentValue;

      default:
        throw new Error('Неизвестный тип ID');
    }
  };
}

const generatePublicationId = generateId('publication', 1, Infinity);
const generatePhotoId = generateId('photo', 1, Infinity);
const generateCommentId = generateId('comment', 1, 2 ** 20);

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: commentSentences[getRandomNumber(0, commentSentences.length - 1)],
  name: names[getRandomNumber(0, names.length - 1)]
});

const generatePublication = () => ({
  id: generatePublicationId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: descriptionSentences[getRandomNumber(0, descriptionSentences.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 24)}, generateComment)
});

const generatePictures = (amount) => (Array.from({length: amount}, () => generatePublication()));
const pictures = generatePictures(25);

export {pictures};
