import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Api from "../components/Api.js";

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b695ac20-1198-4116-97a4-bbc4431fd3ab",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

// Initial card rendering

let cardSection;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    userInfo.setAvatar(userData.avatar);

    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = createCard(item);

          cardSection.addItem(card);
        },
      },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => console.error("Error in Promise.all:", err));

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
