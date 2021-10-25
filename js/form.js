const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const changeActivityElements = (els, activity) => {
  els.forEach((field) => {
    field.disabled = activity;
  });
};

const deactivatePage = () => {
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  changeActivityElements(form.querySelectorAll('fieldset'), 'disabled');
  changeActivityElements(mapFilters.querySelectorAll('fieldset'), 'disabled');
  changeActivityElements(mapFilters.querySelectorAll('select'), 'disabled');
};

const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  changeActivityElements(form.querySelectorAll('fieldset'), false);
  changeActivityElements(mapFilters.querySelectorAll('fieldset'), false);
  changeActivityElements(mapFilters.querySelectorAll('select'), false);
};

export {deactivatePage, activatePage};
