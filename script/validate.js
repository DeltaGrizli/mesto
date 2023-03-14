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
  if (inputElem.validity.valid) {
    hideInputError(formElem, inputElem, errorClass);
    return true;
  } else {
    showInputError(formElem, inputElem, inputElem.validationMessage, errorClass);
    return false;
  }
};

const setEventListeners = (formElem, inputSelector, submitButtonSelector,
  inactiveButtonClass, errorClass) => {
  const inputList = Array.from(formElem.querySelectorAll(inputSelector));
  const buttonElement = formElem.querySelector(submitButtonSelector);
  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', function () {
      if(checkInputValidity(formElem, inputElem, errorClass) && hasInvalidInput(inputList)) {
          enableSubmitButton();
      } else {
          disableSubmitButton();
      }
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElem) => {
    setEventListeners(formElem, validationConfig.inputSelector, validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass, validationConfig.errorClass);
  });
};

const hasInvalidInput = (inputList) => (inputList.map((elem) => elem.validity.valid).reduce((a, b) => a && b));

const enableSubmitButton = () => {
    currentFormSubmitButton.classList.remove(validationConfig.inactiveButtonClass);
    currentFormSubmitButton.removeAttribute('disabled');
}

const disableSubmitButton = () => {
    currentFormSubmitButton.classList.add(validationConfig.inactiveButtonClass);
    currentFormSubmitButton.setAttribute('disabled', true);
}

enableValidation(validationConfig);