class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

   _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: { authorization: "b695ac20-1198-4116-97a4-bbc4431fd3ab" },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}


getUserInfo() {return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);}

setUserInfo(data) {}

setUserAvatar(avatar) {}

addCard(data) {}

deleteCard(cardId) {}

addCardLike(cardId) {}

deleteCardLike(cardId) {}

  getAppInfo() {}

export default Api;
