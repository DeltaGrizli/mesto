import { initialCards, validationConfig } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const
    profile = document.querySelector('.profile'),
    popupEditProfile = document.getElementById('editProfile'),
    buttonOpenEditProfilePopup = profile.querySelector('.profile__button'),
    profileEditTitle = document.getElementById('editProfileTitle'),
    profileEditSubtitle = document.getElementById('editProfileSubtitle'),
    buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__close'),

    popupEdit = document.getElementById('edit'),
    formAddCard = popupEdit.querySelector('.form'),
    buttonCloseAddCardPopup = popupEdit.querySelector('.popup__close'),
    titleEdit = document.getElementById('editTitle'),
    subtitleEdit = document.getElementById('editSubtitle'),
    buttonOpenAddCardPopup = profile.querySelector('.profile__add-button'),

    profileName = profile.querySelector('.profile__title'),
    profileProfession = profile.querySelector('.profile__subtitle'),
    formEditProfile = popupEditProfile.querySelector('.form'),


    photoPopup = document.querySelector('.popup_backblack'),
    photoImage = document.getElementById('photoImage'),
    popupPhotoName = photoPopup.querySelector('.popup__name'),
    popupImage = photoPopup.querySelector('.popup__photo'),
    buttonCloseImagePopup = photoImage.querySelector('.popup__close'),


    cardsSection = document.querySelector('.elements');

    


function initPhotoPopup(photoName, photoImg) {
    popupImage.src = photoImg;
    popupPhotoName.textContent = photoName;
    popupImage.alt = photoName;
    openPopup(photoImage);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
    formCards.disableSubmitButton();
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
};

function closePopupByClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
};

const formProfile = new FormValidator(validationConfig, formEditProfile);
const formCards = new FormValidator(validationConfig, formAddCard);

function createCard(data, cardSelector) {
    const card = new Card(data, cardSelector);
    return card.generateCard();
}

function renderElements() {
    initialCards.forEach((item) => {
        const cardsTemplate = createCard(item, '#template');
        cardsSection.append(cardsTemplate);
    });
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editProfileTitle.value;
    profileProfession.textContent = editProfileSubtitle.value;
    closePopup(popupEditProfile);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const dataAdd = {
        name: titleEdit.value,
        link: subtitleEdit.value
    }
    cardsSection.prepend(createCard(dataAdd, '#template'));
    closePopup(popupEdit);
    formAddCard.reset();
};

buttonOpenEditProfilePopup.addEventListener('click', function () {
    openPopup(popupEditProfile);
    profileEditTitle.value = profileName.textContent;
    profileEditSubtitle.value = profileProfession.textContent;
    formProfile.resetError();
});

buttonCloseEditProfilePopup.addEventListener('click', function () {
    closePopup(popupEditProfile);
});

buttonOpenAddCardPopup.addEventListener('click', function () {
    openPopup(popupEdit);
});

buttonCloseAddCardPopup.addEventListener('click', function () {
    closePopup(popupEdit);
});

buttonCloseImagePopup.addEventListener('click', function () {
    closePopup(photoImage);
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

formAddCard.addEventListener('submit',  handleCardFormSubmit);

popupEdit.addEventListener('mousedown', closePopupByClick);

popupEditProfile.addEventListener('mousedown', closePopupByClick);

photoImage.addEventListener('mousedown', closePopupByClick);

renderElements();


formProfile.enableValidation();
formCards.enableValidation();

export { initPhotoPopup }