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
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#add-card-modal");
const addModalCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#preview-image-modal");
const previewCardImage = document.querySelector(
  "#preview-image-modal .modal__image"
);
const previewDescription = document.querySelector(
  "#preview-image-modal .modal__description"
);
const previewCloseButton = document.querySelector(
  "#preview-image-modal .modal__close"
);

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

// Modal handling logic
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Close modal on overlay click or close button
const handleModalClose = (event) => {
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal__close")
  ) {
    closePopup(event.currentTarget);
  }
};

// Close modal on Escape key press
function handleEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopup(openModal);
    }
  }
}

// Modal event listeners
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", handleModalClose);
});

// Event Handlers

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  renderCard(newCard, cardListEl);
  closePopup(addCardModal);
  evt.target.reset();
  addFormValidator.disableButton();
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

// New Card

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

//Create PopupwithForm

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
