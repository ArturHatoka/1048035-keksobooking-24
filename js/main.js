import {fetchOfferListData, onSuccess, onError} from './http.js';
import {createMap} from './map.js';
import {deactivateForm, activateForm} from './form.js';

deactivateForm();

createMap().whenReady(()=>{
  activateForm();
  fetchOfferListData(onSuccess, onError);
});
