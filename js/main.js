import {createNewOffer} from './data.js';
import {generateCard} from './generateElems.js';
import {deactivatePage, activatePage, onChangeRoomsNumber} from './form.js';

deactivatePage();

const createOfferList = (start, amount) => {
  const offersStruct = [];

  for (let idx = start; idx <= amount; idx++) {

    offersStruct.push(createNewOffer(idx));
  }

  return offersStruct;
};

const offers = createOfferList(1, 10);
const card = generateCard(offers[0]);

document.querySelector('#map-canvas').appendChild(card);

onChangeRoomsNumber();
activatePage();

