export default class UserInfo {
    constructor({profileNameSelector, profileAboutSelector}) {
        this._profileNameElement = profileNameSelector;
        this._profileAboutElement = profileAboutSelector;
    }
    getUserInfo() {
        return {
            userName: this._profileNameElement.textContent,
            userAbout: this._profileAboutElement.textContent
        }
    }
    setUserInfo(data) {
        const {userName, userAbout} = data;
        this._profileNameElement.textContent = userName;
        this._profileAboutElement.textContent = userAbout;
    }
}