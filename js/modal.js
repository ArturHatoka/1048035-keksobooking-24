import {clearForm} from './form.js';

const templateMapModal = document.querySelector('#modal').content;
const templateSuccessModal = document.querySelector('#success').content;
const templateErrModal = document.querySelector('#error').content;

const createMapModal = () => {
  const modal = templateMapModal.cloneNode(true);
  const modalWrap = document.querySelector('.modal');

  modal.querySelector('.modal__button').addEventListener('click', ()=>{
    modalWrap.remove();
  });

  return modal;
};

const createSuccessModal = () => {
  const success = templateSuccessModal.cloneNode(true);
  const successWrap = success.querySelector('.success');

  successWrap.addEventListener('click', ()=>{
    successWrap.remove();
    clearForm();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      successWrap.remove();
      clearForm();
    }
  });

  return success;
};

const createErrModal = () => {
  const err = templateErrModal.cloneNode(true);
  const errWrap = err.querySelector('.error');

  errWrap.addEventListener('click', () => {
    errWrap.remove();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      errWrap.remove();
    }
  });

  return err;
};

export {createMapModal, createSuccessModal, createErrModal};
