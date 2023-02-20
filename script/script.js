const
    profile = document.querySelector('.profile'),
    popupEditProfile = document.getElementById('editProfile'),
    popupButton = profile.querySelector('.profile__button'),
    editProfileTitle = document.getElementById('editProfileTitle'),
    editProfileSubtitle = document.getElementById('editProfileSubtitle'),
    popupClose = popupEditProfile.querySelector('.popup__close'),

    popupEdit = document.getElementById('edit'),
    popupForm = popupEdit.querySelector('.form'),
    popupCloseButton = popupEdit.querySelector('.popup__close'),
    editTitle = document.getElementById('editTitle'),
    editSubtitle = document.getElementById('editSubtitle'),
    profileAddButton = profile.querySelector('.profile__add-button'),

    profileName = profile.querySelector('.profile__title'),
    profileProfession = profile.querySelector('.profile__subtitle'),
    formEditProfile = popupEditProfile.querySelector('.form'),


    photo = document.querySelector('.popup_backblack'),
    photoImage = document.getElementById('photoImage'),
    popupPhotoName = photo.querySelector('.popup__name'),
    popupImage = photo.querySelector('.popup__photo'),
    popupCloseButtonPhoto = photoImage.querySelector('.popup__close'),

    
    elementsSection = document.querySelector('.elements');


const elementsTemplate = document.querySelector('#template').content,
item = elementsTemplate.querySelector('.elements__item');

initialCards.forEach(function (item) {
    appendCard(elementsSection, addNewCard(item.name, item.link));
});

function appendCard(elementsSection, name) {
    elementsSection.append(name);
}


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
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


function submitEditProfileForm(event) { 
    event.preventDefault();
    profileName.textContent = editProfileTitle.value;
    profileProfession.textContent = editProfileSubtitle.value;
    closePopup(popupEditProfile);
}

function submitEditForm(event) {
    event.preventDefault();
    elementsSection.prepend(addNewCard(editTitle.value, editSubtitle.value));
    closePopup(popupEdit);
    popupForm.reset();
}

function like(event) {
    event.target.classList.toggle('elements__like_active');
};

function deleteTrash(event) {
    const trash = event.target.closest('.elements__trash');
    if (!trash) {
        return
    }
    trash.closest('.elements__item').remove();
}

popupButton.addEventListener('click', function () {
    openPopup(popupEditProfile)
    editProfileTitle.value = profileName.textContent;
    editProfileSubtitle.value = profileProfession.textContent;
});

popupClose.addEventListener('click', function () {
    closePopup(popupEditProfile)
});

profileAddButton.addEventListener('click', function () {
    openPopup(popupEdit)
});

popupCloseButton.addEventListener('click', function () {
    closePopup(popupEdit)
});

popupCloseButtonPhoto.addEventListener('click', function () {
    closePopup(photoImage)
});

formEditProfile.addEventListener('submit', submitEditProfileForm);
popupForm.addEventListener('submit', submitEditForm);