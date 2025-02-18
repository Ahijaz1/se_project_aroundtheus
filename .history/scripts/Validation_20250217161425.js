// Show input error
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

// Hide input error
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMessageEl) {
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  } else {
    console.log(`Error element not found for ${inputEl.id}`);
  }
}

// Check input validity
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

// Check if form has invalid inputs
function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}

// Toggle button state
function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

// Reset form validation when modal closes
function resetValidation(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  inputEls.forEach((inputEl) => hideInputError(formEl, inputEl, options));
  toggleButtonState(inputEls, submitButton, options);
}

// Set event listeners for form validation
function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  // here you disable the button when you start the project
  toggleButtonState(inputList, buttonElement, options);

  // here you add the `reset` handler
  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, options);
  });

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

// Enable validation for forms
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, options);
  });
}

// Close modal on overlay click or close button
const handleModalClose = (event) => {
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal__close")
  ) {
    closePopup(event.currentTarget);
  }
};

// Add event listeners to modals
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

// Close modal on Escape key press
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-button");

// Function to handle keydown event
function handleEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

// Function to open modal and add event listener
function openModal() {
  modal.style.display = "block";
  document.addEventListener("keydown", handleEscape);
}

// Function to close modal and remove event listener
function closeModal() {
  modal.style.display = "none";
  document.removeEventListener("keydown", handleEscape);
}

// Attach click event to close button
closeButton.addEventListener("click", closeModal);

// Validation configuration
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Initialize validation
enableValidation(config);
