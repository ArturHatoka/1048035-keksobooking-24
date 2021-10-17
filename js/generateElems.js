const hideElem = (parent, elemSelector) => {
  if (elemSelector){
    parent.querySelector(elemSelector).classList.add('hidden');
  } else {
    parent.classList.add('hidden');
  }
};

const insertText = (parent, elemSelector, text, append) => {
  parent.querySelector(elemSelector).textContent = append ? parent.querySelector(elemSelector).textContent+text : text;
};

const generateElem = (parent, elemSelector, data, text, append) => {
  if (data){
    insertText(parent, elemSelector, text ? text : data, append);
  } else {
    hideElem(parent, elemSelector);
  }
};

const getTypeText = (type) => {
  let text = '';

  if (type === 'flat'){
    text = 'Квартира';
  } else if (type === 'bungalow'){
    text = 'Бунгало';
  } else if (type === 'house'){
    text = 'Дом';
  } else if (type === 'palace'){
    text = 'Дворец';
  } else if (type === 'hotel'){
    text = 'Отель';
  }

  return text;
};

const generateFeatures = (parent, elemSelector, data) => {
  if (data.length){
    const allFeatures = parent.querySelectorAll(elemSelector);

    for (const feature of allFeatures){
      if (!data.some((el) => feature.classList.contains(`popup__feature--${el}`))){
        hideElem(feature);
      }
    }
  } else {
    hideElem(parent, `${elemSelector}s`);
  }

};

const generateImg = (parent, elemSelector, src) => {
  parent.querySelector(elemSelector).src = src;
};

const generateGallery = (parent, elemSelector, data) => {
  const gallery = parent.querySelector(elemSelector);
  const imgTemplate = gallery.querySelector('img');

  for (const imgSrc of data){
    const img = imgTemplate.cloneNode(false);
    img.src = imgSrc;
    gallery.appendChild(img);
  }

  imgTemplate.remove();
};

const generateCard = (templateSelector, data) => {
  const templateCard = document.querySelector(templateSelector).content.cloneNode(true);
  const cardWrapper = document.querySelector('#map-canvas');

  generateElem(templateCard, '.popup__title', data.offer.title);
  generateElem(templateCard, '.popup__text--address', data.offer.address);
  generateElem(templateCard, '.popup__text--price', data.offer.price, `${data.offer.price} ₽/ночь`);
  generateElem(templateCard, '.popup__text--address', data.offer.address);
  generateElem(templateCard, '.popup__type', data.offer.type, getTypeText(data.offer.type));
  generateElem(templateCard, '.popup__text--capacity', data.offer.rooms, `${data.offer.rooms} комнаты`);
  generateElem(templateCard, '.popup__text--capacity', data.offer.guests, ` для ${data.offer.guests} гостей`, true);
  generateElem(templateCard, '.popup__text--time', data.offer.checkin, `Заезд после ${data.offer.checkin}`);
  generateElem(templateCard, '.popup__text--time', data.offer.checkout, `, выезд до ${data.offer.checkout}`, true);
  generateFeatures(templateCard,'.popup__feature', data.offer.features);
  generateElem(templateCard,'.popup__description', data.offer.description);
  generateGallery(templateCard,'.popup__photos', data.offer.photos);
  generateImg(templateCard,'.popup__avatar', data.author.avatar);

  cardWrapper.appendChild(templateCard);
};

export {generateCard};
