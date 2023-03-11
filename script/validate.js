const dataInput = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active'
};

const showInputError = (formaElem, inputElem, errorMessage, errorClass) => {
  const errorElement = formaElem.querySelector(`.${inputElem.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formaElem, inputElem, errorClass) => {
  const errorElement = formaElem.querySelector(`.${inputElem.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ' ';
};

const checkInputValidity = (formaElem, inputElem, errorClass) => {
  if (!inputElem.validity.valid) {
    showInputError(formaElem, inputElem, inputElem.validationMessage, errorClass);
  } else {
    hideInputError(formaElem, inputElem, errorClass);
  }
};

const setEventListeners = (formaElem, inputSelector, submitButtonSelector,
  inactiveButtonClass, errorClass) => {
  const inputList = Array.from(formaElem.querySelectorAll(inputSelector));
  const buttonElement = formaElem.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', function () {
      checkInputValidity(formaElem, inputElem, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (dataInput) => {
  const formList = Array.from(document.querySelectorAll(dataInput.formSelector));
  formList.forEach((formaElem) => {
    window.buttonElement = formaElem.querySelector(dataInput.submitButtonSelector);
    formaElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formaElem, dataInput.inputSelector, dataInput.submitButtonSelector,
      dataInput.inactiveButtonClass, dataInput.errorClass);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((elem) => {
    return !elem.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    blockButtonOpened(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const blockButtonOpened = (buttonElement, inactiveButtonClass) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(inactiveButtonClass);
}

enableValidation(dataInput);