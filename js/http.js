const FETCH_DATA = 'https://24.javascript.pages.academy/keksobooking/data';
const FORM_API = 'https://24.javascript.pages.academy/keksobooking';

const fetchOfferListData = (onSuccess, onError) => {
  fetch(FETCH_DATA)
    .then((response) => {
      if (response.status === 200){
        return response.json();
      } else {
        onError();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

const fetchSendForm = (formData, onSuccess, onError) => {
  fetch(FORM_API, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.status === 200){
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {fetchOfferListData, fetchSendForm};
