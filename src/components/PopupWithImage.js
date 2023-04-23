import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__photo');
        this._popupPhotoName = this._popup.querySelector('.popup__name');
    }

    open(data) {
        super.open();
        this._title = data.name;
        this._link = data.link;
        this._popupImage.src = this._link;
        this._popupImage.alt = this._title;
        this._popupPhotoName.textContent = this._title;
    }
}