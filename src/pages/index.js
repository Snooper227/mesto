import './index.css'

import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import UserInfo from '../script/components/UserInfo.js';

const profileSelector = document.querySelector('.popup_type_edit');
const popupEditOpenButtonElement = document.querySelector('.profile__popup-open');  

const containerSelector = document.querySelector('.elements');
const cardSelector = document.querySelector('.popup_type_add');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button'); 
const profileNameSelector = document.querySelector('.profile__title'); 
const profileAboutSelector = document.querySelector('.profile__subtitle'); 

const popupImageSelector = document.querySelector('.popup_type_image');

const selectors = {
	formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

const initialItems = [
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

const editFormValidator = new FormValidator(selectors, profileSelector);
const cardFormValidator = new FormValidator(selectors, cardSelector);

const renderCard = new Section(
    containerSelector, 
    {
    renderer: (data) => {
        const newCard = new Card({
            data: data,
            handelCardClick: (title, link) => {
                popupWithImage.openPopup(title, link)
            }
        })
        return newCard.createCard();
    }
    
})
renderCard.renderItems(initialItems);

const newUserInfo = new UserInfo({profileNameSelector, profileAboutSelector});

const editPopup = new PopupWithForm (profileSelector, {
    handleFormSubmit: (data) => {
        const item = {
            userName: data.name, 
            userAbout: data.about
        };
        newUserInfo.setUserInfo(item);
        editPopup.closePopup()
    }
})
editPopup.setEventListeners();

const addNewCardPopup = new PopupWithForm (cardSelector, {
    handleFormSubmit: (data) => {
        const item = {
            name: data.title, 
            link: data.link
        }
        renderCard.addItem(item);
        addNewCardPopup.closePopup();
    }
})
addNewCardPopup.setEventListeners();

popupEditOpenButtonElement.addEventListener('click', () => {
    const data = newUserInfo.getUserInfo();
    profileNameSelector.value = data.name;
    profileAboutSelector.value = data.about;
    editFormValidator.resetValidation();
    editFormValidator.disabledSubmitButton();
    editPopup.openPopup();
}); 

popupAddOpenButtonElement.addEventListener('click', () => {
    cardFormValidator.resetValidation();
    cardFormValidator.disabledSubmitButton();
    addNewCardPopup.openPopup();
}); 

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

editFormValidator.enableValidation();
cardFormValidator.enableValidation();