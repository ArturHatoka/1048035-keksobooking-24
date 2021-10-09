const getIntRandom = (min, max) => {
  const minPos = Math.abs(min);
  const maxPos = Math.abs(max);
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_целого_числа_в_заданном_интервале_включительно
  const minCeil = Math.ceil(minPos);
  const maxFloor = Math.floor(maxPos);
  return minPos >= maxPos ? null : Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

const getFloatRandom = (min, max, order) => {
  const minPos = Math.abs(min);
  const maxPos = Math.abs(max);
  const orderPos = Math.abs(order);
  return minPos >= maxPos ? null : +((Math.random() * (maxPos - minPos + 1)) + minPos).toFixed(orderPos);
};

const getOffers = (start, amount) => {
  const offersStruct = [];
  for (let idx = start; idx <= amount; idx++) {
    const imgId = idx < 10 ? `0${idx}` : idx;
    const location = {
      lat: getFloatRandom(35.65000, 35.70000, 5),
      lng: getFloatRandom(139.70000, 139.80000, 5),
    };
    const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
    const checks = ['12:00', '13:00', '14:00'];
    const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    const photos = [
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
    ];

    offersStruct.push({
      author: {
        avatar: `img/avatars/user${imgId}.png`,
      },
      offer: {
        title: `Предложение №${idx}`,
        address: `${location.lat}, ${location.lng}`,
        price: getIntRandom(10000, 100000),
        type: types[getIntRandom(0,types.length-1)],
        rooms: getIntRandom(1, 5),
        guests: getIntRandom(1, 10),
        checkin: checks[getIntRandom(0, checks.length-1)],
        checkout: checks[getIntRandom(0, checks.length-1)],
        features: features.slice(0, getIntRandom(0, features.length-1)),
        description: `Описание помещения №${idx}`,
        photos: photos.slice(0, getIntRandom(0, features.length-1)),
        location: location,
      },
    });
  }
  return offersStruct;
};
const offers = getOffers(1,10);
