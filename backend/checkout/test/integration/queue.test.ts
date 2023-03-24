import Checkout from '../../src/application/Checkout';
import CouponDataDatabase from '../../src/infra/data/CouponDataDatabase';
import OrderDataDatabase from '../../src/infra/data/OrderDataDatabase';
import PgPromiseConnection from '../../src/infra/database/PgPromiseConnection';
import QueueController from '../../src/infra/queue/QueueController';
import sinon from 'sinon';
import QueueMemory from '../../src/infra/queue/QueueMemory';
import FreightGatewayHttp from '../../src/infra/gateway/FreightGatewayHttp';
import CatalogGatewayHttp from '../../src/infra/gateway/CatalogGatewayHttp';
import StockGatewayHttp from '../../src/infra/gateway/StockGatewayHttp';

test('Deve testar com a fila', async function () {
  const queue = new QueueMemory();
  const connection = new PgPromiseConnection();
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);
  const freightGateway = new FreightGatewayHttp();
  const catalogGateway = new CatalogGatewayHttp();
  const stockGateway = new StockGatewayHttp();
  const checkout = new Checkout(
    catalogGateway,
    couponData,
    orderData,
    freightGateway,
    stockGateway
  );
  const checkoutSpy = sinon.spy(checkout, 'execute');
  new QueueController(queue, checkout);
  const input = {
    cpf: '987.654.321-00',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 }
    ]
  };
  await queue.publish('checkout', input);
  const [returnValue] = checkoutSpy.returnValues;
  const output = await returnValue;
  expect(output.code).toBe('202300000001');
  expect(output.total).toBe(6370);
  checkoutSpy.restore();
  await connection.close();
});
