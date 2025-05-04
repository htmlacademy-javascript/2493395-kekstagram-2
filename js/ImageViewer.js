import {
  isEnterKey,
  isEscapeKey
} from './utils.js';

import {
  postsPromise
} from './post.js';

const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];
export const picturesContainer = document.querySelector('.pictures');
const body = document.querySelector('body');
const pictureBig = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const imgBigPicture = pictureBig.querySelector('.big-picture__img').querySelector('img');
const descriptionBigPicture = pictureBig.querySelector('.social__caption');
const likesBigPicture = pictureBig.querySelector('.likes-count');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

commentsContainer.innerHTML = '';

const clearComments = () => {
  currentCount = 0;
  commentsContainer.innerHTML = '';
};

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);

  renderedComments.forEach((comment) => {
    const socialComment = commentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialComment.querySelector('.social__picture').alt = comment.name;

    commentsFragment.appendChild(socialComment);
  });

  commentsContainer.appendChild(commentsFragment);
  commentCount.firstChild.textContent = `${renderedComments.length + currentCount} из `;
  commentCount.querySelector('.social__comment-total-count').textContent = comments.length;

  currentCount += COUNT_STEP;

  if (currentCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderComments = (currentPostComments) => {
  comments = currentPostComments;
  currentCount = 0;

  commentsLoader.removeEventListener('click', renderNextComments);
  commentsLoader.addEventListener('click', renderNextComments);

  renderNextComments();
};


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  pictureBig.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  pictureBig.classList.add('hidden');
  body.classList.remove('modal-open');

  clearComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

picturesContainer.addEventListener('click', (event) => {
  if (event.target.closest('.picture')) {
    openUserModal();
  }
});

picturesContainer.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt) && evt.target.closest('.picture')) {
    openUserModal();
  }
});

cancelButton.addEventListener('click', () => {
  closeUserModal();
});

cancelButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});

export const openBigPicture = (pictureId) => {
  postsPromise.then((posts) => {
    const currentPost = posts.find((post) => post.id === Number(pictureId));

    if (!currentPost) {
      return;
    }

    descriptionBigPicture.textContent = currentPost.description;
    imgBigPicture.src = currentPost.url;
    likesBigPicture.textContent = currentPost.likes;

    renderComments(currentPost.comments || []);
  });
};
