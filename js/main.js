import {createNewOffer} from './data.js';
import {generateCard} from './generateElems.js';
import {deactivatePage, onChangeRoomsNumber, onChangeHouseType, initForm} from './form.js';
import {createAdvertMarker} from './map.js';

deactivatePage();

const createOfferList = (start, amount) => {
  const offersStruct = [];

  for (let idx = start; idx <= amount; idx++) {
    offersStruct.push(createNewOffer(idx));
  }

  return offersStruct;
};

const offers = createOfferList(1, 10);

offers.forEach((offer) => {
  createAdvertMarker(offer.offer.location, generateCard(offer));
});

onChangeRoomsNumber();
onChangeHouseType();
initForm();
