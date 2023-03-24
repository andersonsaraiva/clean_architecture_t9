import Checkout from './application/Checkout';
import CLIController from './infra/cli/CLIController';
import CLIHandlerNode from './infra/cli/CLIHandlerNode';
import CouponDataDatabase from './infra/data/CouponDataDatabase';
import OrderDataDatabase from './infra/data/OrderDataDatabase';
import PgPromiseConnection from './infra/database/PgPromiseConnection';
import CatalogGatewayHttp from './infra/gateway/CatalogGatewayHttp';
import FreightGatewayHttp from './infra/gateway/FreightGatewayHttp';

const connection = new PgPromiseConnection();
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const freightGateway = new FreightGatewayHttp();
const catalogGateway = new CatalogGatewayHttp();
const checkout = new Checkout(
  catalogGateway,
  couponData,
  orderData,
  freightGateway
);
const handler = new CLIHandlerNode();
new CLIController(handler, checkout);
