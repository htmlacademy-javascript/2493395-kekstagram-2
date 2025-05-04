import {
  postsPromise
} from './post.js';
import {
  renderPosts
} from './avatarRenderer.js';
import {
  picturesContainer,
  openBigPicture
} from './imageViewer.js';
import {
  initFilters
} from './imgFilters.js';
import './formValidator.js';
import './effectsSlider.js';

let currentPosts = [];

const setupPictureListeners = () => {
  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      const post = currentPosts.find((p) => p.id === +picture.dataset.pictureId);
      if (post) {
        openBigPicture(post);
      }
    }
  });
};

const updatePosts = (posts) => {
  currentPosts = posts;
  renderPosts(posts);
  setupPictureListeners();
};

postsPromise.then((posts) => {
  updatePosts(posts);
  initFilters(posts, updatePosts);
});
