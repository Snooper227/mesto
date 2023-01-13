export default class UserInfo {
    constructor({profileName, profileAbout}) {
        this._profileNameElement = profileName;
        this._profileAboutElement = profileAbout;
    }
    getUserInfo() {
        return {
            name: this._profileNameElement.textContent,
            about: this._profileAboutElement.textContent
        }
    }
    setUserInfo(data) {
        const {name, about} = data;
        this._profileNameElement.textContent = name;
        this._profileAboutElement.textContent = about;
    }
}