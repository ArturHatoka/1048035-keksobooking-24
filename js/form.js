import {setDefaultCoordsSelectMarker} from './map.js';
import {fetchSendForm} from './http.js';
import {createErrModal, createSuccessModal} from './modal.js';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const roomsSelector = document.querySelector('#room_number');
const capacitySelector = document.querySelector('#capacity');
const houseTypeSelector = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelector = document.querySelector('#timein');
const timeoutSelector = document.querySelector('#timeout');
const address = document.querySelector('#address');
const submit = document.querySelector('.ad-form__submit');
const clear = document.querySelector('.ad-form__reset');
const startCoords = [35.6895000, 139.6917100];

const houseTypePrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const getCapacityOptions = (roomsNumb) => {
  const options = document.createDocumentFragment();

  if(roomsNumb <= 3){
    for (let i = 1; i<=roomsNumb; i++){
      const option = document.createElement('option');
      const ending = i === 1 ? 'я' : 'ей';

      option.value = `${i}`;
      option.textContent = `для ${i} гост${ending}`;

      options.appendChild(option);
    }
  } else {
    const option = document.createElement('option');
    option.value = '0';
    option.textContent = 'не для гостей';

    options.appendChild(option);
  }

  return options;
};

const changeActivityElements = (formWrap, activity) => {
  formWrap.disabled = activity;
};

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  changeActivityElements(form, 'disabled');
  changeActivityElements(mapFilters, 'disabled');
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  changeActivityElements(form, false);
  changeActivityElements(mapFilters, false);
};

const onRoomsNumberChange = () => {
  const options = getCapacityOptions(roomsSelector.value);

  capacitySelector.innerHTML = '';
  capacitySelector.appendChild(options);
};

const onHouseTypeChange = () => {
  const currentMinPrice = houseTypePrices[houseTypeSelector.value];

  priceInput.min = currentMinPrice;
  priceInput.placeholder = currentMinPrice;
};

const onTimeinChange = () => {
  timeoutSelector.value = timeinSelector.value;
};

const onTimeoutChange = () => {
  timeinSelector.value = timeoutSelector.value;
};

const setAddress = (lat, lng) => {
  address.value = `${lat}, ${lng}`;
};

const clearForm = () => {
  form.reset();
  priceInput.placeholder = houseTypePrices[houseTypeSelector.value];
  setAddress(startCoords[0], startCoords[1]);
  setDefaultCoordsSelectMarker();
};

const onSendSuccess = () => {
  document.body.appendChild(createSuccessModal());
  clearForm();
};

const onSendError = () => {
  document.body.appendChild(createErrModal());
};

const onFormSubmit = (e) => {
  if (form.checkValidity()){
    e.preventDefault();
    const formData = new FormData(form);
    fetchSendForm(formData, onSendSuccess, onSendError);
  }
};

capacitySelector.appendChild(getCapacityOptions(roomsSelector.value));
priceInput.min = houseTypePrices[houseTypeSelector.value];
priceInput.placeholder = houseTypePrices[houseTypeSelector.value];

setAddress(startCoords[0], startCoords[1]);

roomsSelector.addEventListener('change', onRoomsNumberChange);
houseTypeSelector.addEventListener('change', onHouseTypeChange);
timeinSelector.addEventListener('change', onTimeinChange);
timeoutSelector.addEventListener('change', onTimeoutChange);
submit.addEventListener('click', onFormSubmit);
clear.addEventListener('click', (e) => {
  e.preventDefault();
  clearForm();
});

export {deactivateForm, activateForm, setAddress, clearForm};
