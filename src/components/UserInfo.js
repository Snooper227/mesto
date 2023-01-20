export default class UserInfo {
    constructor({profileName, profileAbout, profileAvatar}) {
        this._profileNameElement = profileName;
        this._profileAboutElement = profileAbout;
        this._profileAvatarElement = profileAvatar;
    }
    getUserInfo() {
        return {
            name: this._profileNameElement.textContent,
            about: this._profileAboutElement.textContent
        }
    }
    setUserInfo(data) {
        const {name, about, avatar, userId} = data;
        this._profileNameElement.textContent = name;
        this._profileAboutElement.textContent = about;
        this._profileAvatarElement.src = avatar;
        this._userId = userId;
    }
    setAvatar({newAvatar}) {
        this._profileAvatarElement.src = newAvatar;
    }

    getUserId() {
        return this._userId;
    }
}