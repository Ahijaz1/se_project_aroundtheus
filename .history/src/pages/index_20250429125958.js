import "../pages/index.css";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validationSettings } from "../utils/constants.js";

// DOM Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#preview-image-modal");

const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

function getCardElement(cardData) {
  return new Card(cardData, "#card-template", handleImageClick).getView();
}

function handleImageClick(link, name) {
  imagePopup.open(link, name);
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(userData);
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

//Create PopupWithForm

const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  const card = getCardElement({
    name: inputValues.title,
    link: inputValues.url,
  });
  cardSection.addItem(card);
  addCardFormValidator.disableButton();
  newCardPopup.close();
});

//UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.title,
      description: inputValues.description,
    });
  }
);

// Image Popup
const imagePopup = new PopupWithImage("#preview-image-modal");

profileEditPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Initial card rendering
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = getCardElement(data);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

// Add this line to render initial cards:
cardSection.renderItems();
