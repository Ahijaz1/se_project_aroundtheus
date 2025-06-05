import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Constants from "../utils/constants.js";
import "../pages/index.css";
import Api from "../components/Api.js";

const constants = new Constants();
const settings = constants.validationSettings;

// API //

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b695ac20-1198-4116-97a4-bbc4431fd3ab",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Initial card rendering //

let currentUserId = null;
let cardSection = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    console.log("getUserInfo success:", userData);
    console.log("getInitialCards success:", cardsData);

    currentUserId = userData._id; // Save user ID //

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    userInfo.setAvatar(userData.avatar);

    cardSection = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          const card = createCard(item, currentUserId);
          cardSection.addItem(card);
        },
      },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log("Error in getUserInfo or getInitialCards:", err);
  });

// DOM Elements //

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
const previewCardImage = document.querySelector(
  "#preview-image-modal .modal__image"
);

const addCardFormElement = addCardModal.querySelector(".modal__form");
const deleteSubmitButton = document.querySelector(
  "#delete-card-modal .modal__button"
);
const avatarFormElement = document.querySelector(
  "#avatar-edit-modal .modal__form"
);
const profileImageEditButton = document.querySelector(
  ".profile__image-edit-edit"
);
const avatarSubmitButton = document.querySelector(
  "#avatar-edit-modal .modal__button"
);
const profileImage = document.querySelector(".profile__image");

// Form Validator //
const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardFormElement);
addCardFormValidator.enableValidation();

// Create new card popup for adding cards //

const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  addNewCardButton.textContent = "Saving...";

  api
    .addCard({
      name: inputValues.title,
      link: inputValues.url,
    })
    .then((cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
      addCardFormValidator.disableButton();
      newCardPopup.resetForm(); // before close //
      newCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addNewCardButton.textContent = "Save";
    });
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    profileImageEditButton.textContent = "Saving...";
    api
      .setUserInfo({
        name: inputValues.title,
        about: inputValues.description,
      })
      .then((res) => {
        userInfo.setUserInfo({
          name: inputValues.title,
          description: inputValues.description,
        });
        profileEditPopup.resetForm();
        profileEditPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profileImageEditButton.textContent = "Save";
      });
  }
);

// Create image preview popup //

const imagePopup = new PopupWithImage("#preview-image-modal");

// Use this to clear card //

let cardToDelete = null;

const deleteCardPopup = new PopupWithForm(
  "#delete-card-modal",
  (inputValues) => {
    if (!cardToDelete) return;

    deleteSubmitButton.textContent = "Deleting...";

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        cardToDelete._removeCard();
        deleteCardPopup.resetForm();
        deleteCardPopup.close();
        cardToDelete = null;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        deleteSubmitButton.textContent = "Delete";
      });
  }
);
deleteCardPopup.setEventListeners();

function onDeleteCard(card) {
  cardToDelete = card;
  deleteCardPopup.open();
}

// Avatar //

const avatarFormValidator = new FormValidator(settings, avatarFormElement);
avatarFormValidator.enableValidation();

const avatarEditPopup = new PopupWithForm(
  "#avatar-edit-modal",
  (inputValues) => {
    avatarSubmitButton.textContent = "Saving...";
    api
      .setUserAvatar(inputValues.avatar)
      .then((userData) => {
        userInfo.setAvatar(userData.avatar);
        avatarEditPopup.resetForm();
        avatarEditPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        avatarSubmitButton.textContent = "Save";
      });
  }
);

avatarEditPopup.setEventListeners();

profileImageEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarEditPopup.open();
});

// Event Listeners //

profileEditPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

// functions //
function ImageClickButton(data) {
  imagePopup.open(data);
}

function LikeClickButton(card) {
  const cardId = card.cardId();
  const isLiked = card.isLiked();

  if (isLiked) {
    api
      .deleteCardLike(cardId)
      .then((updatedCard) => {
        card.setLikeStatus(updatedCard.isLiked);
      })
      .catch((err) => console.error(err));
  } else {
    api
      .addCardLike(cardId)
      .then((updatedCard) => {
        card.setLikeStatus(updatedCard.isLiked);
      })
      .catch((err) => console.error(err));
  }
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    ImageClickButton,
    LikeClickButton,
    onDeleteCard
  );
  return card.getView();
}

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
