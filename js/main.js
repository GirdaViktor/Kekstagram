import './UploadFile/UploadFile.js';
import '../nouislider/nouislider.js';
import {getGallery} from './Gallery/Gallery.js';
import {getData} from './NetworkData/NetworkData.js';
import {setPictureFormSubmit} from './UploadFile/UploadFile.js';
import {onUploadSuccess, onUploadError} from './Utils/Utils.js';

getData(getGallery);
setPictureFormSubmit(onUploadSuccess, onUploadError);
