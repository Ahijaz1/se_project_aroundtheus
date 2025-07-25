export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._imageClick = handleImageClick;
    this._id = _id;
    this._isLiked = isLiked;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }
 _setEventListeners() {

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__name");


    this._likeButton.addEventListener("click", () => {
      if (this._handleLikeClick) {
        this._handleLikeClick(this);
      } else {
        this._handleLikeButton();
      }
    });


  cardId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
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
      console.error("Template not found or empty");
      return null;
    }

    this._likeButton = this._element.querySelector(".card__like-button");
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__name");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._deleteButton = this._element.querySelector(".card__delete-button");
    if (!this._isOwned && this._deleteButton) {
      this._deleteButton.style.display = "none";
    }

    this._setEventListeners();
    return this._element;
  }
}
