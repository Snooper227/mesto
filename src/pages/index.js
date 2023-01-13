import './index.css'

import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import UserInfo from '../script/components/UserInfo.js';
import {
    profileSelector,
    popupEditOpenButtonElement,
    containerSelector,
    cardSelector,
    popupAddOpenButtonElement,
    profileName,
    profileAbout,
    popupImageSelector,
    templateSelector,
    selectors,
    initialItems
} from '../script/utils/constans.js';

const editFormValidator = new FormValidator(selectors, profileSelector);
const cardFormValidator = new FormValidator(selectors, cardSelector);

const renderCard = new Section(
    containerSelector, 
    {
    renderer: (data) => {
        const newCard = new Card({
            data: data,
            templateSelector: templateSelector,
            handelCardClick: (title, link) => {
                popupWithImage.openPopup(title, link)
            }
        })
        return newCard.createCard();
    }
    
})
renderCard.renderItems(initialItems);

const newUserInfo = new UserInfo({profileName, profileAbout});

const editPopup = new PopupWithForm (profileSelector, {
    handleFormSubmit: (data) => {
        const item = {
            name: data.name, 
            about: data.about
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
    editPopup.setInputValues(data);
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