const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active'
};

const showInputError = (formElem, inputElem, errorMessage, errorClass) => {
  const errorElement = formElem.querySelector(`.${inputElem.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElem, inputElem, errorClass) => {
  const errorElement = formElem.querySelector(`.${inputElem.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ' ';
};

const checkInputValidity = (formElem, inputElem, errorClass) => {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, errorClass);
  } else {
    hideInputError(formElem, inputElem, errorClass);
  }
};

const setEventListeners = (formElem, inputSelector, submitButtonSelector,
  inactiveButtonClass, errorClass) => {
  const inputList = Array.from(formElem.querySelectorAll(inputSelector));
  const buttonElement = formElem.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', function () {
      checkInputValidity(formElem, inputElem, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElem) => {
    buttonElement = formElem.querySelector(validationConfig.submitButtonSelector);
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElem, validationConfig.inputSelector, validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass, validationConfig.errorClass);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((elem) => {
    return !elem.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(inactiveButtonClass);
}

enableValidation(validationConfig);