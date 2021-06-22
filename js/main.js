import {generatePhotos} from './data.js';
import {renderPictures} from './picture.js';
import {setPicturesListener} from './full-size-picture.js';

const DATA_AMOUNT = 25;
const photos = generatePhotos(DATA_AMOUNT);

renderPictures(photos);
setPicturesListener(photos);
