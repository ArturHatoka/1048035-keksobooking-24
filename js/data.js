import {generateMarkers} from './map.js';
import {createMapModal} from './modal.js';

const API = 'https://24.javascript.pages.academy/keksobooking/data';

const setOfferList = () => {
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      generateMarkers(data);
    })
    .catch(() => {
      document.body.appendChild(createMapModal());
    });
};

export {setOfferList};
