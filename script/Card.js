export default class Card {

    constructor(data, handelPopupOpenImage) {
        this._title = data.name;
        this._link = data.link;
        this._handelPopupOpenImage = handelPopupOpenImage;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.element-template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();

        this._cardPhoto = this._element.querySelector('.element__photo');
        this._cardLikeButton = this._element.querySelector('.element__like');
        this._cardDelButton = this._element.querySelector('.element__basket');
        this._cardPhoto.src = this._link;
        this._element.querySelector('.element__title').textContent = this._title;
        this._cardPhoto.alt = this._title;
        this._setEventListeners();

        return this._element
    }
    _likeCards() {
        this._cardLikeButton.classList.toggle('element__like_active');
    }
    _deleteCard() {
        this._element.remove();
    }
    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._likeCards()
        })
        this._cardDelButton.addEventListener('click', () => {
            this._deleteCard()
        })
        this._cardPhoto.addEventListener('click', () => {
            this._handelPopupOpenImage(this._name, this._link)
        })
    }
}
