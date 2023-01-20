import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElement = this._popupElement.querySelector('.popup__image');
        this._popupImageAboutElement = this._popupElement.querySelector('.popup__about');
    }

    openPopup(title, link) {
        this._popupImageElement.src = link;
        this._popupImageAboutElement.textContent = title;
        this._popupImageElement.alt = title;

        super.openPopup();
}
}