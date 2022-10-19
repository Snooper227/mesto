//Выборка DOM элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile-info__popup-open');
const likeElement = document.querySelector('.photo__like');
const addButton = popupElement.querySelector('.popup__add-button');

let profileName = document.querySelector('.profile-info__title');
let profileDescription = document.querySelector('.profile-info__subtitle');

const like = function(){
    likeElement.classList.toggle('photo__like_active');
}

const openPopup = function(){
    popupElement.classList.add('popup__is-opened');
}

const closePopup = function(){
    popupElement.classList.remove('popup__is-opened');
}

const closePopupByClickOnOverlay = function(event){
    if (event.target !== event.currentTarget){
        return;
    }

    closePopup();
}

//Регистрируем обработчик событий по клику
likeElement.addEventListener('click', like);
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
addButton.addEventListener('click', closePopup);




// Находим форму в DOM
let formElement =  document.querySelector('.popup');;
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup-info__input_type_name');
let jobInput = formElement.querySelector('.popup-info__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileDescription.textContent =  jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);