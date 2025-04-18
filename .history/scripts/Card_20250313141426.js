class Card {
  constructor(cardData, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    cardDelete.addEventListener("click", () => cardElement.remove());
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    cardImageEL.addEventListener("click", () => {
        openPopup(previewImageModal);
        previewCardImage.src = cardData.link;
        previewCardImage.alt = cardData.name;
        previewDescription.textContent = cardData.name;
      });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
  }
}

export default Card;
