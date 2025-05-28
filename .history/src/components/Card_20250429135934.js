export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      ?.content.querySelector(".card")
      ?.cloneNode(true);
    if (!cardElement) {
      throw new Error(`Template not found: ${this._cardSelector}`);
    }
    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();

    // Select elements
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._setCardContent();
    this._setImageData();
    this._setEventListeners();
    return this._element;
  }

  _setCardContent() {
    this._element.querySelector(".card__description-title").textContent =
      this._name;
  }

  // Set image attributes
  _setImageData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImage.onerror = () => {
      console.error(`Failed to load image: ${this._link}`);
    };
  }

  _setEventListeners() {
    // Delete button
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    // Like button
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    // Image preview
    this._cardImage.addEventListener("click"), () => {
      this._handleImageClick({ link: this._link, name: this._name });
  }
}

export { Card };
