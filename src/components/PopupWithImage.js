import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__photo');
        this._popupPhotoName = this._popup.querySelector('.popup__name');
    }

    open(data) {
        super.open();
        const title = data.name;
        const link = data.link;
        this._popupImage.src = link;
        this._popupImage.alt = title;
        this._popupPhotoName.textContent = title;
    }
}