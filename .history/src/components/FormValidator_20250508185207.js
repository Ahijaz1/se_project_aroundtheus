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
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.resetValidation();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
