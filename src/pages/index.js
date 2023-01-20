import './index.css'
import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {
    avatarSelector,
    profileSelector,
    popupAvatarOpenButtonElement,
    popupEditOpenButtonElement,
    containerSelector,
    cardSelector,
    popupAddOpenButtonElement,
    profileName,
    profileAbout,
    profileAvatar,
    popupConfirmationSelector,
    popupImageSelector,
    templateSelector,
    selectors,
    initialItems
} from '../utils/constans.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
    headers: {
      authorization: 'd01f4797-754e-4e13-992d-2b99da77c87d',
      'Content-Type': 'application/json'
    }
}); 

api.getDataFromServer()
    .then((responses) => {
        const [initialItems, userData] = responses;
        newUserInfo.setUserInfo({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar,
            userId: userData._id
        });
        cardList.renderItems(initialItems);
    })
    .catch((err) => console.log(err)
)


const avatarFormValidator = new FormValidator(selectors, avatarSelector);
const editFormValidator = new FormValidator(selectors, profileSelector);
const cardFormValidator = new FormValidator(selectors, cardSelector);

const newUserInfo = new UserInfo({profileName, profileAbout, profileAvatar})

const renderCard = (data) => {
    const newCard = new Card({
        data: data,
        templateSelector: templateSelector,
        userId: newUserInfo.getUserId(),
        handelCardClick: (title, link) => {
            popupWithImage.openPopup(title, link)
        },
        handleLikeButton: () => {
            if(newCard.isLiked()) {
                api.deleteLike(newCard.getCardId())
                    .then((data) => {
                        newCard.updateLikes(data);
                        newCard.updateLikesView();
                        newCard.updateLikesCounter(data.likes);
                    })
                    .catch((err) => console.log(err))
            } else {
                api.addLike(newCard.getCardId())
                    .then((data) => {
                        newCard.updateLikes(data);
                        newCard.updateLikesView();
                        newCard.updateLikesCounter(data.likes);
                    })
                    .catch((err) => console.log(err))
            }
        },
        handleRemoveButton: () => {
            const cardId = newCard.getCardId();
            popupWithConfirmation.openPopup();
            popupWithConfirmation.handleConfirmationCallback(() => {
                popupWithConfirmation.renderLoading(true);
                api.deleteCard(cardId)
                    .then(() => {
                        newCard.deleteCard();
                        popupWithConfirmation.closePopup();
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {popupWithConfirmation.renderLoading(false)})
            })
        }
    })
    return newCard.createCard();
}
const cardList = new Section(
    containerSelector, 
    {
    renderer: (card) => {
        cardList.addItem(renderCard(card))
    }
    
})
// Popup Avatar
const avatarPopup = new PopupWithForm(avatarSelector, (formData) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar({avatar: formData.link})
        .then((data) => {
            newUserInfo.setAvatar({newAvatar: data.avatar})
            avatarPopup.closePopup()
        })
        .catch((err) => console.log(err))
        .finally(() => {avatarPopup.renderLoading(false)})
})
avatarPopup.setEventListeners();

// PopupProfile
const editPopup = new PopupWithForm (profileSelector, (formData) => {
    editPopup.renderLoading(true);
    api.changeUserInfo(formData)
        .then((data) => {
            newUserInfo.setUserInfo(data);
            editPopup.closePopup()
        })
        .catch((err) => console.log(err))
        .finally(() => editPopup.renderLoading(false));
})
editPopup.setEventListeners();

// PopupCard
const addNewCardPopup = new PopupWithForm (cardSelector, (formData) => {
    addNewCardPopup.renderLoading(true);
        api.addCard(formData)
            .then((data) => {
                cardList.addItem(renderCard(data));
                addNewCardPopup.closePopup();
            })
            .catch((err) => console.log(err))
            .finally(() => addNewCardPopup.renderLoading(false));
})
addNewCardPopup.setEventListeners();

popupAvatarOpenButtonElement.addEventListener('click', () => {
    avatarFormValidator.resetValidation();
    avatarFormValidator.disabledSubmitButton();
    avatarPopup.openPopup();
})

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

const popupWithConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupWithConfirmation.setEventListeners();

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();