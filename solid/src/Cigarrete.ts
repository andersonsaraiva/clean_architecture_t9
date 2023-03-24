import TaxItem from './TaxItem';

export default class Cigarrete extends TaxItem {
  getTax(): number {
    return this.price * 0.5;
  }
}
