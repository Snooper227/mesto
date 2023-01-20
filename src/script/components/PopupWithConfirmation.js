import Popup from '../components/Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._confirmPopupButtonElement = this._popupElement.querySelector('.popup__button');
    }
    renderLoading(isLoading) {
        if(isLoading) {
            this._confirmPopupButtonElement.textContent = 'Удаление...';
        } else {
            this._confirmPopupButtonElement.textContent = 'Да'
        }
    }
    handleConfirmationCallback(action) {
        this._handleFormSubmit = action;
      }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit();
        })
    }
}