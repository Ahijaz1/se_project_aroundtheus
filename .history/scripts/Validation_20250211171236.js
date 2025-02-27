// enabling validation by calling enableValidation()
// pass all the settings on call

function setEventListeners (){

}

function enableValidation(options) {
  const formEls = Array.form(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl)=>{
    formEl.addEventListener('submit', (e) => { e.preventDefault();
    });


    setEventListeners(formElement, options);
    //look for all inputs inside of form
    //loop though all the imputs to see of all are valid
      // if input is not valid
       // get validation message
       // add error class to input
       // display error message
       // disable button
      // if all inputs are valid
        // enable button
        // reset error messages

  });
h

const config = {
  formSelector: ".modal__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
