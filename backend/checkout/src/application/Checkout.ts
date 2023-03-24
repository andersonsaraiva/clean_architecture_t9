import CouponData from '../domain/data/CouponData';
import CurrencyGatewayRandom from '../infra/gateway/CurrencyGatewayRandom';
import CurrencyGateway from '../infra/gateway/CurrencyGatewayRandom';
import Mailer from '../infra/mailer/Mailer';
import MailerConsole from '../infra/mailer/MailerConsole';
import Order from '../domain/entities/Order';
import OrderData from '../domain/data/OrderData';
import ProductData from '../domain/data/ProductData';

export default class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData,
    readonly orderData: OrderData,
    readonly currencyGateway: CurrencyGateway = new CurrencyGatewayRandom(),
    readonly mailer: Mailer = new MailerConsole()
  ) {}

  async execute(input: Input) {
    const currencies = await this.currencyGateway.getCurrencies();
    const order = new Order(input.cpf);
    for (const item of input.items) {
      const product = await this.productData.getProduct(item.idProduct);
      order.addItem(
        product,
        item.quantity,
        product.currency,
        currencies.getCurrency(product.currency)
      );
    }
    if (input.coupon) {
      const coupon = await this.couponData.getCoupon(input.coupon);
      order.addCoupon(coupon);
    }
    await this.orderData.save(order);
    return {
      code: order.getCode(),
      total: order.getTotal()
    };
  }
}

type Input = {
  cpf: string;
  email?: string;
  items: { idProduct: number; quantity: number }[];
  coupon?: string;
};
