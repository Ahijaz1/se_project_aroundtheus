class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  resetForm() {
    this._form.reset();
  }

  open() {
    super.open();
    // Don't reset form here, or reset only when adding a new card
    // This means when editing profile, you can set inputs after opening popup
  }
}

export default PopupWithForm;
