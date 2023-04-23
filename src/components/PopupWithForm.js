import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._callback = submitForm;
        this._inputList = this._popup.querySelectorAll('.form__input')
        this._submitButtom = this._popup.querySelector('.form__save');
        this._form = this._popup.querySelector('.form');
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) =>{ 
            formValues[input.name] = input.value; 
          }); 
        return formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callback(this._getInputValues());
            this.close();
        });
    };

    close() {
        super.close();
        this._form.reset();
    }
}