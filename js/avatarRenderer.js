import {
  generatePosts
} from './post.js';


const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('a');

const similarPosts = generatePosts;

export const renderPosts = function (posts) {
  const similarListFragment = document.createDocumentFragment();

  similarPosts.forEach(({
    url,
    description,
    likes,
    comments
  }) => {
    const postElement = pictureTemplate.cloneNode(true);
    postElement.querySelector('.picture__img').src = url;
    postElement.querySelector('.picture__img').alt = description;
    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(postElement);
  });

  picturesContainer.appendChild(similarListFragment);
};
