export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._element = this._getTemplate();
        this._handleClick = handleCardClick;
        this._cardImage = this._element.querySelector('.elements__image');
        this._elementsLike = this._element.querySelector('.elements__like');
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
        this._elementsLike.classList.toggle('elements__like_active');
    }

    _handleTrashClick() {
        this._element.remove();
        this._element = null;
    }

    _createCard() {
        const elementsCard = this._getTemplate().cloneNode(true);
        const elementsImage = this._cardImage;
        elementsCard.querySelector('.elements__title').textContent = this._title;
        elementsImage.src = this._link;
        elementsImage.alt = this._title;
    }

    _setEventListeners() {
        this._elementsLike.addEventListener('click', this._handleLikeClick.bind(this));

        this._element.querySelector('.elements__trash').addEventListener('click', this._handleTrashClick.bind(this));

        this._cardImage.addEventListener('click', () => {
            this._handleClick(this._title, this._link);
        });
    }

    generateCard() {
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._element.querySelector('.elements__title').textContent = this._title;
        return this._element;
    }
}