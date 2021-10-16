import {createNewOffer} from './data.js';

const createOfferList = (start, amount) => {
  const offersStruct = [];

  for (let idx = start; idx <= amount; idx++) {

    offersStruct.push(createNewOffer(idx));
  }

  return offersStruct;
};

createOfferList(1, 10);

