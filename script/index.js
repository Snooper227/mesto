//Выборка DOM элементов
//editPopup
const editFormModalWindow = document.querySelector('.popup_type_edit');
const popupEditCloseButtonElement = editFormModalWindow.querySelector('.popup__close'); 
const popupEditOpenButtonElement = document.querySelector('.profile__popup-open'); 
const addEditButton = editFormModalWindow.querySelector('.popup__add-button_type_edit'); 
//addPopup
const addFormModalWindow = document.querySelector('.popup_type_add');
const popupAddCloseButtonElement = addFormModalWindow.querySelector('.popup__close'); 
const popupAddOpenButtonElement = document.querySelector('.profile__add-button'); 
const addAddButton = addFormModalWindow.querySelector('.popup__add-button_type_new-card');

//editInput
let profileName = document.querySelector('.profile__title'); 
let profileDescription = document.querySelector('.profile__subtitle'); 
let formEditElement =  document.querySelector('.popup__content_edit'); 
let nameInput = formEditElement.querySelector('.popup__input_type_name'); 
let jobInput = formEditElement.querySelector('.popup__input_type_discription'); 

const popupCloseImg = document.querySelector('.popup__close_image');

const togglePopup = function(popup){ 
    popup.classList.toggle('popup_opened');
} 

//Регистрируем обработчик событий по клику 

popupEditOpenButtonElement.addEventListener('click', () => {
    togglePopup(editFormModalWindow);
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent;
}); 

popupEditCloseButtonElement.addEventListener('click', () => {
    togglePopup(editFormModalWindow);
}); 

popupAddOpenButtonElement.addEventListener('click', () => {
    togglePopup(addFormModalWindow);
}); 

popupAddCloseButtonElement.addEventListener('click', () => {
    togglePopup(addFormModalWindow);
});

popupCloseImg.addEventListener('click' , () => {
    togglePopup(imagePopup);
})

// Находим форму в DOM 

// Находим поля формы в DOM 

// Обработчик «отправки» формы, хотя пока 

// она никуда отправляться не будет 

function formSubmitHandler (evt) { 

    evt.preventDefault();  

    profileName.textContent = nameInput.value; 

    profileDescription.textContent = jobInput.value; 

    togglePopup(editFormModalWindow); 

} 

formEditElement.addEventListener('submit', formSubmitHandler); 

//карточки и поп ап
const items = [
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
const formAddElement = document.querySelector('.popup__content_new-card');
let linkInput = formAddElement.querySelector('.popup__input_type_address');
let titleInput = formAddElement.querySelector('.popup__input_type_title');
const itemTemplate = document.querySelector('.element-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__about');


const deleteCardHandler = (event) => {
    const evtTarget = event.target;
    const currentElement = evtTarget.closest('.element');
    currentElement.remove();
}

//popup image

const eventListeners = (cardElement) => {
    const deleteButtonCard = cardElement.querySelector('.element__basket');
    deleteButtonCard.addEventListener('click', deleteCardHandler);
}

const getCardsItem = (element) => {
    const cardElement = itemTemplate.cloneNode(true);

    const nameCard = cardElement.querySelector('.element__title').textContent = element.name;
    const linkCard = cardElement.querySelector('.element__photo').src = element.link;
    const altCard = cardElement.querySelector('.element__photo').alt = element.name;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    const imgPopupOpen = cardElement.querySelector('.element__photo_type_popup');
    imgPopupOpen.addEventListener('click', () => {
        imagePopupImg.src = element.link;
        imagePopupTitle.textContent = element.name;
        imagePopupImg.alt = element.name;
        togglePopup(imagePopup);
    });
    eventListeners(cardElement);
    cardsContainer.prepend(cardElement);
};
items.forEach(getCardsItem)


function addCard(evt) {
    evt.preventDefault();

    const cardElement = itemTemplate.cloneNode(true);

    const cardNameImg = cardElement.querySelector('.element__title').textContent = titleInput.value;
    const cardLinkImg = cardElement.querySelector('.element__photo').src = linkInput.value;
    const cardAltImg = cardElement.querySelector('.element__photo').alt = titleInput.value;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    const imgPopupOpen = cardElement.querySelector('.element__photo_type_popup');
    imgPopupOpen.addEventListener('click', () => {
        imagePopupImg.src = cardLinkImg;
        imagePopupTitle.textContent = cardNameImg;
        imagePopupImg.alt = cardAltImg;
        togglePopup(imagePopup);
    });
    eventListeners(cardElement);
    cardsContainer.prepend(cardElement);
    togglePopup(addFormModalWindow);
    linkInput.value = '';
    titleInput.value = '';
};

formAddElement.addEventListener('submit', addCard);