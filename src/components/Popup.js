export default class Popup {
    constructor(popupSelector) {
        this._popupElement = popupSelector;
        this._handleEscUp = this._handleEscUp.bind(this);
    }
    openPopup() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscUp);
    }
    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscUp);
    }
    _handleEscUp(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }
    setEventListeners() {
        this._popupElement.addEventListener('click', event => {
            if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
                this.closePopup();
            }
        });
    }

}