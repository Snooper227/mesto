export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так...: ${res.status}`);
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkRes);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then(this._checkRes);
    }

    getDataFromServer() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }

    addCard({title, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link: link
            })
        })
        .then(this._checkRes);
    }

    changeAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkRes);
    }

    changeUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers:this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkRes);
    }

    deleteCard(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkRes);
    }  

    addLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkRes);
    }

    deleteLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkRes);
    }
}