export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    ImageClick,
    likeButton,
    deleteButton
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._ImageClick = ImageClick;
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

    if (!this._element) {
      return null;
    }

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__name");

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
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
    // Delete button //
    this._deleteButton.addEventListener("click", () => {
      if (this._handleDeleteClick) {
        this._handleDeleteClick(this);
      } else {
        this._handleDeleteCard(); // original
      }
    });

    // Like button //
    this._likeButton.addEventListener("click", () => {
      if (this.likeButton) {
        this.likeButton(this);
      } else {
        this._handleLikeButton();
      }
    });

    // Image preview //
    this._cardImage.addEventListener("click", () => {
      this._imageClick({
        name: this._name,
        link: this._link,
      });
    });
  }
}
