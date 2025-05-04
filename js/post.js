import {
  getData
} from './api.js';

const createPost = (data) => ({
  id: data.id,
  url: data.url,
  description: data.description,
  likes: data.likes,
  comments: data.comments,
});

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error');
  if (!errorTemplate) {
    return;
  }
  const errorFragment = errorTemplate.content.cloneNode(true);
  const errorElement = errorFragment.querySelector('.data-error');
  document.body.appendChild(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};


export const postsPromise = getData
  .then((data) => data.map((post) => createPost(post)))
  .catch(() => {
    showErrorMessage();
    return [];
  });
