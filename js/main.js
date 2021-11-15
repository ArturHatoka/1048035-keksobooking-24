import {fetchOfferListData} from './http.js';
import {createMap, generateMarkers} from './map.js';
import {deactivateForm, activateForm} from './form.js';
import {createMapModal} from './modal.js';
import {filterOffers} from './filter.js';

deactivateForm();

const onSuccessFetchOffer = (data) => {
  const filteredOffers = filterOffers(data);

  generateMarkers(filteredOffers);
};

const onErrorFetchOffer = () => {
  document.body.appendChild(createMapModal());
};

createMap().whenReady(()=>{
  activateForm();
  fetchOfferListData(onSuccessFetchOffer, onErrorFetchOffer);
});
