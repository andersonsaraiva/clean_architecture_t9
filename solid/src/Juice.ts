import TaxItem from './TaxItem';

export default class Juice extends TaxItem {
  constructor(description: string, price: number) {
    super('Juice', description, price);
  }

  getTax(): number {
    return this.price * 0.1;
  }
}
