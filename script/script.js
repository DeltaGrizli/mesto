const
    profile = document.querySelector('.profile'),
    popupEditProfile = document.getElementById('editProfile'),
    buttonOpenEditProfilePopup = profile.querySelector('.profile__button'),
    editProfileTitle = document.getElementById('editProfileTitle'),
    editProfileSubtitle = document.getElementById('editProfileSubtitle'),
    buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__close'),

    popupEdit = document.getElementById('edit'),
    formAddCard = popupEdit.querySelector('.form'),
    buttonCloseAddCardPopup = popupEdit.querySelector('.popup__close'),
    editTitle = document.getElementById('editTitle'),
    editSubtitle = document.getElementById('editSubtitle'),
    buttonOpenAddCardPopup = profile.querySelector('.profile__add-button'),

    profileName = profile.querySelector('.profile__title'),
    profileProfession = profile.querySelector('.profile__subtitle'),
    formEditProfile = popupEditProfile.querySelector('.form'),


    photo = document.querySelector('.popup_backblack'),
    photoImage = document.getElementById('photoImage'),
    popupPhotoName = photo.querySelector('.popup__name'),
    popupImage = photo.querySelector('.popup__photo'),
    buttonCloseImagePopup = photoImage.querySelector('.popup__close'),


    elementsSection = document.querySelector('.elements');


const elementsTemplate = document.querySelector('#template').content,
    item = elementsTemplate.querySelector('.elements__item');

initialCards.forEach(function (item) {
    appendCard(elementsSection, addNewCard(item.name, item.link));
});

function appendCard(elementsSection, name) {
    elementsSection.append(name);
}
edit

function addNewCard(name, image) {
    elementsItem = item.cloneNode(true);
    const elementsImage = elementsItem.querySelector('.elements__image');
    elementsItem.querySelector('.elements__title').textContent = name;
    elementsImage.src = image;
    elementsImage.alt = name;
    elementsItem.querySelector('.elements__like').addEventListener('click', like);
    elementsItem.querySelector('.elements__trash').addEventListener('click', deleteTrash);
    elementsImage.addEventListener('click', function () {
        openPhoto(name, image);
        openPopup(photo);
    });
    return elementsItem
}

function openPhoto(name, image) {
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
    console.log(popup.classList);
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

function submitEditProfileForm(event) {
    event.preventDefault();
    profileName.textContent = editProfileTitle.value;
    profileProfession.textContent = editProfileSubtitle.value;
    closePopup(popupEditProfile);
}

function submitAddCardForm(event) {
    event.preventDefault();
    elementsSection.prepend(addNewCard(editTitle.value, editSubtitle.value));
    closePopup(popupEdit);
    formAddCard.reset();
    blockButtonOpened(buttonElement, dataInput.inactiveButtonClass);
}

function like(event) {
    event.target.classList.toggle('elements__like_active');
};

function deleteTrash(event) {
    const trash = event.target.closest('.elements__trash');
    trash.closest('.elements__item').remove();
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
    openPopup(popupEditProfile)
    editProfileTitle.value = profileName.textContent;
    editProfileSubtitle.value = profileProfession.textContent;
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

formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);