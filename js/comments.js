import {
  getRandomInteger,
  getRandomArrayElement
} from './utils.js';
import {
  MESSAGES,
  NAMES
} from './constants.js';

export const getRandomComments = (min, max) => {
  const commentArray = [];
  let commentCount = getRandomInteger(min, max);

  while (commentArray.length < commentCount) {
    commentArray.push({
      id: getRandomInteger(1, 1125),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    })
  }
  return commentArray;
}
