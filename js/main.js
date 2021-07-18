// import {generatePhotos} from './data.js';
// import {showErrorMessage, showErrorSendMessage} from './utils.js';
import {showErrorMessage} from './message.js';
import {renderPictures} from './picture.js';
import {setPicturesListener} from './full-size-picture.js';
import './upload.js';
import {fetchData} from './api.js';

import './sort.js';
import { sorting } from './sort.js';

const onDataLoad = (data) => {
  renderPictures(data);
  setPicturesListener(data);

  sorting(data);
};

const onDataFail = () => {
  showErrorMessage('Ошибка загрузки данных. Повторите попытку позже.');
};

fetchData(onDataLoad, onDataFail);
