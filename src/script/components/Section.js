 export default class Section {
    constructor(containerSelector, {renderer}) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems(initialItems) {
        initialItems.forEach(item => {
            this.addItem(item);
        });
    }

    addItem(item) {
        const cardElement = this._renderer(item)
       this._containerSelector.prepend(cardElement);
    }

 }