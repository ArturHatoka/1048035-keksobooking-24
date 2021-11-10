import {generateMarkers} from './map.js';
import {createMapModal} from './modal.js';

const FETCH_DATA = 'https://24.javascript.pages.academy/keksobooking/data';
const FORM_API = 'https://24.javascript.pages.academy/keksobooking';

const fetchOfferListData = (onSuccess, onError) => {
  fetch(FETCH_DATA)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

const onSuccessFetchOffer = (data) => {
  generateMarkers(data);
};

const onErrorFetchOffer = () => {
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

export {fetchOfferListData, onSuccessFetchOffer, onErrorFetchOffer, fetchSendForm};