const SHOW_COMMENTS_STEP = 5;
const commentList = document.querySelector('.social__comments');
const commentsCountElement = document.querySelector('.current-comments-count');
const commentsAmountElement = document.querySelector('.comments-count');
const loadCommentsBtn = document.querySelector('.comments-loader');

const addComments = (comments) => {
  const commentTemplate = document.querySelector('#social__comment')
    .content
    .querySelector('.social__comment');

  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  });
  commentList.appendChild(commentsListFragment);
};

let shownCommentsCount = 0;
let photoComments = [];

const hideLoadCommentsBtn = () => {
  loadCommentsBtn.classList.add('visually-hidden');
};

const addNextComments = () => {
  const commentsToAdd = photoComments.slice(shownCommentsCount, shownCommentsCount + SHOW_COMMENTS_STEP);
  addComments(commentsToAdd);
  shownCommentsCount += commentsToAdd.length;
  commentsCountElement.textContent = shownCommentsCount.toString();
};

const showCommentList = (comments) => {
  photoComments = comments;
  const commentsAmount = photoComments.length;
  commentsAmountElement.textContent = commentsAmount.toString();

  if (commentsAmount <= SHOW_COMMENTS_STEP) {
    addComments(photoComments);
    shownCommentsCount = commentsAmount;
    hideLoadCommentsBtn();
    return;
  }

  addNextComments();
};

const onLoadCommentsClick = (evt) => {
  evt.preventDefault();

  if (shownCommentsCount + SHOW_COMMENTS_STEP >= photoComments.length) {
    addComments(photoComments.slice(shownCommentsCount));
    shownCommentsCount = photoComments.length;
    commentsCountElement.textContent = shownCommentsCount.toString();
    hideLoadCommentsBtn();
    return;
  }

  addNextComments();
};

const clearCommentList = () => {
  while (commentList.firstChild) {
    commentList.removeChild(commentList.firstChild);
  }
  shownCommentsCount = 0;
  photoComments = [];
  loadCommentsBtn.classList.remove('visually-hidden');
};

loadCommentsBtn.addEventListener('click', onLoadCommentsClick);

export {showCommentList, clearCommentList};
