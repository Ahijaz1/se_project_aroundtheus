export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }
  //Public: Open popup//
  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlayClose);
  }
  //Public: Close popup//
  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlayClose);
  }
  //Private: close on esc key//
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains("modal_opened")) {
      this.close();
    }
  }
  //Public: attach event listeners//
  setEventListeners() {
    this._popup.querySelector(".modal__close").addEventListener("click", () => {
      this.close();
    });
    //click outside of popup content//
    this._popup.addEventListener("mousedown", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
