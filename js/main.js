const getRandomNumber = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const checkStringLength = (str, maxLength) => (str.length < maxLength);


const uniqueCommentIds = new Set();

const descriptionSentences = [
  'Читайте нас в Telegram',
  'Поддержите нашу работу подпиской на boosty'
];

const commentSentences = [
  'Лица у людей на фотке перекошены, как будто их избивают. ',
  'Как можно было поймать такой неудачный момент?!'
];

const names = ['Айрат', 'Ахмат', 'Тамерлан', 'Тимур', 'Карина', 'Лиза'];

const generateCommentId = () => {
  let commentId = getRandomNumber(1, 100);
  while (uniqueCommentIds.has(commentId)) {
    commentId = getRandomNumber(1, 100);
  }
  uniqueCommentIds.add(commentId);
  return commentId;
};
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: commentSentences[getRandomNumber(0, commentSentences.length - 1)],
  name: names[getRandomNumber(0, names.length - 1)]
});
const createPublication = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: descriptionSentences[getRandomNumber(0, descriptionSentences.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 2)}, createComment)
});

const publication = Array.from({length: 25}, (v, k) => createPublication(k + 1));
