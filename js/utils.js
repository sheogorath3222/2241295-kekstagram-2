const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const isNotLongerThan = (str, maxLength) => str.length <= maxLength;

const isEsc = (evt) => (evt.key === 'Escape');

export {getRandomNumber, isNotLongerThan, isEsc};
