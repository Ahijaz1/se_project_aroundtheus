/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Card; }
/* harmony export */ });
class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)?.content.querySelector(".card")?.cloneNode(true);
    if (!cardElement) {
      throw new Error(`Template not found: ${this._cardSelector}`);
    }
    return cardElement;
  }
  getView() {
    this._element = this._getTemplate();

    // Select elements
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._setCardContent();
    this._setImageData();
    this._setEventListeners();
    return this._element;
  }
  _setCardContent() {
    this._element.querySelector(".card__description-title").textContent = this._name;
  }

  // Set image attributes
  _setImageData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImage.onerror = () => {
      console.error(`Failed to load image: ${this._link}`);
    };
  }
  _setEventListeners() {
    // Delete button
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    // Like button
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    // Image preview
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        link: this._link,
        name: this._name
      });
    });
  }
}

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
  }
  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _hasInvalidInput() {
    return this._inputEls.some(inputEl => !inputEl.validity.valid);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }
  _setEventListeners() {
    this._inputEls = Array.from(this._formEl.querySelectorAll(this._inputSelector));
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputEls.forEach(inputEl => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }
  resetValidation() {
    this._inputEls.forEach(inputEl => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }
  enableValidation() {
    this._formEl.addEventListener("submit", evt => {
      evt.preventDefault();
      this.resetValidation();
    });
    this._setEventListeners();
  }
}
/* harmony default export */ __webpack_exports__["default"] = (FormValidator);

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Popup; }
/* harmony export */ });
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //Public: Open popup
  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  //Public: Close popup
  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  //Private: close on esc key
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  //Public: attach event listeners
  setEventListeners() {
    this._popup.querySelector(".modal__close").addEventListener("click", () => {
      this.close();
    });
    //click outside of popup content
    this._popup.addEventListener("mousedown", event => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithForm; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");

class PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
  }
  //Private: to get all form input values as a object
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setInputValues(data) {
    // Loop through inputs and set their values
    this._inputList.forEach(input => {
      // The input name attribute should match the data object key
      const inputName = input.name;
      // Set the input value if we have matching data
      if (data[inputName]) {
        input.value = data[inputName].trim();
      }
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
      this.close();
    });
  }
}

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithImage; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");

class PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".modal__image");
    this._captionElement = this._popup.querySelector(".modal__description");
  }
  open(_ref) {
    let {
      name,
      link
    } = _ref;
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Section; }
/* harmony export */ });
class Section {
  constructor(_ref, containerSelector) {
    let {
      items,
      renderer
    } = _ref;
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }
  addItem(element) {
    this._container.prepend(element);
  }
}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UserInfo; }
/* harmony export */ });
class UserInfo {
  constructor(_ref) {
    let {
      nameSelector,
      descriptionSelector
    } = _ref;
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    };
  }
  setUserInfo(_ref2) {
    let {
      name,
      description
    } = _ref2;
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialCards": function() { return /* binding */ initialCards; },
/* harmony export */   "validationSettings": function() { return /* binding */ validationSettings; }
/* harmony export */ });

const initialCards = [{
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
}, {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
}, {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
}, {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
}, {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
}, {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}];

/* Validaton */
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");








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
const addCardFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_6__.validationSettings, addCardFormElement);
addCardFormValidator.enableValidation();
const editFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_6__.validationSettings, profileEditForm);
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

const newCardPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_2__["default"]("#add-card-modal", inputValues => {
  handleCardCreate({
    name: inputValues.title,
    link: inputValues.url
  });
  addCardFormValidator.disableButton();
  newCardPopup.close();
});

//UserInfo
const userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description"
});
const profileEditPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_2__["default"]("#profile-edit-modal", inputValues => {
  userInfo.setUserInfo({
    name: inputValues.title,
    description: inputValues.description
  });
  profileEditPopup.close();
});

// Create image preview popup
const imagePopup = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_1__["default"]("#preview-image-modal");

