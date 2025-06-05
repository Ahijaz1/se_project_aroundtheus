export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item); // createCard() returns element
      this.addItem(element); // DON'T call createCard() again
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
