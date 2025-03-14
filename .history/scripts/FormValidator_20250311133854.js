class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings._inputSelector:
    this._submitButtonSelector = settings._submitButtonSelector:
    this._inactiveButtonClass = settings._inactiveButtonClass:
    this._inputErrorClass = settings._inputErrorClass:
    this._errorClass = settings._errorClass:

  this_.form = formElement;
  }
  this._inputErrorClass
}

//put in index.js when ready
const editFormValidator = new FormValidator(settings, editForm);
const addFormValidator = new FormValidator(settings, addForm);
