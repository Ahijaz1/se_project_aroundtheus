class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this_.form = formElement;
  }

  //make sure its errorMessageEL for down below
  _showInputError(inputEl, errorMessageEL) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  //figure out what to do for this part still
  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {}

  _checkInputValidity() {}

  _setEventListeners() {
    this._inputEls = [...this.form.querySelectorAll(this._inputSelector)];
    this._submitButton = this.form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity(this.form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, options);
  }
}

//put in index.js when ready
//const editFormValidator = new FormValidator(settings, editForm);
//const addFormValidator = new FormValidator(settings, addForm);
//editFormValidator.enableValidation();

export default FormValidator;
