import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
  }
  //Private: to get all form input values as a object
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    // Loop through inputs and set their values
    this._inputList.forEach((input) => {
      // The input name attribute should match the data object key
      const inputName = input.name;
      // Set the input value if we have matching data
      if (data[inputName]) {
        input.value = data[inputName];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()).then(() => {
        this.close();
      });
    });
  }
  //Reset the form when popup closes
  close() {
    super.close();
    this._form.reset();
  }
}
