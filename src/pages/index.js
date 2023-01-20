import './index.css'
import Api from '../script/components/Api.js'
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithConfirmation from '../script/components/PopupWithConfirmation.js';
import UserInfo from '../script/components/UserInfo.js';
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
} from '../script/utils/constans.js';

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
        renderCard.renderItems(initialItems);
    })
    .catch((err) => console.log(err)
)


const avatarFormValidator = new FormValidator(selectors, avatarSelector);
const editFormValidator = new FormValidator(selectors, profileSelector);
const cardFormValidator = new FormValidator(selectors, cardSelector);

const newUserInfo = new UserInfo({profileName, profileAbout, profileAvatar})

const renderCard = new Section(
    containerSelector, 
    {
    renderer: (data) => {
        const newCard = new Card({
            data: data,
            templateSelector: templateSelector,
            userId: newUserInfo.getUserId(),
            handelCardClick: (title, link) => {
                popupWithImage.openPopup(title, link)
            },
            handleLikeButton: () => {
                if(newCard.isLiked) {
                    api.deleteLike(newCard.getCardId())
                    .then((data) => {
                        newCard.unlikeCards();
                        newCard.updateLikesCounter(data.likes);
                    })
                    .catch((err) => console.log(err))
                } else {
                    api.addLike(newCard.getCardId())
                    .then((data) => {
                        newCard.likeCards();
                        newCard.updateLikesCounter(data.likes);
                    })
                    .catch((err) => console.log(err))
                }
            },
            handleRemoveButton: (evt) => {
                const cardElement = evt.target.closest('.element');
                const cardId = newCard.getCardId();
                popupWithConfirmation.openPopup();
                popupWithConfirmation.handleConfirmationCallback(() => {
                    popupWithConfirmation.renderLoading(true);
                    api.deleteCard(cardId)
                    .then(() => {
                        cardElement.remove();
                        popupWithConfirmation.closePopup();
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {popupWithConfirmation.renderLoading(false)})
                })
            }
        })
        return newCard.createCard();
    }
    
})

// Popup Avatar
const avatarPopup = new PopupWithForm(avatarSelector, (formData) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar({avatar: formData.link})
    .then((data) => {
        newUserInfo.setAvatar({newAvatar: data.avatar})
        avatarPopup.closePopup();
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
        renderCard.addItem(data);
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

// const popupWithConfirmation = new PopupWithConfirmation(popupConfirmationSelector, {
//     handleFormSubmit: (data) => {
//         api.deleteCard(card.getCardId())
//         .then(() => {
//             data.card.remove();
//             popupWithConfirmation.closePopup();
//         })
//         .catch((err) => console.log(err))
//     }
// });
const popupWithConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupWithConfirmation.setEventListeners();

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();