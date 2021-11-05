const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createFeatures = (data) => {
  const featuresWrapper = document.createElement('ul');
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

const createImgTemplate = () => {
  const imgTemplate = document.createElement('img');
  imgTemplate.alt = 'Фотография жилья';
  imgTemplate.className = 'popup__photo';

  return imgTemplate;
};

const createGallery = (data) => {
  const gallery = document.createElement('div');
  gallery.className = 'popup__photos';

  const imgTemplate = createImgTemplate();

  for (const imgSrc of data){
    const img = imgTemplate.cloneNode(false);
    img.src = imgSrc;
    gallery.appendChild(img);
  }

  return gallery;
};

const generateCard = (data) => {
  const popup = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const title = popup.querySelector('.popup__title');
  const address = popup.querySelector('.popup__text--address');
  const price = popup.querySelector('.popup__text--price');
  const type = popup.querySelector('.popup__type');
  const capacity = popup.querySelector('.popup__text--capacity');
  const time = popup.querySelector('.popup__text--time');
  const description = popup.querySelector('.popup__description');
  const avatar = popup.querySelector('.popup__avatar');

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

  return popup;
};

export {generateCard};
