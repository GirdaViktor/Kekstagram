import {initialData} from './Mock/InitialData.js';
import {createData} from './Mock/CreateData.js';
import {fillGallery} from './DrawPreview/DrawPreview.js';

import './UploadFile/UploadFile.js';
import '../nouislider/nouislider.js';

const data = createData(initialData);
fillGallery(data);
