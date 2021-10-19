const insertText = (el, text, append) => {
  el.textContent = append ? el.textContent+text : text;
};

const insertFeatures = (featuresWrapper, data) => {
  const featuresWrapperNew = featuresWrapper.cloneNode(false);

  if (data.length){
    data.forEach((el) => {
      const feature = document.createElement('li');
      feature.className = (`popup__feature popup__feature--${el}`);
      featuresWrapperNew.appendChild(feature);
    });

    featuresWrapper.insertAdjacentElement('beforebegin', featuresWrapperNew);
  }

  featuresWrapper.remove();
};

const insertGallery = (gallery, data) => {
  const imgTemplate = gallery.querySelector('img');

  for (const imgSrc of data){
    const img = imgTemplate.cloneNode(false);
    img.src = imgSrc;
    gallery.appendChild(img);
  }

  imgTemplate.remove();
};

const generateCard = (data) => {
  const types = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  const templateCard = document.querySelector('#card').content.cloneNode(true);
  const title = templateCard.querySelector('.popup__title');
  const address = templateCard.querySelector('.popup__text--address');
  const price = templateCard.querySelector('.popup__text--price');
  const type = templateCard.querySelector('.popup__type');
  const capacity = templateCard.querySelector('.popup__text--capacity');
  const time = templateCard.querySelector('.popup__text--time');
  const featuresWrapper = templateCard.querySelector('.popup__features');
  const description = templateCard.querySelector('.popup__description');
  const photosWrapper = templateCard.querySelector('.popup__photos');
  const avatar = templateCard.querySelector('.popup__avatar');

  insertText(title, data.offer.title);
  insertText(address, data.offer.address);
  insertText(price, `${data.offer.price} ₽/ночь`);
  insertText(type, types[data.offer.type]);
  insertText(capacity, `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  insertText(time, `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  insertFeatures(featuresWrapper, data.offer.features);
  insertGallery(photosWrapper, data.offer.photos);
  avatar.src = data.author.avatar;

  if (data.offer.description){
    insertText(description, data.offer.description);
  } else {
    description.classList.add('hide');
  }

  return(templateCard);
};

export {generateCard};
