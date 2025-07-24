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

const constants = new Constants();
const settings = constants.getValidationSettings();

// API //
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b88c9a3a-d01e-4d26-b102-58cfac9a79d2",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Initial card rendering //
let cardSection;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, apiCards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar(userData.avatar);

    const localCards = constants.getInitialCards();
    const allCards = [...localCards, ...apiCards];

    cardSection = new Section(
      {
        items: allCards,
        renderer: (item) => createCard(item).getView(),
      },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => console.error(err));

// DOM Elements //
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const form = profileEditModal.querySelector(".modal__form");
const profileDescriptionInput = form.elements.description;

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewImageModal = document.querySelector("#preview-image-modal");

const addCardSubmitButton = document.querySelector(
  "#add-card-modal .modal__button"
);

const profileSubmitButton = document.querySelector(
  "#profile-edit-modal .modal__button"
);

const addCardFormElement = addCardModal.querySelector(".modal__form");

const deleteSubmitButton = document.querySelector(
  "#delete-card-modal .modal__button"
);

const avatarFormElement = document.querySelector(
  "#avatar-edit-modal .modal__form"
);
const profileImageEditButton = document.querySelector(".profile__image");
const avatarSubmitButton = document.querySelector(
  "#avatar-edit-modal .modal__button"
);

// Universal Form Validators Object and EnableValidation function //
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    if (!formName) {
      console.warn("Form without a name attribute found:", formElement);
    } else {
      formValidators[formName] = validator;
      validator.enableValidation();
    }
  });
};

enableValidation(settings);

// Create new card popup for adding cards //
const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  console.log("Add card inputs:", inputValues);
  if (!inputValues.url || !inputValues.title) {
    console.warn("Missing title or url:", inputValues);
  }

  addCardSubmitButton.textContent = "Saving...";

  api
    .addCard({
      name: inputValues.name,
      link: inputValues.link,
    })
    .then((cardData) => {
      const card = createCard(cardData);
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

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    profileSubmitButton.textContent = "Saving...";

    // Log to debug
    console.log("Sending user info:", {
      name: inputValues.name,
      about: inputValues.description,
    });

    api
      .setUserInfo({
        name: inputValues.name,
        about: inputValues.description,
      })
      .then(() => {
        userInfo.setUserInfo({
          name: inputValues.name,
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

// Create image preview popup //
const imagePopup = new PopupWithImage("#preview-image-modal");

// Delete card popup //

let cardToDelete = null;

const deleteCardPopup = new PopupWithSubmit("#delete-card-modal", () => {
  if (!cardToDelete) return;

  deleteSubmitButton.textContent = "Deleting...";

  const cardId = cardToDelete.cardId;

  if (cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        cardToDelete.remove();
        deleteCardPopup.close();
        cardToDelete = null;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        deleteSubmitButton.textContent = "Save";
      });
  } else {
    cardToDelete.remove();
    deleteCardPopup.close();
    cardToDelete = null;
    deleteSubmitButton.textContent = "Save";
  }
});

deleteCardPopup.setEventListeners();

function handleDeleteCard(card) {
  cardToDelete = card;
  deleteCardPopup.open();
}

// Avatar form //
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

// Event Listeners for buttons opening popups //
profileImageEditButton.addEventListener("click", () => {
  formValidators["avatar-edit-form"].resetValidation();
  avatarEditPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  formValidators["profile-edit-form"].resetValidation();
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  newCardPopup.open();
});

// Event Listeners for popups //
profileEditPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Functions //

function handleImageClick(data) {
  imagePopup.open(data);
}

function handleLikeClick(card) {
  const cardId = card.cardId;
  const isLiked = card.isLiked;

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

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  );
  return card;
}
