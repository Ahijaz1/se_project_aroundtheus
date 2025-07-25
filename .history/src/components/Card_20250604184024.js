export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._imageClick = handleImageClick;
    this._id = _id;
    this._isLiked = isLiked;
    this._handleLikeClick = handleLikeClick;
    this.handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    console.log("🔍 Template selector:", this._cardSelector);
    console.log("📦 Template found:", template);

    if (!template) {
      console.error("❌ Template not found for selector:", this._cardSelector);
      return null;
    }

    const cardContent = template.content.querySelector(".card");
    console.log("📄 Found .card in template:", cardContent);

    if (!cardContent) {
      console.error("❌ .card element not found inside template content.");
      return null;
    }

    const cardElement = cardContent.cloneNode(true);
    console.log("✅ Cloned card element:", cardElement);
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

    this._deleteButton.addEventListener("click", () => {
      if (this.handleDeleteCard) {
        this.handleDeleteCard(this);
      } else {
        this._handleDeleteCard();
      }
    });

    this._cardImage.addEventListener("click", () => {
      this._imageClick({
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
    console.log("🚧 getView() called for:", this._name);

    this._cardElement = this._getTemplate();

    if (!this._cardElement) {
      console.warn("⚠️ _cardElement is null for:", this._name);
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
  }
}
