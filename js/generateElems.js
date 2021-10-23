const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createFeatures = (data) => {
  const featuresWrapper = document.createElement('li');
  featuresWrapper.className = 'popup__features';

  if (data.length){
    data.forEach((el) => {
      const feature = document.createElement('li');
      feature.className = (`popup__feature popup__feature--${el}`);
      featuresWrapper.appendChild(feature);
    });
  }

  return featuresWrapper;
};

const createGallery = (data) => {
  const gallery = document.createElement('div');
  gallery.className = 'popup__photos';

  const imgTemplate = document.createElement('img');
  imgTemplate.width = 45;
  imgTemplate.height = 45;
  imgTemplate.alt = 'Фотография жилья';
  imgTemplate.className = 'popup__photo';

  for (const imgSrc of data){
    const img = imgTemplate.cloneNode(false);
    img.src = imgSrc;
    gallery.appendChild(img);
  }

  return gallery;
};

const generateCard = (data) => {
  const templateCard = document.querySelector('#card').content.cloneNode(true);
  const popup = templateCard.querySelector('.popup');
  const title = templateCard.querySelector('.popup__title');
  const address = templateCard.querySelector('.popup__text--address');
  const price = templateCard.querySelector('.popup__text--price');
  const type = templateCard.querySelector('.popup__type');
  const capacity = templateCard.querySelector('.popup__text--capacity');
  const time = templateCard.querySelector('.popup__text--time');
  const description = templateCard.querySelector('.popup__description');
  const avatar = templateCard.querySelector('.popup__avatar');

  const gallery = createGallery(data.offer.photos);
  const features = createFeatures(data.offer.features);

  title.textContent = data.offer.title;
  address.textContent = data.offer.address;
  price.textContent = `${data.offer.price} ₽/ночь`;
  type.textContent = types[data.offer.type];
  capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  type.textContent = types[data.offer.type];
  avatar.src = data.author.avatar;

  if (features.hasChildNodes()){
    popup.insertBefore(features, description);
  }

  if (gallery.hasChildNodes()){
    popup.appendChild(gallery);
  }

  if (data.offer.description){
    description.textContent = data.offer.description;
  } else {
    description.classList.add('hide');
  }

  return templateCard;
};

export {generateCard};
