export const PHOTO_CAPTIONS = [
  'Прекрасный закат на фоне гор.',
  'Момент радости: друзья смеются вместе.',
  'Уютный вечер с чашкой горячего кофе.',
  'Первый снег в этом году — волшебство!',
  'Море, солнце и полное расслабление.',
  'Утро начинается с ароматного завтрака.',
  'Прогулка по осеннему лесу — лучшее лекарство.',
  'Момент, когда всё идёт по плану.'
];

export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

export const NAMES = [
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

export const POSTS_COUNT = 25;

export const EFFECTS = {
  none: {
    filter: '',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};
