import './UploadFile/UploadFile.js';
import './Preview/Preview.js';
import '../nouislider/nouislider.js';
import {getGallery} from './Gallery/Gallery.js';
import {getData} from './NetworkData/NetworkData.js';
import {setPictureFormSubmit} from './UploadFile/UploadFile.js';
import {onUploadSuccess, onUploadError} from './Utils/Utils.js';
import {sortFilter} from './Filters/Filters.js';

getData((pictures) => {
  getGallery(pictures);
  sortFilter(pictures);
});
setPictureFormSubmit(onUploadSuccess, onUploadError);
