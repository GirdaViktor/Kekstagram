import {removePictures, getGallery} from '../Gallery/Gallery.js';
import {getRandomPosts, sortByPopular} from '../Utils/Utils.js';

const sortPicture = (filter, data) => {
  switch (filter) {
    case 'filter-default':
      removePictures();
      getGallery(data);
      break;
    case 'filter-random':
      removePictures();
      getGallery(getRandomPosts(data));
      break;
    case 'filter-discussed':
      removePictures();
      getGallery(sortByPopular(data));
      break;
  }
};

export {sortPicture};
