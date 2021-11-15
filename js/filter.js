import {generateMarkers} from './map.js';
import {debounce} from './utils/debounce.js';

const MAX_COUNT = 10;
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const features = document.querySelector('#housing-features');
const wifi = features.querySelector('#filter-wifi');
const dishwasher = features.querySelector('#filter-dishwasher');
const parking = features.querySelector('#filter-parking');
const washer = features.querySelector('#filter-washer');
const elevator = features.querySelector('#filter-elevator');
const conditioner = features.querySelector('#filter-conditioner');

const lowPrice = 10000;
const highPrice = 50000;
let computedOffers = [];
const allFeatures = [wifi, dishwasher, parking, washer, elevator, conditioner];
const allFilters = [type, price, rooms, guests, features];

const getMaxOffers = (offers) => offers.slice(0, MAX_COUNT);

const getCheckedFeatures = () => {
  const checkedFeatures = [];

  allFeatures.forEach((feature) => {
    if (feature.checked){
      checkedFeatures.push(feature.value);
    }
  });

  return checkedFeatures;
};

const contains = (where, what) => {
  for(let i=0; i<what.length; i++){
    if(where.indexOf(what[i]) === -1) {
      return false;
    }
  }

  return true;
};

const onFilterChange = () => {
  let filteredOffers = [...computedOffers];

  if (type.value !== 'any') {
    filteredOffers = filteredOffers.filter((advert) => advert.offer.type  === type.value);
  }

  if (price.value !== 'any') {
    if (price.value === 'low') {
      filteredOffers = filteredOffers.filter((advert) => advert.offer.price <= lowPrice);
    } else if (price.value === 'middle') {
      filteredOffers = filteredOffers.filter((advert) => (advert.offer.price >= lowPrice && advert.offer.price <= highPrice));
    } else if (price.value === 'high') {
      filteredOffers = filteredOffers.filter((advert) => advert.offer.price >= highPrice);
    }
  }

  if (rooms.value !== 'any') {
    filteredOffers = filteredOffers.filter((advert) => advert.offer.rooms  === Number(rooms.value));
  }

  if (guests.value !== 'any') {
    filteredOffers = filteredOffers.filter((advert) => advert.offer.guests  === Number(guests.value));
  }

  if (wifi.checked || dishwasher.checked || parking.checked || washer.checked || elevator.checked || conditioner.checked) {
    const checkedFeatures = getCheckedFeatures();

    filteredOffers = filteredOffers.reduce((arr, el) => {
      if (el.offer.features && el.offer.features.length){

        if(contains(el.offer.features, checkedFeatures)){
          arr.push(el);
        }
      }
      return arr;
    }, []);
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
