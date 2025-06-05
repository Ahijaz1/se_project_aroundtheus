export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    ImageClick,
    likeCardButton,
    deleteCardButton
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._ImageClick = ImageClick;
    this._id = _id;
    this._isLiked = isLiked;
    this._likeCardButton = likeCardButton;
    this._deleteCardButton = deleteCardButton;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);

    const cardElement = template.content.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _setCardContent() {
    this._element.querySelector(".card__description-title").textContent =
      this._name;
  }

  // Set image attributes //
  _setImageData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImage.onerror = () => {
      console.error(`Failed to load image: ${this._link}`);
    };
  }

  // Event Listeners //

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__name");

    // Delete button //
    this._deleteButton.addEventListener("click", () => {
      if (this._handleDeleteCardButton) {
        this._handleDeleteCardButton(this);
      } else {
        this._handleDeleteCardButton(); // original
      }
    });

    // Like button //
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCardButton();
    });

    // Image preview //
    this._cardImage.addEventListener("click", () => {
      this._ImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  cardId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  _handleDeleteCardButton() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCardButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  setLikeStatus(status) {
    this._isLiked = status;

    if (status) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getView() {
    this._element = this._getTemplate();

    if (!this._element) {
      return null;
    }

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__name");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._element;
  }
}
