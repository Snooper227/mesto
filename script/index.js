//Выборка DOM элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__popup-open');
const addButton = popupElement.querySelector('.popup__add-button');

let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');


const openPopup = function(){
    popupElement.classList.add('popup_opened');
    profileName.textContent = nameInput.value;
    profileDescription.textContent =  jobInput.value;
}

const closePopup = function(){
    popupElement.classList.remove('popup_opened');
}


//Регистрируем обработчик событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
addButton.addEventListener('click', closePopup);
popupCloseButtonElement.addEventListener('click', closePopup);



// Находим форму в DOM
let formElement =  document.querySelector('form');;
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileDescription.textContent =  jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);