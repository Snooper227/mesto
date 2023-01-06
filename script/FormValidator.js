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
        const isValid = inputElement.validity.valid;
        
        if (isValid) {
            this._hideInputError(inputElement)
        } else {
            this._showInputError(inputElement, inputElement.validationMessage)
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

    _showInputError(inputElement, errorMessage) {
       const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
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
	
	    this._inputList.forEach((inputElement) => {
		    inputElement.addEventListener('input', (evt) => {
			    this._toggleInputErrorState(evt.target);
			    this._toggleButtonState()
		})
	})
    }
    
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners()
    }
}