export default class UserInfo {
    constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
        this._username = document.querySelector(selectorUserName);
        this._userjob = document.querySelector(selectorUserJob);
        this._useravatar = document.querySelector(selectorUserAvatar);
    }

    getUserInfo() {
        return {
            name: this._username.textContent,
            about: this._userjob.textContent
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._username.textContent = name;
        this._userjob.textContent = about;
        this._useravatar.src = avatar;
        this.userId = _id;
    }
}