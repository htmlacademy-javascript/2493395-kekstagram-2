import {
  isEnterKey,
  isEscapeKey
} from './utils.js';

import {
  generatePosts
} from './post.js';


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
  const currentPost = generatePosts.find((post) => post.id === Number(pictureId));

  descriptionBigPicture.textContent = currentPost.description;
  imgBigPicture.src = currentPost.url;
  likesBigPicture.textContent = currentPost.likes;

  commentsContainer.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  currentPost.comments.forEach((comment) => {
    const socialComment = commentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialComment.querySelector('.social__picture').alt = comment.name;

    commentsFragment.appendChild(socialComment);
  });

  commentsContainer.appendChild(commentsFragment);

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}
