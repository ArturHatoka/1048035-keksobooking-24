import {setOfferList} from './data.js';
import {createMap} from './map.js';
import {deactivateForm, activateForm} from './form.js';

deactivateForm();

createMap().whenReady(()=>{
  activateForm();
  setOfferList();
});
