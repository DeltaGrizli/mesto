import './index.css'
import { initialCards, profile, popupEditProfile, profileEditTitle, profileEditSubtitle,
    buttonOpenEditProfilePopup, buttonOpenAddCardPopup, popupEdit,
    formAddCard, formEditProfile, buttonAvatarEdit, formEditAvatar, validationConfig } from '../constants/constants.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api';
import PopupDeleteCard from "../components/PopupDeleteCard";

const formProfile = new FormValidator(validationConfig, formEditProfile);
const formCards = new FormValidator(validationConfig, formAddCard);
const formAvatar = new FormValidator(validationConfig, formEditAvatar);

const popupProfile = new PopupWithForm('#editProfile', handleProfileFormSubmit);
const popupEditt = new PopupWithForm('#edit', handleCardFormSubmit);
const popupAvatar = new PopupWithForm('#popupEditAvatar', submitNewAvatar);

const popupImage = new PopupWithImage('#photoImage');
const userInfo = new UserInfo({ userName: '.profile__title', userJob: '.profile__subtitle' });
const popupDeleteCard = new PopupDeleteCard('#popupDeleteCard', handleSubmitDeleteCard);

const cardList = new Section(
    (item) => { cardList.addItem(createCard(item))}, '.elements')
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([res, data]) => {
        userInfo.setUserInfo(res)
        cardList.renderItems(data)
    })
    .catch((err) => {
        console.log(err)
    })

function createCard(res) {
    const card = new Card(res, userInfo.userId, ".template", {
        handleCardClick: () => {
            popupImage.open({name: res.name, link: res.link})
        },
        handleDeleteCard: (card, cardId) => {
            popupDeleteCard.open(card, cardId);
        },
        handleAddLike: (card) => {
            api.putLike(card.getCardId())
                .then((res) => {
                    card.handleToggleLike(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        handleRemoveLike: (card) => {
            api.deleteLike(card.getCardId())
                .then((res) => {
                    card.handleToggleLike(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    });
    return card.generateCard();
}

function handleSubmitDeleteCard() {
    popupDeleteCard.isLoading(true);
    api.deleteCard(popupDeleteCard.cardId)
        .then(() => {
            popupDeleteCard.card.cardInstance.deleteCard()
            popupDeleteCard.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            popupDeleteCard.isLoading(false)
        })
}

function handleProfileFormSubmit(propUserInfo) {
    popupProfile.isLoading(true)
    api.patchUserInfo(propUserInfo)
        .then(res => {
            userInfo.setUserInfo(res)
            popupProfile.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            popupProfile.isLoading(false)
        })
}

function handleCardFormSubmit(propsCardInfo) {
    popupEditt.isLoading(true)
    api.postNewCard(propsCardInfo)
        .then(data => {
            cardList.prependItem(createCard(data))
            popupEditt.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            popupEditt.isLoading(false)
        })
}

function submitNewAvatar(propUserInfo) {
    popupAvatar.isLoading(true)
    api.patchAvatarInfo(propUserInfo)
        .then((res) => {
            userInfo.setUserInfo(res)
            popupAvatar.close()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            popupAvatar.isLoading(false)

        })
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
    const { name, about } = userInfo.getUserInfo();
    profileEditTitle.value = name;
    profileEditSubtitle.value = about;
    popupProfile.open();
    formProfile.resetError();
});

buttonOpenAddCardPopup.addEventListener('click', function () {
    popupEditt.open();
    formCards.disableSubmitButton();
    formCards.resetError();
});

buttonAvatarEdit.addEventListener('click', () => {
    popupAvatar.open()
    formAvatar.blockButtonOpened();
    formAvatar.resetErrors();
})

popupProfile.setEventListeners();
popupEditt.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();
cardList.renderItems();
formProfile.enableValidation();
formCards.enableValidation();
popupDeleteCard.setEventListeners();