export default class Card {
    constructor(data, cardSelector, {handleCardClick, handleDeleteCard, handleAddLike, handleRemoveLike}) {
        this._data = data
        this._title = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._cardId = data._id;
        this._myID = myId;
        this.likes = data.likes
        this._ownerId = data.owner ? data.owner._id : null;
    }

    getCardId() {
        return this._cardId
    }

    _getTemplate() {
        this.gridCardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);
        this._cardImage = this.gridCardElement.querySelector('.elements__image');
        this._likeElement =  this.gridCardElement.querySelector('.elements__like')
        this.likeCounter = this.gridCardElement.querySelector('.elements__like_count')
        return this.gridCardElement;
    }

    handleToggleLike(res) {
        this._likeElement.classList.toggle('elements__like_active');
        this.likeCounter.textContent = res.likes.length;
    }

    toggleLike() {
        !this._likeElement.classList.contains('elements__like_active') ? this._handleAddLike(this) : this._handleRemoveLike(this)
    }

    _initialLike() {
        this.likeCounter.textContent = this.likes.length;
        const cardHasLike = this.likes.some((like) => {
            return like._id === this._myID
        })
        if(cardHasLike) {
            this._likeElement.classList.add('elements__like_active')
        }
    }

    deleteCard() {
        this.gridCardElement.remove();
    }

    _createCard() {
        const elementsCard = this._getTemplate().cloneNode(true);
        const elementsImage = this._cardImage;
        elementsCard.querySelector('.elements__title').textContent = this._title;
        elementsImage.src = this._link;
        elementsImage.alt = this._title;
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', () => {
            this.toggleLike(this)
        });

        if(this._myID === this._ownerId) {
            this.gridCardElement.querySelector('.elements__trash').addEventListener('click', () => {
                this._handleDeleteCard(this.gridCardElement, this._cardId);
            });
        }

        this._cardImage.addEventListener('click', () => {
            this._handleClick(this._title, this._link);
        });
    }

    generateCard() {
        this._getTemplate()
        this._data.owner._id !== this._myID ? this.gridCardElement.querySelector('.grid__trash').style.display = 'none' : ''
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this.gridCardElement.querySelector('.elements__title').textContent = this._title;
        this._initialLike();
        this.gridCardElement.cardInstance = this;
        return this.gridCardElement;
    }
}