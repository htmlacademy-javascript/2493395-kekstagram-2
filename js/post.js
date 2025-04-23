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

export const postsPromise = getData
  .then(data => data.map(post => createPost(post)))
  .catch(error => {
    console.error('Ошибка:', error);
    return [];
  });
