import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Constants from "../utils/constants.js";
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
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar(userData.avatar);

    cardSection = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = createCard(item);
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
const profileTitleInput = document.querySelector("#profile-title-input");
const form = profileEditModal.querySelector(".modal__form");
const profileDescriptionInput = form.elements.description;

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewImageModal = document.querySelector("#preview-image-modal");

const addCardSubmitButton = document.querySelector(
  "#add-card-modal .modal__button"
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
  addCardSubmitButton.textContent = "Saving...";

  api
    .addCard({
      name: inputValues.title,
      link: inputValues.url,
    })
    .then((cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
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

    api
      .setUserInfo({
        name: inputValues.title,
        about: inputValues.description,
      })
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
        profileImageEditButton.textContent = "Save";
      });
  }
);

// Create image preview popup //
const imagePopup = new PopupWithImage("#preview-image-modal");

// Delete card popup //
let cardToDelete = null;

const deleteCardPopup = new PopupWithForm("#delete-card-modal", () => {
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
});
deleteCardPopup.setEventListeners();

function onDeleteCard(card) {
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
  const cardId = card.cardId();
  const isLiked = card.isLiked();

  const likeAction = isLiked
    ? api.deleteCardLike(cardId)
    : api.addCardLike(cardId);

  likeAction
    .then((updatedCard) => {
      card.setLikeStatus(!isLiked); // Flip the state based on response
    })
    .catch((err) => console.error(err));
}

function handleDeleteCard(card) {
  cardToDelete = card;
  deleteCardPopup.open();
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    currentUserId,
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  );
  return card.getView();
}
