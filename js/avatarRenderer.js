const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('a');

export const renderPosts = function (posts) {
  const similarListFragment = document.createDocumentFragment();

  posts.forEach(({
    id,
    url,
    description,
    likes,
    comments
  }) => {
    const postElement = pictureTemplate.cloneNode(true);
    postElement.dataset.pictureId = id;
    postElement.querySelector('.picture__img').src = url;
    postElement.querySelector('.picture__img').alt = description;
    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(postElement);
  });

  picturesContainer.appendChild(similarListFragment);
};
