import {createData} from '../Mock/CreateData.js';
import {initialData} from '../Mock/InitialData.js';
import {showAlert} from '../Utils/Utils.js';

const getData = (callback) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((item) => {
      callback(item);
    })
    .catch(() => {
      callback(createData(initialData));
      showAlert('Сервер временно не доступен. Загружены Demo-данные');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://24.javascript.pages.academy/kekstagram/', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
