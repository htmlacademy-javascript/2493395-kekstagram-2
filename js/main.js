import {
  generatePosts
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


console.log(generatePosts);

renderPosts(generatePosts);

picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
