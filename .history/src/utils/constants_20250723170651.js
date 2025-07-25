export default class Constants {
  constructor() {
    this.initialCards = [
      {
        _id: "local-1",
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
        isLocal: true,
      },
      {
        _id: "local-2",
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
        isLocal: true,
      },
      {
        _id: "local-3",
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
        isLocal: true,
      },
      {
        _id: "local-4",
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
        isLocal: true,
      },
      {
        _id: "local-5",
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
        isLocal: true,
      },
      {
        _id: "local-6",
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
        isLocal: true,
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

  getInitialCards() {
    return this.initialCards;
  }

  getValidationSettings() {
    return this.validationSettings;
  }
}
