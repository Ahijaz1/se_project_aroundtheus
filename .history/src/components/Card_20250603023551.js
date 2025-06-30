export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    ImageClickButton,
    handleLikeCardButton,
    onDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this.ImageClickButton = ImageClickButton;
    this._id = _id;
    this._isLiked = isLiked;
    this._handleLikeCardButton = handleLikeCardButton;
    this._onDeleteCard = onDeleteCard;
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
    this._ImageClickButton.src = this._link;
    this._ImageClickButton.alt = this._name;
    this._ImageClickButton.onerror = () => {
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
      if (typeof this._onDeleteCard === "function") {
        this._onDeleteCard(this); //pass the Card instance if needed
      }
    });

    // Like button //
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCardButton();
    });

    // Image preview //
    this.ImageClickButton.addEventListener("click", () => {
      this._ImageClickButton({
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

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeStyle() {
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

    const ImageClickButton = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__description-title");

    ImageClickButton.src = this._link;
    ImageClickButton.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    return this._element;
  }
}
