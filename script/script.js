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


const cardsTemplate = document.querySelector('#template').content.querySelector('.elements__item');

let currentFormSubmitButton = 0;

const getCurrentFormSubmitButton = () => {
    if (document.getElementsByClassName("popup_opened").length > 0 && currentFormSubmitButton === 0) {
        currentFormSubmitButton = document.getElementsByClassName("popup_opened")[0].getElementsByClassName("form__save")[0];
    }
}

initialCards.forEach(function (cardsTemplate) {
    appendCard(cardsSection, createCard(cardsTemplate.name, cardsTemplate.link));
});

function appendCard(cardsSection, name) {
    cardsSection.append(name);
}

function createCard(name, image) {
    const card = cardsTemplate.cloneNode(true);
    const elementsImage = card.querySelector('.elements__image');
    card.querySelector('.elements__title').textContent = name;
    elementsImage.src = image;
    elementsImage.alt = name;
    card.querySelector('.elements__like').addEventListener('click', handleLikeClick);
    card.querySelector('.elements__trash').addEventListener('click', handleTrashClick);
    elementsImage.addEventListener('click', function () {
        initPhotoPopup(name, image);
        togglePopupClass(photoPopup);
    });
    return card
}

function initPhotoPopup(name, image) {
    popupImage.src = image;
    popupPhotoName.textContent = name;
    popupImage.alt = name;
}

function togglePopupClass(popup) {
    if(popup.classList.toggle('popup_opened')) {
        getCurrentFormSubmitButton();
        if(hasInvalidInput(Array.from(popup.querySelectorAll(".form__input")))) {
            enableSubmitButton();
        } else {
            disableSubmitButton();
        }
        document.addEventListener('keydown', closePopupByEsc);
        document.addEventListener('mousedown', closePopupByClick);
    } else {
        currentFormSubmitButton = 0;
        document.removeEventListener('keydown', closePopupByEsc);
        document.removeEventListener('mousedown', closePopupByClick);
    }
}

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        togglePopupClass(openedPopup)
    }
}

function closePopupByClick(evt) {
    if (evt.target.classList.contains('popup')) {
        togglePopupClass(evt.target);
    }
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profileEditTitle.value;
    profileProfession.textContent = profileEditSubtitle.value;
    togglePopupClass(popupEditProfile);
}

function handleCardFormSubmit(event) {
    event.preventDefault();
    cardsSection.prepend(createCard(titleEdit.value, subtitleEdit.value));
    let buttonSubmitCardForm = togglePopupClass(popupEdit);
    formAddCard.reset();
}

function handleLikeClick(event) {
    event.target.classList.toggle('elements__like_active');
}

function handleTrashClick(event) {
    const trash = event.target.closest('.elements__trash');
    trash.closest('.elements__item').remove();
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
    togglePopupClass(popupEditProfile)
    profileEditTitle.value = profileName.textContent;
    profileEditSubtitle.value = profileProfession.textContent;
});

buttonCloseEditProfilePopup.addEventListener('click', function () {
    togglePopupClass(popupEditProfile)
});

buttonOpenAddCardPopup.addEventListener('click', function () {
    togglePopupClass(popupEdit)
});

buttonCloseAddCardPopup.addEventListener('click', function () {
    togglePopupClass(popupEdit)
});

buttonCloseImagePopup.addEventListener('click', function () {
    togglePopupClass(photoImage)
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);
const formElem = document.querySelectorAll('.form').forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
});
