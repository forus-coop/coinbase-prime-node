// Base class to connect to coinbase
import { Client } from "./client";
import { formatResponse, ResponseFormat } from "./util";

export class PaymentMethods extends Client {
    // Get payment method details by id for a given entity.
    // ==== Path Params
    // 
    // * +entityId+         - [String] ID of entity
    // * +paymentMethodId+ - [String] ID of paymentMethod
    // 
    // ==== Returns
    // * [Hash] a hash of payment method details
  async entityPaymentMethod<ResponseFormat>(paymentMethodId: string) {
    const operationalUrl =  `${this.entityUri()}/payment-methods/${paymentMethodId}"`;
    const res = await this.get(operationalUrl);
    return formatResponse(res);
  }
}
