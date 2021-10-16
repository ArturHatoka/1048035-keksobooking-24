import {getRandomPositiveFloat, getRandomPositiveInteger} from './util.js';

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checks = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createNewLocation = () => ({
  lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
  lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
});

const createNewOffer = (idx) => {
  const imgId = `${idx}`.padStart(2, '0');
  const location = createNewLocation();

  return {
    author: {
      avatar: `img/avatars/user${imgId}.png`,
    },
    offer: {
      title: `Предложение №${idx}`,
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(10000, 100000),
      type: types[getRandomPositiveInteger(0,types.length-1)],
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 10),
      checkin: checks[getRandomPositiveInteger(0, checks.length-1)],
      checkout: checks[getRandomPositiveInteger(0, checks.length-1)],
      features: features.slice(0, getRandomPositiveInteger(0, features.length-1)),
      description: `Описание помещения №${idx}`,
      photos: photos.slice(0, getRandomPositiveInteger(0, features.length-1)),
      location: location,
    },
  };
};

export {createNewOffer};
