import Item from './Item';
import TaxItem from './TaxItem';

export default class Invoice {
  items: Item[];

  constructor() {
    this.items = [];
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  getTaxes() {
    let taxes = 0;
    for (const item of this.items) {
      if (item instanceof TaxItem) {
        taxes += item.getTax();
      }
    }
    return taxes;
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      total += item.price;
      return total;
    }, 0);
  }
}
