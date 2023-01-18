let profile = document.querySelector('.profile'),
    popup = document.querySelector('.popup'),
    popupButton = profile.querySelector('.profile__button'),
    profileTitle = profile.querySelector('.profile__title'),
    profileSubtitle = profile.querySelector('.profile__subtitle'),
    popupClose = popup.querySelector('.popup__close'),
    popupForm = popup.querySelector('.form'),
    popupName = popup.querySelector('.popup__input_format_title'),
    popupProfession = popup.querySelector('.popup__input_format_subtitle');

function openPopup() {
    inputValue();
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function inputValue() {
    popupName.value = profileTitle.textContent;
    popupProfession.value = profileSubtitle.textContent;
}

function handleFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupProfession.value;
    closePopup();
}

popupButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);