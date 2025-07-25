export default class Card {
<<<<<<< HEAD
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
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
=======
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id || cardData.id;
    this._isLiked = cardData.isLiked || false;
    this._isLocal = cardData.isLocal || false;
    this._cardSelector = cardSelector;
    this._imageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this.handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);

    const cardElement = template.content.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  get isLocal() {
    return this._isLocal;
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

    this._deleteButton.addEventListener("click", () => {
      if (this.handleDeleteCard) {
        this.handleDeleteCard(this);
      }
    });

    this._cardImage.addEventListener("click", () => {
      this._imageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  get cardId() {
    return this._id;
  }

  get isLiked() {
    return this._isLiked;
  }

  remove() {
    if (this._cardElement) {
      this._cardElement.remove();
      this._cardElement = null;
    }
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
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
    this._cardElement = this._getTemplate();

    if (!this._cardElement) {
      return null;
    }

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__name");

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
>>>>>>> 1dcf5b6 (fixes to code review)
  }
}
