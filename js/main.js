import {generatePhotos} from './data.js';
import {addPicturesOnPage} from './picture.js';
import './picture.js';

const DATA_AMOUNT = 25;

generatePhotos(DATA_AMOUNT);
addPicturesOnPage(5);

