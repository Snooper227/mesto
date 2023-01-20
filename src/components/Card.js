export default class Card {

    constructor({data, templateSelector, userId, handelCardClick, handleLikeButton, handleRemoveButton}) {
        this._data = data,
        this._likes = data.likes,
        this._title = data.name,
        this._link = data.link,
        this._cardId = data._id,
        this._ownerId = data.owner._id
        this._templateSelector = templateSelector;
        this._handelCardClick = handelCardClick;
        this._handleRemoveButton = handleRemoveButton;
        this._handleLikeButton = handleLikeButton;
        this._userId = userId
    }
    
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        
        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();

        this._cardPhoto = this._element.querySelector('.element__photo');
        this._element.querySelector('.element__title').textContent = this._title;
        this._cardPhoto.src = this._link;
        this._cardPhoto.alt = this._title;


        this._cardDelButton = this._element.querySelector('.element__basket');
        this._cardLikeButton = this._element.querySelector('.element__like')

        this._likesOutput = this._element.querySelector('.element__like-counter');

        if(this._ownerId !== this._userId) {
            this._cardDelButton.classList.add('element__basket_hidden')
        }

        if(this.isLiked()) {
            this._cardLikeButton.classList.add('element__like_active');
        }

        this.updateLikesView();
        this.updateLikesCounter(this._likes);
        this._setEventListeners();

        return this._element;
    }

    deleteCard() {
        this._element.remove();
    }

    updateLikesCounter(data) {
        this._likesOutput.textContent = data.length;
    }
    updateLikes(data) {
        this._likes = data.likes
    }
    updateLikesView() {
        if(this.isLiked()) {
            this._cardLikeButton.classList.add('element__like_active');
        } else {
            this._cardLikeButton.classList.remove('element__like_active');
        }
    }

    isLiked() {
        return this._likes.some((item) => item._id === this._userId);
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });
        this._cardDelButton.addEventListener('click', (evt) => {
            this._handleRemoveButton(evt);
        });
        this._cardPhoto.addEventListener('click', () => {
            this._handelCardClick(this._title, this._link);
        });
    }

    getCardId() {
        return this._cardId;
    }
}