// Add error handling when creating cards
const createCard = cardData => {
  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_4__["default"](cardData, "#card-template", imageData => {
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
const cardSection = new _components_Section_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  items: _utils_constants_js__WEBPACK_IMPORTED_MODULE_6__.initialCards,
  renderer: data => handleCardCreate(data)
}, ".cards__list");

// Add this line to render initial cards:
cardSection.renderItems();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0wRSxVQUFVLEdBQUcsSUFBSXRELHFFQUFjLENBQUMsc0JBQXNCLENBQUM7O0FBRTdEO0FBQ0EsTUFBTThDLFVBQVUsR0FBSWpKLFFBQVEsSUFBSztFQUMvQixNQUFNZ0osSUFBSSxHQUFHLElBQUlsSiwyREFBSSxDQUFDRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUcwSixTQUFTLElBQUs7SUFDL0QsSUFBSTtNQUNGRCxVQUFVLENBQUMzRSxJQUFJLENBQUM0RSxTQUFTLENBQUM7SUFDNUIsQ0FBQyxDQUFDLE9BQU83SCxLQUFLLEVBQUU7TUFDZEQsT0FBTyxDQUFDQyxLQUFLLENBQUMsOEJBQThCLEVBQUVBLEtBQUssQ0FBQztNQUNwRDtNQUNBOEgsS0FBSyxDQUFDLDZDQUE2QyxDQUFDO0lBQ3REO0VBQ0YsQ0FBQyxDQUFDO0VBQ0YsT0FBT1gsSUFBSSxDQUFDaEksT0FBTyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUVEcUksZ0JBQWdCLENBQUNsRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3BDbUUsWUFBWSxDQUFDbkUsaUJBQWlCLENBQUMsQ0FBQztBQUNoQ3NFLFVBQVUsQ0FBQ3RFLGlCQUFpQixDQUFDLENBQUM7O0FBRTlCO0FBQ0EsTUFBTStELFdBQVcsR0FBRyxJQUFJM0MsOERBQU8sQ0FDN0I7RUFDRUUsS0FBSyxFQUFFb0IsNkRBQVk7RUFDbkJuQixRQUFRLEVBQUdYLElBQUksSUFBS2dELGdCQUFnQixDQUFDaEQsSUFBSTtBQUMzQyxDQUFDLEVBQ0QsY0FDRixDQUFDOztBQUVEO0FBQ0FtRCxXQUFXLENBQUNwQyxXQUFXLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy04Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLTgvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy04Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy04Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLTgvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLTgvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMtOC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLTgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMtOC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMtOC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMtOC8uL3NyYy9wYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoY2FyZERhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljaykge1xuICAgIHRoaXMuX25hbWUgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcbiAgfVxuXG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCBjYXJkRWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICA/LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXG4gICAgICA/LmNsb25lTm9kZSh0cnVlKTtcbiAgICBpZiAoIWNhcmRFbGVtZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbXBsYXRlIG5vdCBmb3VuZDogJHt0aGlzLl9jYXJkU2VsZWN0b3J9YCk7XG4gICAgfVxuICAgIHJldHVybiBjYXJkRWxlbWVudDtcbiAgfVxuXG4gIGdldFZpZXcoKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XG5cbiAgICAvLyBTZWxlY3QgZWxlbWVudHNcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9zZXRDYXJkQ29udGVudCgpO1xuICAgIHRoaXMuX3NldEltYWdlRGF0YSgpO1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuICBfc2V0Q2FyZENvbnRlbnQoKSB7XG4gICAgdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2Rlc2NyaXB0aW9uLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICAgIHRoaXMuX25hbWU7XG4gIH1cblxuICAvLyBTZXQgaW1hZ2UgYXR0cmlidXRlc1xuICBfc2V0SW1hZ2VEYXRhKCkge1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGxvYWQgaW1hZ2U6ICR7dGhpcy5fbGlua31gKTtcbiAgICB9O1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIERlbGV0ZSBidXR0b25cbiAgICB0aGlzLl9kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBMaWtlIGJ1dHRvblxuICAgIHRoaXMuX2xpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIC8vIEltYWdlIHByZXZpZXdcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2soeyBsaW5rOiB0aGlzLl9saW5rLCBuYW1lOiB0aGlzLl9uYW1lIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbCkge1xuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBzZXR0aW5ncy5pbnB1dFNlbGVjdG9yO1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3I7XG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IHNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3M7XG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzO1xuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBzZXR0aW5ncy5lcnJvckNsYXNzO1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0RWxzLnNvbWUoKGlucHV0RWwpID0+ICFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcbiAgfVxuXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9pbnB1dEVscyA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gIH1cblxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX2Zvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICB9XG4gIC8vUHVibGljOiBPcGVuIHBvcHVwXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cbiAgLy9QdWJsaWM6IENsb3NlIHBvcHVwXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG4gIC8vUHJpdmF0ZTogY2xvc2Ugb24gZXNjIGtleVxuICBfaGFuZGxlRXNjQ2xvc2UoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIC8vUHVibGljOiBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Nsb3NlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgLy9jbGljayBvdXRzaWRlIG9mIHBvcHVwIGNvbnRlbnRcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5fcG9wdXApIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgICB0aGlzLl9pbnB1dExpc3QgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcbiAgfVxuICAvL1ByaXZhdGU6IHRvIGdldCBhbGwgZm9ybSBpbnB1dCB2YWx1ZXMgYXMgYSBvYmplY3RcbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGZvcm1WYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybVZhbHVlcztcbiAgfVxuXG4gIHNldElucHV0VmFsdWVzKGRhdGEpIHtcbiAgICAvLyBMb29wIHRocm91Z2ggaW5wdXRzIGFuZCBzZXQgdGhlaXIgdmFsdWVzXG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAvLyBUaGUgaW5wdXQgbmFtZSBhdHRyaWJ1dGUgc2hvdWxkIG1hdGNoIHRoZSBkYXRhIG9iamVjdCBrZXlcbiAgICAgIGNvbnN0IGlucHV0TmFtZSA9IGlucHV0Lm5hbWU7XG4gICAgICAvLyBTZXQgdGhlIGlucHV0IHZhbHVlIGlmIHdlIGhhdmUgbWF0Y2hpbmcgZGF0YVxuICAgICAgaWYgKGRhdGFbaW5wdXROYW1lXSkge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGRhdGFbaW5wdXROYW1lXS50cmltKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2ltYWdlRWxlbWVudCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xuICAgIHRoaXMuX2NhcHRpb25FbGVtZW50ID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZGVzY3JpcHRpb25cIik7XG4gIH1cblxuICBvcGVuKHsgbmFtZSwgbGluayB9KSB7XG4gICAgdGhpcy5faW1hZ2VFbGVtZW50LnNyYyA9IGxpbms7XG4gICAgdGhpcy5faW1hZ2VFbGVtZW50LmFsdCA9IG5hbWU7XG4gICAgdGhpcy5fY2FwdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gdGhpcy5fcmVuZGVyZXIoaXRlbSkpO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGRlc2NyaXB0aW9uU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX25hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGVzY3JpcHRpb25TZWxlY3Rvcik7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuX25hbWVFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuX2Rlc2NyaXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlckluZm8oeyBuYW1lLCBkZXNjcmlwdGlvbiB9KSB7XG4gICAgdGhpcy5fbmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG4iLCJleHBvcnQgeyBpbml0aWFsQ2FyZHMsIHZhbGlkYXRpb25TZXR0aW5ncyB9O1xuXG5jb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC95b3NlbWl0ZS5qcGdcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFrZS1sb3Vpc2UuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhdGVtYXIuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC92YW5vaXNlLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYWdvLmpwZ1wiLFxuICB9LFxuXTtcblxuLyogVmFsaWRhdG9uICovXG5jb25zdCB2YWxpZGF0aW9uU2V0dGluZ3MgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc2F2ZS1idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xuaW1wb3J0IHsgaW5pdGlhbENhcmRzLCB2YWxpZGF0aW9uU2V0dGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XG5cbi8vIERPTSBFbGVtZW50c1xuXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiKTtcbmNvbnN0IHByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xuY29uc3QgcHJvZmlsZVRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtaW5wdXRcIik7XG5jb25zdCBmb3JtID0gcHJvZmlsZUVkaXRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQgPSBmb3JtLmVsZW1lbnRzLmRlc2NyaXB0aW9uO1xuXG5jb25zdCBhZGRDYXJkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1jYXJkLW1vZGFsXCIpO1xuY29uc3QgYWRkTmV3Q2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0Rm9ybSA9IHByb2ZpbGVFZGl0TW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbmNvbnN0IHByZXZpZXdJbWFnZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmV2aWV3LWltYWdlLW1vZGFsXCIpO1xuXG5jb25zdCBhZGRDYXJkRm9ybUVsZW1lbnQgPSBhZGRDYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbmNvbnN0IGFkZENhcmRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIHZhbGlkYXRpb25TZXR0aW5ncyxcbiAgYWRkQ2FyZEZvcm1FbGVtZW50XG4pO1xuXG5hZGRDYXJkRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG5cbmNvbnN0IGVkaXRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIHZhbGlkYXRpb25TZXR0aW5ncyxcbiAgcHJvZmlsZUVkaXRGb3JtXG4pO1xuZWRpdEZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuXG5mdW5jdGlvbiBoYW5kbGVDYXJkQ3JlYXRlKGNhcmREYXRhKSB7XG4gIGNvbnN0IGNhcmQgPSBjcmVhdGVDYXJkKGNhcmREYXRhKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkKTtcbn1cblxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgZWRpdEZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIGNvbnN0IHVzZXJEYXRhID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgcHJvZmlsZUVkaXRQb3B1cC5zZXRJbnB1dFZhbHVlcyh1c2VyRGF0YSk7XG4gIHByb2ZpbGVFZGl0UG9wdXAub3BlbigpO1xufSk7XG5cbmFkZE5ld0NhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgbmV3Q2FyZFBvcHVwLm9wZW4oKTtcbn0pO1xuXG4vLyBDcmVhdGUgbmV3IGNhcmQgcG9wdXAgZm9yIGFkZGluZyBjYXJkc1xuXG5jb25zdCBuZXdDYXJkUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNhZGQtY2FyZC1tb2RhbFwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcbiAgaGFuZGxlQ2FyZENyZWF0ZSh7XG4gICAgbmFtZTogaW5wdXRWYWx1ZXMudGl0bGUsXG4gICAgbGluazogaW5wdXRWYWx1ZXMudXJsLFxuICB9KTtcbiAgYWRkQ2FyZEZvcm1WYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbigpO1xuICBuZXdDYXJkUG9wdXAuY2xvc2UoKTtcbn0pO1xuXG4vL1VzZXJJbmZvXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIG5hbWVTZWxlY3RvcjogXCIucHJvZmlsZV9fdGl0bGVcIixcbiAgZGVzY3JpcHRpb25TZWxlY3RvcjogXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIixcbn0pO1xuXG5jb25zdCBwcm9maWxlRWRpdFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLFxuICAoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy50aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBpbnB1dFZhbHVlcy5kZXNjcmlwdGlvbixcbiAgICB9KTtcbiAgICBwcm9maWxlRWRpdFBvcHVwLmNsb3NlKCk7XG4gIH1cbik7XG5cbi8vIENyZWF0ZSBpbWFnZSBwcmV2aWV3IHBvcHVwXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctaW1hZ2UtbW9kYWxcIik7XG5cbi8vIEFkZCBlcnJvciBoYW5kbGluZyB3aGVuIGNyZWF0aW5nIGNhcmRzXG5jb25zdCBjcmVhdGVDYXJkID0gKGNhcmREYXRhKSA9PiB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChjYXJkRGF0YSwgXCIjY2FyZC10ZW1wbGF0ZVwiLCAoaW1hZ2VEYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGltYWdlUG9wdXAub3BlbihpbWFnZURhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igb3BlbmluZyBpbWFnZSBwcmV2aWV3OlwiLCBlcnJvcik7XG4gICAgICAvLyBPcHRpb25hbGx5IHNob3cgYSB1c2VyLWZyaWVuZGx5IGVycm9yIG1lc3NhZ2VcbiAgICAgIGFsZXJ0KFwiU29ycnksIHRoZXJlIHdhcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBpbWFnZVwiKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY2FyZC5nZXRWaWV3KCk7XG59O1xuXG5wcm9maWxlRWRpdFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5uZXdDYXJkUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbmltYWdlUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy8gSW5pdGlhbCBjYXJkIHJlbmRlcmluZ1xuY29uc3QgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiBoYW5kbGVDYXJkQ3JlYXRlKGRhdGEpLFxuICB9LFxuICBcIi5jYXJkc19fbGlzdFwiXG4pO1xuXG4vLyBBZGQgdGhpcyBsaW5lIHRvIHJlbmRlciBpbml0aWFsIGNhcmRzOlxuY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcbiJdLCJuYW1lcyI6WyJDYXJkIiwiY29uc3RydWN0b3IiLCJjYXJkRGF0YSIsImNhcmRTZWxlY3RvciIsImhhbmRsZUltYWdlQ2xpY2siLCJfbmFtZSIsIm5hbWUiLCJfbGluayIsImxpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJjYXJkRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJFcnJvciIsImdldFZpZXciLCJfZWxlbWVudCIsIl9jYXJkSW1hZ2UiLCJfZGVsZXRlQnV0dG9uIiwiX2xpa2VCdXR0b24iLCJfc2V0Q2FyZENvbnRlbnQiLCJfc2V0SW1hZ2VEYXRhIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwidGV4dENvbnRlbnQiLCJzcmMiLCJhbHQiLCJvbmVycm9yIiwiY29uc29sZSIsImVycm9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbCIsIl9pbnB1dFNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIl9zdWJtaXRCdXR0b25TZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiX2lucHV0RXJyb3JDbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsIl9lcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIl9mb3JtRWwiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsIiwiZXJyb3JNZXNzYWdlRWwiLCJpZCIsImFkZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVCdXR0b24iLCJfc3VibWl0QnV0dG9uIiwiZGlzYWJsZWQiLCJfaW5wdXRFbHMiLCJzb21lIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInJlc2V0VmFsaWRhdGlvbiIsImVuYWJsZVZhbGlkYXRpb24iLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJvcGVuIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJrZXkiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfZm9ybSIsIl9pbnB1dExpc3QiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJmb3JtVmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsInNldElucHV0VmFsdWVzIiwiZGF0YSIsImlucHV0TmFtZSIsInRyaW0iLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX2ltYWdlRWxlbWVudCIsIl9jYXB0aW9uRWxlbWVudCIsIl9yZWYiLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInJlbmRlckl0ZW1zIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiZGVzY3JpcHRpb25TZWxlY3RvciIsIl9uYW1lRWxlbWVudCIsIl9kZXNjcmlwdGlvbkVsZW1lbnQiLCJnZXRVc2VySW5mbyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJzZXRVc2VySW5mbyIsIl9yZWYyIiwiaW5pdGlhbENhcmRzIiwidmFsaWRhdGlvblNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwicHJvZmlsZVRpdGxlIiwicHJvZmlsZURlc2NyaXB0aW9uIiwicHJvZmlsZVRpdGxlSW5wdXQiLCJmb3JtIiwicHJvZmlsZURlc2NyaXB0aW9uSW5wdXQiLCJlbGVtZW50cyIsImFkZENhcmRNb2RhbCIsImFkZE5ld0NhcmRCdXR0b24iLCJwcm9maWxlRWRpdEZvcm0iLCJwcmV2aWV3SW1hZ2VNb2RhbCIsImFkZENhcmRGb3JtRWxlbWVudCIsImFkZENhcmRGb3JtVmFsaWRhdG9yIiwiZWRpdEZvcm1WYWxpZGF0b3IiLCJoYW5kbGVDYXJkQ3JlYXRlIiwiY2FyZCIsImNyZWF0ZUNhcmQiLCJjYXJkU2VjdGlvbiIsInVzZXJEYXRhIiwidXNlckluZm8iLCJwcm9maWxlRWRpdFBvcHVwIiwibmV3Q2FyZFBvcHVwIiwiaW5wdXRWYWx1ZXMiLCJ1cmwiLCJpbWFnZVBvcHVwIiwiaW1hZ2VEYXRhIiwiYWxlcnQiXSwic291cmNlUm9vdCI6IiJ9