import {initialData} from './Mock/InitialData.js';
import {createData} from './Mock/CreateData.js';
import {fillGallery} from './DrawPreview/DrawPreview.js';

const data = createData(initialData);
fillGallery(data);
