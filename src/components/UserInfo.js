export default class UserInfo {
    constructor({ userName, userJob }) {
        this._username = document.querySelector(userName);
        this._userjob = document.querySelector(userJob);
    }

    getUserInfo() {
        return {
            title: this._username.textContent,
            subtitle: this._userjob.textContent
        }
    }

    setUserInfo({title, subtitle}) {
        this._username.textContent = title;
        this._userjob.textContent = subtitle;
    }
}