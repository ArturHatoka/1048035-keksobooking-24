import {fetchOfferListData} from './http.js';
import {createMap, generateMarkers} from './map.js';
import {deactivateForm, activateForm} from './form.js';
import {createMapModal} from './modal.js';

deactivateForm();

const onSuccessFetchOffer = (data) => {
  generateMarkers(data);
};

const onErrorFetchOffer = () => {
  document.body.appendChild(createMapModal());
};

createMap().whenReady(()=>{
  activateForm();
  fetchOfferListData(onSuccessFetchOffer, onErrorFetchOffer);
});
