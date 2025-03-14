class Card {
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
    }
    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();

    // Select elements
    this._cardImage = this._element.querySelector(".cardimage");
    this._deleteButton = this._element.querySelector(".carddelete-button");
    this._likeButton = this._element.querySelector(".cardlike-button");

    // Set image attributes
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Set card title
    this._element.querySelector(".card__description-title").textContent =
      this._name;

    this._setEventListeners();
    return this._element;
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
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
}
export default Card;
