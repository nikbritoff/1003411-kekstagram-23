import {showErrorMessage} from './message.js';
import {renderPictures} from './picture.js';
import {setPicturesListener} from './full-size-picture.js';
import './upload.js';
import {fetchData} from './api.js';
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
