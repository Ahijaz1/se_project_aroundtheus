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
    this._ImageClickButton = ImageClickButton;
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

  // Elements //

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__name");

    // Like button //
    this._likeButton.addEventListener("click", () => {
      if (this._handleLikeClick) {
        this._handleLikeCardButton();
      } else {
        this._handleLikeButton();
      }
    });

    // Delete button //
    this._deleteButton.addEventListener("click", () => {
      if (this._onDeleteCard) {
        this._onDeleteCard(this);
      } else {
        this._onDeleteCard();
      }
    });

    // Image preview //
    this._cardImage.addEventListener("click", () => {
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

  _onDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButton() {
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
    const cardTitle = this._element.querySelector(".card__description-title");

    this._likeButton = this._cardElement.querySelector(".card__like-button");

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
