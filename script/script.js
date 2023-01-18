let profile = document.querySelector('.profile'),
    popup = document.querySelector('.popup'),
    popupButton = profile.querySelector('.profile__button'),
    profileTitle = profile.querySelector('.profile__title'),
    profileSubtitle = profile.querySelector('.profile__subtitle'),
    popupClose = popup.querySelector('.popup__close'),
    popupForm = popup.querySelector('.form'),
    popupName = document.getElementById('name'),
    popupProfession = document.getElementById('profession');

function openPopup() {
    inputValue();
    popup.classList.add('popup_opened')
}
popupButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened')
}
popupClose.addEventListener('click', closePopup);

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
popupForm.addEventListener('submit', handleFormSubmit);