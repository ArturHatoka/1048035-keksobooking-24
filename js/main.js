import {createNewOffer} from './data.js';
import {generateCard} from './generateElems.js';
import {deactivatePage, onRoomsNumberChange, onHouseTypeChange, activateForm} from './form.js';
import {createAdvertMarker, createMap} from './map.js';

deactivatePage();

const createOfferList = (amount) => {
  const offersStruct = [];
  const start = 1;

  for (let idx = start; idx <= amount; idx++) {
    offersStruct.push(createNewOffer(idx));
  }

  return offersStruct;
};

const offers = createOfferList(10);
const map = createMap();

offers.forEach((offer) => {
  const marker = createAdvertMarker(offer.offer.location);

  marker.bindPopup(generateCard(offer)).openPopup();
  marker.addTo(map);
});

onRoomsNumberChange();
onHouseTypeChange();

map.whenReady(()=>{
  activateForm();
});
