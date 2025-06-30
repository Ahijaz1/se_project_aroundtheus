export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item); // renderer returns the element
      this.addItem(cardElement); // ✅ call addItem here
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
