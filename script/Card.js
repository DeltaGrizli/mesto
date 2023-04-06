import { openPopup, initPhotoPopup } from './index.js'

export class Card {
    constructor(data, cardSelector, element) {
        this._title = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._element = this._getTemplate();
        this._elementsImage = this._element.querySelector('.elements__image');
    }

    _getTemplate() {
        const gridCardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);
        return gridCardElement;
    }

    _handleLikeClick() {
        this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }

    _handleTrashClick() {
        this._element.remove();
    }

    _createCard() {
        const elementsCard = this._getTemplate().cloneNode(true);
        const elementsImage = elementsCard.querySelector('.elements__image');
        elementsCard.querySelector('.elements__title').textContent = this._title;
        elementsImage.src = this._link;
        elementsImage.alt = this._title;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like').addEventListener('click', this._handleLikeClick.bind(this));

        this._element.querySelector('.elements__trash').addEventListener('click', this._handleTrashClick.bind(this));

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            initPhotoPopup(this._title, this._link);
            openPopup(photoImage);
        });
    }

    _generateCard() {
        this._setEventListeners();
        this._elementsImage.src = this._link;
        this._elementsImage.alt = 'фото';
        this._element.querySelector('.elements__title').textContent = this._title;
        return this._element;
    }
}