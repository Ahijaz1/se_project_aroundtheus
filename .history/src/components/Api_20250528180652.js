class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards(){
   return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
     headers: }}

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "b695ac20-1198-4116-97a4-bbc4431fd3ab",
  },
}).then((res) => res.json());
