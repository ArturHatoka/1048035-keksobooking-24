import {generateMarkers} from './map.js';
import {createMapModal} from './modal.js';

const FETCH_DATA = 'https://24.javascript.pages.academy/keksobooking/data';
const FORM_API = 'https://24.javascript.pages.academy/keksobooking';

const fetchOfferListData = (success, err) => {
  fetch(FETCH_DATA)
    .then((response) => response.json())
    .then((data) => {
      success(data);
    })
    .catch(() => {
      err();
    });
};

const onSuccess = (data) => {
  generateMarkers(data);
};

const onError = () => {
  document.body.appendChild(createMapModal());
};

const fetchSendForm = (formData, success, err) => {
  fetch(FORM_API, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      if (res.status === 200){
        success();
      } else {
        err();
      }
    })
    .catch(() => {
      err();
    });
};

export {fetchOfferListData, onSuccess, onError, fetchSendForm};
