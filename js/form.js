const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const roomsSelector = document.querySelector('#room_number');
const capacitySelector = document.querySelector('#capacity');

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

const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  changeActivityElements(form, false);
  changeActivityElements(mapFilters, false);
};

const onChangeRoomsNumber = () => {
  const options = getCapacityOptions(roomsSelector.value);

  capacitySelector.innerHTML = '';
  capacitySelector.appendChild(options);
};

roomsSelector.addEventListener('change', onChangeRoomsNumber);

export {deactivatePage, activatePage, onChangeRoomsNumber};
