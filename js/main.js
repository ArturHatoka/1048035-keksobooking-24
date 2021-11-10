import {fetchOfferListData, onSuccessFetchOffer, onErrorFetchOffer} from './http.js';
import {createMap} from './map.js';
import {deactivateForm, activateForm} from './form.js';

deactivateForm();

createMap().whenReady(()=>{
  activateForm();
  fetchOfferListData(onSuccessFetchOffer, onErrorFetchOffer);
});
