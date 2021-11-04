const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const roomsSelector = document.querySelector('#room_number');
const capacitySelector = document.querySelector('#capacity');
const houseTypeSelector = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelector = document.querySelector('#timein');
const timeoutSelector = document.querySelector('#timeout');
const address = document.querySelector('#address');

const houseTypePrice = {
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

const deactivatePage = () => {
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
  const currentMinPrice = houseTypePrice[houseTypeSelector.value];

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


roomsSelector.addEventListener('change', onRoomsNumberChange);
houseTypeSelector.addEventListener('change', onHouseTypeChange);
timeinSelector.addEventListener('change', onTimeinChange);
timeoutSelector.addEventListener('change', onTimeoutChange);

export {deactivatePage, onRoomsNumberChange, onHouseTypeChange, activateForm, setAddress};
