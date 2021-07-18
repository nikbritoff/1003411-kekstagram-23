// import {generatePhotos} from './data.js';
// import {showErrorMessage, showErrorSendMessage} from './utils.js';
import {showErrorMessage} from './message.js';
import {renderPictures} from './picture.js';
import {setPicturesListener} from './full-size-picture.js';
import './upload.js';
import {fetchData} from './api.js';

const onDataLoad = (data) => {
  renderPictures(data);
  setPicturesListener(data);
};

const onDataFail = () => {
  showErrorMessage('Ошибка загрузки данных. Повторите попытку позже.');
};

fetchData(onDataLoad, onDataFail);
