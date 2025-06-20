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
import "../blocks/profile.css";
import Api from "../components/Api.js";

// ---------- Initialization ----------

let cardSection;
const constants = new Constants();
const settings = constants.getValidationSettings();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "27b2a5b6-103d-456b-911c-4b9f1fd71092",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// ---------- Load Initial Cards ----------

Promise.all([
  Promise.resolve(constants.getInitialCards()),
  api.getInitialCards(),
])
  .then(([localCards, apiCards]) => {
    const allCards = [
      ...localCards.map((card) => ({ ...card, isLocal: true })),
      ...apiCards.map((card) => ({ ...card, isLocal: false })),
    ];
    cardSection = new Section(
      {
        items: allCards,
        renderer: (item) => {
          const card = createCard(item);
          return card.getView();
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error("Error loading cards:", err));

// ---------- Form Validation ----------

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    if (formName) {
      formValidators[formName] = validator;
      validator.enableValidation();
    }
  });
};

enableValidation(settings);

// ---------- Popups ----------

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  addCardSubmitButton.textContent = "Saving...";
  api
    .addCard({ name: inputValues.title, link: inputValues.url })
    .then((cardData) => {
      const card = createCard({ ...cardData, isLocal: false });
      cardSection.addItem(card.getView());
      formValidators["add-card-form"].disableButton();
      newCardPopup.resetForm();
      newCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addCardSubmitButton.textContent = "Save";
    });
});
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    profileSubmitButton.textContent = "Saving...";
    api
      .setUserInfo({ name: inputValues.title, about: inputValues.description })
      .then(() => {
        userInfo.setUserInfo({
          name: inputValues.title,
          description: inputValues.description,
        });
        profileEditPopup.resetForm();
        profileEditPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profileSubmitButton.textContent = "Save";
      });
  }
);
profileEditPopup.setEventListeners();

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

const deleteCardPopup = new PopupWithSubmit("#delete-card-modal", (card) => {
  deleteSubmitButton.textContent = "Deleting...";
  if (card.isLocal) {
    card.remove();
    deleteCardPopup.close();
    deleteSubmitButton.textContent = "Save";
    return;
  }
  api
    .deleteCard(card.cardId)
    .then(() => {
      card.remove();
      deleteCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      deleteSubmitButton.textContent = "Save";
    });
});
deleteCardPopup.setEventListeners();

// ---------- Event Listeners ----------

document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  formValidators["profile-edit-form"].resetValidation();
  profileEditPopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  newCardPopup.open();
});

document.querySelector(".profile__image").addEventListener("click", () => {
  formValidators["avatar-edit-form"].resetValidation();
  avatarEditPopup.open();
});

// ---------- Helper Functions ----------

function handleImageClick(data) {
  imagePopup.open(data);
}

function handleLikeClick(card) {
  if (!card.cardId) return;
  const request = card.isLiked
    ? api.deleteCardLike(card.cardId)
    : api.addCardLike(card.cardId);
  request
    .then((updatedCard) => card.setLikeStatus(updatedCard.isLiked))
    .catch((err) => console.error(err));
}

function handleDeleteCard(card) {
  deleteCardPopup.open(card);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  );
  card.cardId = cardData._id;
  return card;
}

// ---------- Form Elements ----------
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardSubmitButton = document.querySelector(
  "#add-card-modal .modal__button"
);
const profileSubmitButton = document.querySelector(
  "#profile-edit-modal .modal__button"
);
const avatarSubmitButton = document.querySelector(
  "#avatar-edit-modal .modal__button"
);
const deleteSubmitButton = document.querySelector(
  "#delete-card-modal .modal__button"
);
