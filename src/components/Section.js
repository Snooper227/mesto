 export default class Section {
    constructor(containerSelector, {renderer}) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems(initialItems) {
        initialItems.forEach(item => {
            this._renderer(item)
        });
    }

    addItem(item) {
       this._containerSelector.prepend(item);
    }

 }