const templateMapModal = document.querySelector('#modal').content;
const templateSuccessModal = document.querySelector('#success').content;
const templateErrModal = document.querySelector('#error').content;

const createMapModal = () => {
  const template = templateMapModal.cloneNode(true);
  const closeBtn = template.querySelector('.modal__button');
  const modal = template.querySelector('.modal');

  closeBtn.addEventListener('click', () => {
    modal.remove();
  });

  return template;
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
