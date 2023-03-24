import Checkout from './application/Checkout';
import RestController from './infra/controller/RestController';
import CouponDataDatabase from './infra/data/CouponDataDatabase';
import OrderDataDatabase from './infra/data/OrderDataDatabase';
import ProductDataDatabase from './infra/data/ProductDataDatabase';
import PgPromiseConnection from './infra/database/PgPromiseConnection';
import ExpressHttpServer from './infra/http/ExpressHttpServer';

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const checkout = new Checkout(productData, couponData, orderData);
new RestController(httpServer, checkout);
httpServer.listen(3000);
