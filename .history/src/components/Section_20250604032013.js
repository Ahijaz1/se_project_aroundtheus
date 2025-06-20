export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    console.log("renderItems called, items count:", this._items.length);
    console.log("this._items:", this._items);
    this._items.forEach((item) => {
      console.log("Processing item:", item);
      const cardElement = this._renderer(item);
      console.log("Created card element:", cardElement);
      this.addItem(cardElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
