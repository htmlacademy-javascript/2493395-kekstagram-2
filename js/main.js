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
import './formValidator.js';
import './effectsSlider.js';
import './api.js';

postsPromise.then(postsData => {
  renderPosts(postsData);

  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      openBigPicture(currentPicture.dataset.pictureId);
    }
  });
});
