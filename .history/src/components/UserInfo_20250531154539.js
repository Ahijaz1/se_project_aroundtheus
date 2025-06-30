export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
  getAvatar() {
    return this._avatarElement.src;
  }

  setAvatar(avatarUrl) {
    if (avatarUrl) {
      this._avatarElement.src = avatarUrl;
    }
}
