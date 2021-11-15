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
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const features = document.querySelector('#housing-features');

let computedOffers = [];
const allFilters = [type, price, rooms, guests, features];

const getMaxOffers = (offers) => offers.slice(0, MAX_COUNT);

const getCheckedFeatures = () => {
  const checkedFeatures = [];

  features.querySelectorAll('input:checked').forEach((checkedEl) => {
    checkedFeatures.push(checkedEl.value);
  });

  return checkedFeatures;
};

const containsFeature = (offerFeatures, checkedFeatures) => {
  for(let i=0; i<checkedFeatures.length; i++){
    if(offerFeatures.indexOf(checkedFeatures[i]) === -1) {
      return false;
    }
  }

  return true;
};

const checkType = (offers) => {
  return offers.filter((advert) => advert.offer.type  === type.value);
};

const checkPrice = (offers) => {
  let filteredOffers = [];

  if (price.value === LOW_PRICE.key) {
    filteredOffers = offers.filter((advert) => advert.offer.price <= LOW_PRICE.price);
  } else if (price.value === MIDDLE_PRICE.key) {
    filteredOffers = offers.filter((advert) => (advert.offer.price >= LOW_PRICE.price && advert.offer.price <= HIGH_PRICE.price));
  } else if (price.value === HIGH_PRICE.key) {
    filteredOffers = offers.filter((advert) => advert.offer.price >= HIGH_PRICE.price);
  }

  return filteredOffers;
};

const checkRooms = (offers) => {
  return offers.filter((advert) => advert.offer.rooms  === Number(rooms.value));
};

const checkGuests = (offers) => {
  return offers.filter((advert) => advert.offer.guests  === Number(guests.value));
};

const checkFeatures = (offers, checkedFeatures) => {
  return offers.reduce((arr, el) => {
    if (el.offer.features && el.offer.features.length){

      if(containsFeature(el.offer.features, checkedFeatures)){
        arr.push(el);
      }
    }
    return arr;
  }, []);
};

const onFilterChange = () => {
  let filteredOffers = [...computedOffers];
  const checkedFeatures = getCheckedFeatures();

  if (type.value !== ANY) {
    filteredOffers = checkType(filteredOffers);
  }

  if (price.value !== ANY) {
    filteredOffers = checkPrice(filteredOffers);
  }

  if (rooms.value !== ANY) {
    filteredOffers = checkRooms(filteredOffers);
  }

  if (guests.value !== ANY) {
    filteredOffers = checkGuests(filteredOffers);
  }

  if (checkedFeatures.length){
    filteredOffers = checkFeatures(filteredOffers, checkedFeatures);
  }

  if (filteredOffers.length > MAX_COUNT) {
    filteredOffers = getMaxOffers(filteredOffers);
  }

  generateMarkers(filteredOffers);
};

const setChangeToFilter = (filter) => {
  filter.addEventListener('change', () => {
    onFilterChange();
  });
};

const filterOffers = (offers) => {
  computedOffers = offers;

  allFilters.forEach((filter) => {
    debounce(setChangeToFilter(filter));
  });

  return getMaxOffers(computedOffers);
};

export {filterOffers};
