const templateMapModal = document.querySelector('#modal').content;
const templateSuccessModal = document.querySelector('#success').content;
const templateErrModal = document.querySelector('#error').content;

const createMapModal = () => {
  const modal = templateMapModal.cloneNode(true);

  modal.querySelector('.modal__button').addEventListener('click', ()=>{
    document.querySelector('.modal').remove();
  });

  return modal;
};

const onEscKeydown = (e) => {
  if (e.key === 'Escape'){
    document.querySelector('.modal--info').remove();
    window.removeEventListener('keydown', onEscKeydown);
  }
};

const addModalListener = (modalWrapper) => {
  modalWrapper.addEventListener('click', ()=>{
    modalWrapper.remove();
  });

  window.addEventListener('keydown', onEscKeydown);
};

const createSuccessModal = () => {
  const success = templateSuccessModal.cloneNode(true);

  addModalListener(success.querySelector('.success'));

  return success;
};

const createErrModal = () => {
  const err = templateErrModal.cloneNode(true);

  addModalListener(err.querySelector('.error'));

  return err;
};

export {createMapModal, createSuccessModal, createErrModal};
