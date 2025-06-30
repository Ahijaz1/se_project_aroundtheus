export default class Constants {
  constructor() {
    this.initialCards = [
      {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
        _id: "card-1",
        likes: [],
        owner: { _id: "user-123" },
      },
      {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
        _id: "card-2",
        likes: [],
        owner: { _id: "user-123" },
      },
      {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
        _id: "card-3",
        likes: [],
        owner: { _id: "user-123" },
      },
      {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
        _id: "card-4",
        likes: [],
        owner: { _id: "user-123" },
      },
      {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
        _id: "card-5",
        likes: [],
        owner: { _id: "user-123" },
      },
      {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
        _id: "card-6",
        likes: [],
        owner: { _id: "user-123" },
      },
    ];

    this.validationSettings = {
      formSelector: ".modal__form",
      inputSelector: ".modal__input",
      submitButtonSelector: ".modal__save-button",
      inactiveButtonClass: "modal__save-button_disabled",
      inputErrorClass: "modal__input_type_error",
      errorClass: "modal__error_visible",
    };
  }

  InitialCards() {
    return this.initialCards;
  }

  validationSettings() {
    return this.validationSettings;
  }
}
