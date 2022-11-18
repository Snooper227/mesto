const selectors = {
	formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

const checkInputValidity = (inputElement, {errorClass, inputErrorClass}) => {
	const isValid = inputElement.validity.valid;

	const formSection = inputElement.closest('.popup__section');
	const errorElement = formSection.querySelector('.popup__input-error');
	
	if (isValid) {
		hideInputError(inputElement, errorElement, errorClass, inputErrorClass)
	} else {
		showInputError(inputElement, errorElement, inputElement.validationMessage, errorClass, inputErrorClass)
	}
}

const showInputError = (inputElement, errorElement, errorMessage, errorClass, inputErrorClass) => {
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
}

const hideInputError = (inputElement, errorElement, errorClass, inputErrorClass) => {
	errorElement.textContent = '';
	errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
  
	if (hasInvalidInput) {
	  buttonElement.setAttribute("disabled", true);
	  buttonElement.classList.add(inactiveButtonClass);
	} else {
	  buttonElement.removeAttribute("disabled");
	  buttonElement.classList.remove(inactiveButtonClass);
	}
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
	})
	
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const submitButton = formElement.querySelector(submitButtonSelector);
	
	toggleButtonState(inputList, submitButton, inactiveButtonClass)
	
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(inputElement, rest);
			toggleButtonState(inputList, submitButton, inactiveButtonClass)
		})
	})
}

const enableValidation = ({formSelector, ...rest}) => {
	
	const formList = document.querySelectorAll(formSelector);

	formList.forEach(formElement => {
		setEventListeners(formElement, rest);
	})	
}

