import Checkout from '../../src/application/Checkout';
import CLIController from '../../src/infra/cli/CLIController';
import CouponDataDatabase from '../../src/infra/data/CouponDataDatabase';
import OrderDataDatabase from '../../src/infra/data/OrderDataDatabase';
import PgPromiseConnection from '../../src/infra/database/PgPromiseConnection';
import sinon from 'sinon';
import CLIHandlerMemory from '../../src/infra/cli/CLIHandlerMemory';
import FreightGatewayHttp from '../../src/infra/gateway/FreightGatewayHttp';
import CatalogGatewayHttp from '../../src/infra/gateway/CatalogGatewayHttp';
import StockGatewayHttp from '../../src/infra/gateway/StockGatewayHttp';

test('Deve testar o cli', async function () {
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
  const handler = new CLIHandlerMemory();
  new CLIController(handler, checkout);
  await handler.type('set-cpf 987.654.321-00');
  await handler.type('add-item 1 1');
  await handler.type('checkout');
  const [returnValue] = checkoutSpy.returnValues;
  const output = await returnValue;
  expect(output.code).toBe('202300000001');
  expect(output.total).toBe(1030);
  checkoutSpy.restore();
  await connection.close();
});
