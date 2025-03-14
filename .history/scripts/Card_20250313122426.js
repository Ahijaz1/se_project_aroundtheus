class Card {
  constructor(cardData, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector);
  }

  getView() {}
}

export default Card;
