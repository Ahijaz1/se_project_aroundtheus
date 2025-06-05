import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Api from "../components/Api.js";

// API

const api = new Api({});

// DOM Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const form = profileEditModal.querySelector(".modal__form");
const profileDescriptionInput = form.elements.description;

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#preview-image-modal");

const addCardFormElement = addCardModal.querySelector(".modal__form");
const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

addCardFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

function handleCardCreate(cardData) {
  const card = createCard(cardData);
  cardSection.addItem(card);
}

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(userData);
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// Create new card popup for adding cards

const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  handleCardCreate({
    name: inputValues.title,
    link: inputValues.url,
  });
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
    profileEditPopup.close();
  }
);

// Create image preview popup
const imagePopup = new PopupWithImage("#preview-image-modal");

// Add error handling when creating cards
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", (imageData) => {
    try {
      imagePopup.open(imageData);
    } catch (error) {
      console.error("Error opening image preview:", error);
      // Optionally show a user-friendly error message
      alert("Sorry, there was an error loading the image");
    }
  });
  return card.getView();
};

profileEditPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Initial card rendering
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => handleCardCreate(data),
  },
  ".cards__list"
);

// Add this line to render initial cards:
cardSection.renderItems();
