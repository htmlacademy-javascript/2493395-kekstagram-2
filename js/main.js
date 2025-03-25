import {
  generatePosts
} from './post.js';
import {
  renderPosts
} from './avatarRenderer.js';
import {
  picturesContainer,
  openBigPicture
} from './ImageViewer.js';


console.log(generatePosts);

renderPosts(generatePosts);

picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
