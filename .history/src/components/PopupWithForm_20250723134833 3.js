import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__save-button");
    this._defaultSubmitText = this._submitButton.textContent;
  }

  // Private: get all form input values as an object
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name] || "";
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.resetForm();
  }

  resetForm() {
    this._form.reset();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (this._submitButton) {
      this._submitButton.textContent = isLoading
        ? loadingText
        : this._defaultSubmitText;
    }
  }
}

export default PopupWithForm;
