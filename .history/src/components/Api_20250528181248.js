class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
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
