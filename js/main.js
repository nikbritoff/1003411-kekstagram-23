import {generatePhotos} from './data.js';
import {renderPictures} from './picture.js';
import './upload.js';
import {getData} from './api.js';

getData(generatePhotos, renderPictures);
