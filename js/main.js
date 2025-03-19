import {
  generatePosts
} from './post.js';
import {
  renderPosts
} from './avatarRenderer.js';

const posts = generatePosts();
console.log(posts);

renderPosts();
