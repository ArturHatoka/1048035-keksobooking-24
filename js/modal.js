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

const createSuccessModal = () => {
  const success = templateSuccessModal.cloneNode(true);
  const successWrap = success.querySelector('.success');

  successWrap.addEventListener('click', ()=>{
    successWrap.remove();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      successWrap.remove();
    }
  });

  return success;
};

const onEscKeydown = (e) => {
  if (e.key === 'Escape'){
    document.querySelector('.error').remove();
    window.removeEventListener('keydown', onEscKeydown);
  }
};

const createErrModal = () => {
  const err = templateErrModal.cloneNode(true);
  const errWrap = err.querySelector('.error');

  errWrap.addEventListener('click', () => {
    errWrap.remove();
  });

  window.addEventListener('keydown', onEscKeydown);

  return err;
};

export {createMapModal, createSuccessModal, createErrModal};
