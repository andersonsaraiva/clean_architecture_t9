import Checkout from './application/Checkout';
import RestController from './infra/controller/RestController';
import CouponDataDatabase from './infra/data/CouponDataDatabase';
import OrderDataDatabase from './infra/data/OrderDataDatabase';
import PgPromiseConnection from './infra/database/PgPromiseConnection';
import CatalogGatewayHttp from './infra/gateway/CatalogGatewayHttp';
import FreightGatewayHttp from './infra/gateway/FreightGatewayHttp';
import ExpressHttpServer from './infra/http/ExpressHttpServer';

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
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
new RestController(httpServer, checkout);
httpServer.listen(3000);
