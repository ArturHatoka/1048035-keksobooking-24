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

const checkType = (adv) => type.value === ANY || adv.offer.type  === type.value;

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

const checkRooms = (adv) => rooms.value === ANY || adv.offer.rooms  === Number(rooms.value);

const checkGuests = (adv) => guests.value === ANY || adv.offer.guests === Number(guests.value);


const checkFeatures = (adv) => {
  const checkedFeatures = getCheckedFeatures();
  if (checkedFeatures.length) {
    return [...checkedFeatures].every((feature) => adv.offer.features && adv.offer.features.includes(feature));
  }
  return true;
};

const onFilterChange = () => {
  const filteredOffers = getMaxOffers(computedOffers.filter((adv) => (
    checkFeatures(adv) && checkGuests(adv) &&
    checkRooms(adv) && checkPrice(adv) &&
    checkType(adv)
  )));

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
