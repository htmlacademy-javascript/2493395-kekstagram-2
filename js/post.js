import {
  getRandomArrayElement,
  getRandomInteger,
  getUniqueRandomElement
} from './utils.js';
import {
  PHOTO_CAPTIONS,
  POSTS_COUNT
} from './constants.js';
import {
  getRandomComments
} from './comments.js';

const uniqueIdGenerator = getUniqueRandomElement(1, POSTS_COUNT);
const uniquePhotoGenerator = getUniqueRandomElement(1, POSTS_COUNT);

export const createPost = () => {
  return {
    id: uniqueIdGenerator(),
    url: `photo/${uniquePhotoGenerator()}.jpg`,
    description: getRandomArrayElement(PHOTO_CAPTIONS),
    likes: getRandomInteger(15, 200),
    comments: getRandomComments(0, 30)
  };
}

export const generatePosts = Array.from({
  length: POSTS_COUNT
}, createPost);
