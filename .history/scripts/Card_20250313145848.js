class Card {
  constructor(cardData, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
  });
}
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    // Select elements
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");

    // Set image attributes
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Set card title
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
