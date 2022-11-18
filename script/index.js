//Выборка DOM элементов
//editPopup
const editFormModalWindow = document.querySelector('.popup_type_edit');
const popupEditCloseButtonElement = editFormModalWindow.querySelector('.popup__close'); 
const popupEditOpenButtonElement = document.querySelector('.profile__popup-open'); 
const addEditButton = editFormModalWindow.querySelector('.popup__button_type_edit'); 
//addPopup
const addFormModalWindow = document.querySelector('.popup_type_add');
const popupAddCloseButtonElement = addFormModalWindow.querySelector('.popup__close'); 
const popupAddOpenButtonElement = document.querySelector('.profile__add-button'); 
const addAddButton = addFormModalWindow.querySelector('.popup__button_type_new-card');

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

editFormModalWindow.addEventListener('click', closePopupByClickOnOverlay);
addFormModalWindow.addEventListener('click', closePopupByClickOnOverlay);

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

popupEditOpenButtonElement.addEventListener('click', () => {
    openPopup(editFormModalWindow);
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent;
    disabledButton(addEditButton, 'popup__button_disabled');
}); 


popupAddOpenButtonElement.addEventListener('click', () => {
    openPopup(addFormModalWindow);
    disabledButton(addAddButton, 'popup__button_disabled');
}); 

// Находим форму в DOM 

// Находим поля формы в DOM 

// Обработчик «отправки» формы, хотя пока 

// она никуда отправляться не будет 

function handleProfileFormSubmit (evt) { 

    evt.preventDefault();  

    profileName.textContent = nameInput.value; 

    profileDescription.textContent = jobInput.value; 

    closePopup(editFormModalWindow); 

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
const itemTemplate = document.querySelector('.element-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__about');
imagePopup.addEventListener('click', closePopupByClickOnOverlay);


const handelCardDelete = (event) => {
    const currentElement = event.target.closest('.element');
    currentElement.remove();
}

//popup image

const setDeleteHandler = (cardElement) => {
    const deleteButtonCard = cardElement.querySelector('.element__basket');
    deleteButtonCard.addEventListener('click', handelCardDelete);
}

function createCard(item) {
    const cardElement = itemTemplate.cloneNode(true);
    const cardPhoto = cardElement.querySelector('.element__photo');
    cardElement.querySelector('.element__title').textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    const imgPopupOpen = cardElement.querySelector('.element__photo_type_popup');
    imgPopupOpen.addEventListener('click', () => {
        imagePopupImg.src = item.link;
        imagePopupTitle.textContent = item.name;
        imagePopupImg.alt = item.name;
        openPopup(imagePopup);
    });
    setDeleteHandler(cardElement);
    return cardElement
}

const prependItem = (element) => {
    const cardElement = createCard(element);
    cardsContainer.prepend(cardElement);
};
initialItems.forEach(prependItem)

function addCard(evt) {
    evt.preventDefault();

    const data ={
        name: titleInput.value, link: linkInput.value
    }
    prependItem(data)
    closePopup(addFormModalWindow);
    evt.target.reset();
};

cardForm.addEventListener('submit', addCard);
enableValidation(validationConfig);