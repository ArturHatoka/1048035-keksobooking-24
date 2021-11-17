import {generateMarkers} from './map.js';
import {debounce} from './utils/debounce.js';

const MAX_COUNT = 10;
const LOW_PRICE = {
  key: 'low',
  price: 10000,
};
const MIDDLE_PRICE = {
  key: 'middle',
};
const HIGH_PRICE = {
  key: 'high',
  price: 50000,
};
const ANY = 'any';
const filter = document.querySelector('#map-filter');
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const features = document.querySelector('#housing-features');

let computedOffers = [];

const getMaxOffers = (offers) => offers.slice(0, MAX_COUNT);

const getCheckedFeatures = () => {
  const checkedFeatures = [];

  features.querySelectorAll('input:checked').forEach((checkedEl) => {
    checkedFeatures.push(checkedEl.value);
  });

  return checkedFeatures;
};

const checkType = (adv) => {
  if (type.value !== ANY) {
    return adv.offer.type  === type.value;
  }
  return true;
};

const checkPrice = (adv) => {
  if (price.value !== ANY) {
    if (price.value === LOW_PRICE.key) {
      return adv.offer.price <= LOW_PRICE.price;
    } else if (price.value === MIDDLE_PRICE.key) {
      return (adv.offer.price >= LOW_PRICE.price && adv.offer.price <= HIGH_PRICE.price);
    } else if (price.value === HIGH_PRICE.key) {
      return adv.offer.price >= HIGH_PRICE.price;
    }
    return false;
  }
  return true;
};

const checkRooms = (adv) => {
  if (rooms.value !== ANY) {
    return adv.offer.rooms  === Number(rooms.value);
  }
  return true;
};

const checkGuests = (adv) => {
  if (guests.value !== ANY) {
    return adv.offer.guests === Number(guests.value);
  }
  return true;
};

const checkFeatures = (adv, checkedFeatures) => {
  if (checkedFeatures.length) {
    return [...checkedFeatures].every((feature) => {
      if (adv.offer.features){
        return adv.offer.features.includes(feature);
      }
      return false;
    });
  }
  return true;
};

const onFilterChange = () => {
  const checkedFeatures = getCheckedFeatures();

  let filteredOffers = computedOffers.filter((adv) => (
    checkFeatures(adv, checkedFeatures) && checkGuests(adv) &&
    checkRooms(adv) && checkPrice(adv) &&
    checkType(adv)
  ));

  if (filteredOffers.length > MAX_COUNT) {
    filteredOffers = getMaxOffers(filteredOffers);
  }

  generateMarkers(filteredOffers);
};

const filterOffers = (offers) => {
  computedOffers = offers;

  filter.addEventListener('change', () => {
    debounce(onFilterChange());
  });

  return getMaxOffers(computedOffers);
};

export {filterOffers};
