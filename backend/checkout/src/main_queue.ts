import Checkout from './application/Checkout';
import CouponDataDatabase from './infra/data/CouponDataDatabase';
import OrderDataDatabase from './infra/data/OrderDataDatabase';
import PgPromiseConnection from './infra/database/PgPromiseConnection';
import CatalogGatewayHttp from './infra/gateway/CatalogGatewayHttp';
import FreightGatewayHttp from './infra/gateway/FreightGatewayHttp';
import StockGatewayHttp from './infra/gateway/StockGatewayHttp';
import QueueController from './infra/queue/QueueController';
import RabbitMQAdapter from './infra/queue/RabbitMQAdapter';

async function init() {
  const queue = new RabbitMQAdapter();
  await queue.connect();
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
  new QueueController(queue, checkout);
}

init();
