const PHOTO_CAPTIONS = [
  'Прекрасный закат на фоне гор.',
  'Момент радости: друзья смеются вместе.',
  'Уютный вечер с чашкой горячего кофе.',
  'Первый снег в этом году — волшебство!',
  'Море, солнце и полное расслабление.',
  'Утро начинается с ароматного завтрака.',
  'Прогулка по осеннему лесу — лучшее лекарство.',
  'Момент, когда всё идёт по плану.'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const NAMES = [
  'Иван',
  'Игорь',
  'Мария',
  'Анастасия',
  'Виктор',
  'Михаил',
  'Павел',
  'Егор',
  'Наталья'
];

const POSTS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueRandomElement = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomComments = (min, max) => {
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

const uniqueIdGenerator = getUniqueRandomElement(1, POSTS_COUNT);
const uniquePhotoGenerator = getUniqueRandomElement(1, POSTS_COUNT);

const createPost = () => {
  return {
    id: uniqueIdGenerator(),
    url: `photo/${uniquePhotoGenerator()}.jpg`,
    description: getRandomArrayElement(PHOTO_CAPTIONS),
    likes: getRandomInteger(15, 200),
    comments: getRandomComments(0, 30)
  };
}

const post = Array.from({
  length: POSTS_COUNT
}, createPost);

console.log(post)
