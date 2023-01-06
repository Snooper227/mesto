import Card from './Card.js';
import FormValidator from './FormValidator.js';

//editPopup
const popupProfile = document.querySelector('.popup_type_edit');
const popupEditCloseButtonElement = popupProfile.querySelector('.popup__close'); 
const popupEditOpenButtonElement = document.querySelector('.profile__popup-open'); 
const addEditButton = popupProfile.querySelector('.popup__button_type_edit'); 
//addPopup
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseButtonElement = popupAdd.querySelector('.popup__close'); 
const popupAddOpenButtonElement = document.querySelector('.profile__add-button'); 
const addAddButton = popupAdd.querySelector('.popup__button_type_new-card');

//editInput
const profileName = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__subtitle'); 
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector('.popup__input_type_name'); 
const jobInput = profileForm.querySelector('.popup__input_type_discription');

const popupCloseImg = document.querySelector('.popup__close_image');
const closeButtons = document.querySelectorAll('.popup__close');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscUp);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscUp);
}

const closePopupByClickOnOverlay = (event) => {
    if (event.target == event.currentTarget){ 
        closePopup(event.currentTarget);
    }
} 

popupProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);

const handleEscUp = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });
//Регистрируем обработчик событий по клику 

const selectors = {
	formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

const editFormValidator = new FormValidator(selectors, popupProfile);
const cardFormValidator = new FormValidator(selectors, popupAdd)

popupEditOpenButtonElement.addEventListener('click', () => {
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent;
    editFormValidator.disabledSubmitButton();
    openPopup(popupProfile);
}); 


popupAddOpenButtonElement.addEventListener('click', () => {
    cardFormValidator.disabledSubmitButton();
    openPopup(popupAdd);
}); 

// Находим форму в DOM 

// Находим поля формы в DOM 

// Обработчик «отправки» формы, хотя пока 

// она никуда отправляться не будет 

function handleProfileFormSubmit (evt) { 

    evt.preventDefault();  

    profileName.textContent = nameInput.value; 

    profileDescription.textContent = jobInput.value; 

    closePopup(popupProfile); 

} 

profileForm.addEventListener('submit', handleProfileFormSubmit); 

//карточки и поп ап
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


const cardsContainer = document.querySelector('.elements');
const cardForm = document.forms["card-form"];
const linkInput = cardForm.querySelector('.popup__input_type_link');
const titleInput = cardForm.querySelector('.popup__input_type_title');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__about');
imagePopup.addEventListener('click', closePopupByClickOnOverlay);

function handelPopupOpenImage(title, link) {
        imagePopupImg.src = link;
        imagePopupTitle.textContent = title;
        imagePopupImg.alt = title;
        openPopup(imagePopup);
}

//popup image

const renderCard = (data, handelPopupOpenImage) => {
    const newCard = new Card(data, handelPopupOpenImage);
    cardsContainer.prepend(newCard.createCard())
}

initialItems.forEach( (data) => {
    renderCard(data, handelPopupOpenImage)
})

function addCard(evt) {
    evt.preventDefault();

   const data ={
       name: titleInput.value, link: linkInput.value
   }
   const addNewCard = new Card(data, handelPopupOpenImage);
   cardsContainer.prepend(addNewCard.createCard())
   closePopup(popupAdd);
   evt.target.reset();
};

cardForm.addEventListener('submit', addCard);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();