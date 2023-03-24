import Beer from '../src/Beer';
import Invoice from '../src/Invoice';
import Juice from '../src/Juice';
import Water from '../src/Water';
import Whisky from '../src/Whisky';

test('Deve criar uma nota fiscal e calcular os impostos', function () {
  const invoice = new Invoice();
  invoice.addItem(new Beer('Heineken 600ml', 10)); // 10% = 1
  invoice.addItem(new Whisky('Jack Daniels 1l', 100)); // 20% = 20
  invoice.addItem(new Water('Crystal 500ml', 5)); // 0% = 0
  invoice.addItem(new Juice('Laranja 500ml', 10)); // 10% = 1
  const taxes = invoice.getTaxes();
  expect(taxes).toBe(22);
});

test('Deve criar uma nota fiscal e calcular o total', function () {
  const invoice = new Invoice();
  invoice.addItem(new Beer('Heineken 600ml', 10)); // 10% = 1
  invoice.addItem(new Whisky('Jack Daniels 1l', 100)); // 20% = 20
  invoice.addItem(new Water('Crystal 500ml', 5)); // 0% = 0
  const total = invoice.getTotal();
  expect(total).toBe(115);
});
