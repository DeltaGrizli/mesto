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


const cardsTemplate = document.querySelector('#template').content,
    item = cardsTemplate.querySelector('.elements__item');

initialCards.forEach(function (item) {
    appendCard(cardsSection, createCard(item.name, item.link));
});

function appendCard(cardsSection, name) {
    cardsSection.append(name);
}

function createCard(name, image) {
    const card = item.cloneNode(true);
    const elementsImage = card.querySelector('.elements__image');
    card.querySelector('.elements__title').textContent = name;
    elementsImage.src = image;
    elementsImage.alt = name;
    card.querySelector('.elements__like').addEventListener('click', handleLikeClick);
    card.querySelector('.elements__trash').addEventListener('click', handleTrashClick);
    elementsImage.addEventListener('click', function () {
        initPhotoPopup(name, image);
        openPopup(photoPopup);
    });
    return card
}
function initPhotoPopup(name, image) {
    popupImage.src = image;
    popupPhotoName.textContent = name;
    popupImage.alt = name;

}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
    document.addEventListener('mousedown', closePopupByClick);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    document.removeEventListener('mousedown', closePopupByClick);
}

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
};

function closePopupByClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
};

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profileEditTitle.value;
    profileProfession.textContent = profileEditSubtitle.value;
    closePopup(popupEditProfile);
}

function handleCardFormSubmit(event) {
    event.preventDefault();
    cardsSection.prepend(createCard(titleEdit.value, subtitleEdit.value));
    closePopup(popupEdit);
    formAddCard.reset();
    disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);
}

function handleLikeClick(event) {
    event.target.classList.toggle('elements__like_active');
};

function handleTrashClick(event) {
    const trash = event.target.closest('.elements__trash');
    trash.closest('.elements__item').remove();
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
    openPopup(popupEditProfile)
    profileEditTitle.value = profileName.textContent;
    profileEditSubtitle.value = profileProfession.textContent;
});

buttonCloseEditProfilePopup.addEventListener('click', function () {
    closePopup(popupEditProfile)
});

buttonOpenAddCardPopup.addEventListener('click', function () {
    openPopup(popupEdit)
});

buttonCloseAddCardPopup.addEventListener('click', function () {
    closePopup(popupEdit)
});

buttonCloseImagePopup.addEventListener('click', function () {
    closePopup(photoImage)
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);