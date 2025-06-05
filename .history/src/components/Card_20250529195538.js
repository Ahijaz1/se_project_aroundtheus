export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = _id;
    this._isLiked = isLiked;
    this._likeButton = likeButton;
    this._deleteButton = deleteButton;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);

    const cardElement = template.content.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();

    if (!this._Element) {
      return null;
    }

    const cardImage = this._Element.querySelector(".card__image");
    const cardTitle = this._Element.querySelector(".card__name");

    this._likeButton = this._Element.querySelector(".card__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._Element;
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
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }
}
