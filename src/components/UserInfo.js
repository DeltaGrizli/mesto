export default class UserInfo {
    constructor({ userName, userJob }) {
        this._username = document.querySelector(userName);
        this._userjob = document.querySelector(userJob);
    }

    getUserInfo() {
        return {
            name: this._username.textContent,
            job: this._userjob.textContent
        }
    }

    setUserInfo({ name, job }) {
        this._username.textContent = name;
        this._userjob.textContent = job;
    }
}