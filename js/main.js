import {generatePhotos} from './data.js';
import {renderPictures} from './picture.js';
import {renderFullSize} from './full-size.js';

const DATA_AMOUNT = 25;
const photos = generatePhotos(DATA_AMOUNT);

renderPictures(photos);
renderFullSize(photos);
