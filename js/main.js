import {createNewOffer} from './data.js';
import {deactivatePage, onRoomsNumberChange, onHouseTypeChange, activateForm} from './form.js';
import {createMap, generateMarkers} from './map.js';

deactivatePage();

const createOfferList = (amount) => {
  const offersStruct = [];

  for (let idx = 1; idx <= amount; idx++) {
    offersStruct.push(createNewOffer(idx));
  }

  return offersStruct;
};

const offers = createOfferList(10);
const map = createMap();

onRoomsNumberChange();
onHouseTypeChange();
generateMarkers(offers);

map.whenReady(()=>{
  activateForm();
});
