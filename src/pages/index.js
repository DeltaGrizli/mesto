import { initialCards, profile, popupEditProfile, profileEditTitle, profileEditSubtitle,
    buttonOpenEditProfilePopup, buttonOpenAddCardPopup, popupEdit,
    formAddCard, formEditProfile, validationConfig } from '../constants/constants.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formProfile = new FormValidator(validationConfig, formEditProfile);
const formCards = new FormValidator(validationConfig, formAddCard);
const popupProfile = new PopupWithForm('#editProfile', handleProfileFormSubmit);
const popupEditt = new PopupWithForm('#edit', handleCardFormSubmit);
const popupImage = new PopupWithImage('#photoImage');
const userInfo = new UserInfo({ userName: '.profile__title', userJob: '.profile__subtitle' });
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const cardItem = createCard(item, '#template',{
        handleCardClick: () => {
                popupImage.open(item);
            }
    })
        cardList.addItem(cardItem)
    }
}, '.elements')

function createCard(data, cardSelector, cb) {
    const card = new Card(data, cardSelector, (title, link) => {
        cb.handleCardClick({ name: title, link: link });
    });
    return card.generateCard();
}

function handleProfileFormSubmit() {
    userInfo.setUserInfo({
        name: profileEditTitle.value,
        job: profileEditSubtitle.value
    })
    popupProfile.close();
}

function handleCardFormSubmit() {
    const dataAdd = {
        name: document.querySelector('#editTitle').value,
        link: document.querySelector('#editSubtitle').value
    };

    const cardAddElement = createCard(dataAdd, "#template", {
        handleCardClick: () => {
            popupImage.open(dataAdd);
        }
    });
    cardList.prependItem(cardAddElement);
    popupEditt.close();
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
    const { name, job } = userInfo.getUserInfo();
    profileEditTitle.value = name;
    profileEditSubtitle.value = job;
    popupProfile.open();
    formProfile.resetError();
});

buttonOpenAddCardPopup.addEventListener('click', function () {
    popupEditt.open();
    formCards.disableSubmitButton();
});

popupProfile.setEventListeners();
popupEditt.setEventListeners();
popupImage.setEventListeners();
cardList.renderItems();
formProfile.enableValidation();
formCards.enableValidation();