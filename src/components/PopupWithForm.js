import Popup from './Popup.js'

export default class popupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitPopupButtonElement = this._popupElement.querySelector('.popup__button');

    }
    _getInputValues() {
        const data ={};
        this._inputList.forEach( input => {
            data[input.name] = input.value
        });
        return data;
    }
    
    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

   closePopup() {
    super.closePopup();
    this._popupForm.reset();
   }
   
   renderLoading(isLoading) {
    if (isLoading === true) {
        this._submitPopupButtonElement.textContent = 'Сохранение...';
    } else {
        this._submitPopupButtonElement.textContent = 'Сохранить'
    }
   }
}