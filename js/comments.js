import {
  getData
} from './api.js';

export const getComments = async (postId) => {
  try {
    const data = await getData();
    const post = data.find((item) => item.id === postId);

    let comments = [];
    if (post && post.comments) {
      comments = post.comments;
    }

    console.log('Комментарии:', comments);
    return comments;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return [];
  }
};
