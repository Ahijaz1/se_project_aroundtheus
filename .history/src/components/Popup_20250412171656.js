export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //Public: Open popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  //Public: Close popup
  close() {
    this._popupclassList.remove("popup_opened");
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
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
    //click outside of popup content
    this._popup.addEventListener("mousedown", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
