const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profile = document.querySelector('.profile');
const popupEditProfile = document.getElementById('editProfile');
const buttonOpenEditProfilePopup = profile.querySelector('.profile__button');
const profileEditTitle = document.getElementById('editProfileTitle');
const profileEditSubtitle = document.getElementById('editProfileSubtitle');
const popupEdit = document.getElementById('edit');
const formAddCard = popupEdit.querySelector('.form');
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button');
const formEditProfile = popupEditProfile.querySelector('.form');

export { initialCards, profile, popupEditProfile, profileEditTitle, profileEditSubtitle,
    buttonOpenEditProfilePopup, buttonOpenAddCardPopup, popupEdit,
    formAddCard, formEditProfile
}

export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_inactive',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__input-error_active'
  };