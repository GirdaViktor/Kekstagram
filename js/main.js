import {initialData} from './Mock/InitialData.js';
import {createData} from './Mock/CreateData.js';
import {getGallery} from './Gallery/Gallery.js';

import './UploadFile/UploadFile.js';
import '../nouislider/nouislider.js';

getGallery(createData(initialData));
