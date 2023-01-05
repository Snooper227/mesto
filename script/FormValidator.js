export default class FormValidator {
    constructor(selectors, formElement) {
        this._formElement = formElement;
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _toggleInputErrorState(inputElement) {
        this._isValid = inputElement.validity.valid;
    
        this._formSection = inputElement.closest('.popup__section');
        this._errorElement = this._formSection.querySelector('.popup__input-error');
        
        if (this._isValid) {
            this._hideInputError(inputElement)
        } else {
            this._showInputError(inputElement)
        }
    }
    disabledSubmitButton = () => {
        this._submitButton.setAttribute("disabled", true);
        this._submitButton.classList.add(this._inactiveButtonClass)
    }
    enableSubmitButton = () => {
        this._submitButton.removeAttribute("disabled");
        this._submitButton.classList.remove(this._inactiveButtonClass)
    }

    _showInputError(inputElement) {
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    }
    
    _hideInputError(inputElement) {
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    }

    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this.disabledSubmitButton()
        } else {
            this.enableSubmitButton()
        }
    };
    
    _setEventListeners() {
        this._toggleButtonState()
	
	    this._inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			this._toggleInputErrorState(inputElement);
			this._toggleButtonState()
		})
	})
    }
    
    enableValidation() {
        this._formList = document.querySelectorAll(this._formSelector);

	    this._formList.forEach( () => {
		this._setEventListeners();
	})	
    }
}