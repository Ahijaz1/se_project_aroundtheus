class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}: ${res.statusText}`);
  }

  _request(endpoint, { method = "GET", body = null, headers = {} } = {}) {
    const finalHeaders = { ...this._headers, ...headers };
    const options = { method, headers };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, options).then(this._checkResponse);
  }

  setUserInfo(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: { name: data.name, about: data.about },
    });
  }

  setUserAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: { avatar },
    });
  }

  addCard(data) {
    return this._request("/cards", {
      method: "POST",
      body: { name: data.name, link: data.link },
    });
  }

  getInitialCards() {
    return this._request("/cards");
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  addCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCardLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

export default Api;
