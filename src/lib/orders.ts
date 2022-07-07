import { Client } from './client';
import { formatResponse, ResponseFormat } from './util';
export class Orders extends Client {
  // Get a list of open orders associated with the portfolios.
  // ==== options
  //
  // * +product_ids+ -  [Array] The product Ids.
  //                     BTC-USD: Only support BTC_USD
  // ==== Returns
  // * [Hash] a hash with list of open orders along with pagination
  async openOrders<ResponseFormat>(params: object = {}) {
    return formatResponse(
      await this.get(`${this.portfolioUri()}/open_orders`, params),
    );
  }

  // Create Order
  // ==== options
  //
  // * +portfolio_id+ -       [String] Id of portfolio.
  // * +product_id+         - [String] A valid product id (e.g. "BTC-USD")
  // * +client_order_id+    - [String] Order ID selected by you to identify
  // your orde
  // * +type+               -  [String]
  //                        Market: market
  //                        LIMIT: limit
  //                        TWAP: twap
  // * +base_quantity+      -  [String]
  // * +quote_value+        -  [String]
  // * +limit_price+        -  [String]
  // * +start_time+         -  [String] In DateTime format
  // * +expiry_time+        -  [String] In DateTime format
  // * +time_in_force+      -  [String]
  //                            GOOD_UNTIL_DATE_TIME: Good until date time
  //                            GOOD_UNTIL_CANCELLED: good until cancelled
  //                            IMMEDIATE_OR_CANCEL: immediate or cancel
  // * +display_quote_size+ -  [String]
  // * +display_base_size+  -  [String]
  // * +stp_id+             -  [String] Self-trade prevention flag
  //
  // ==== Returns
  // * [Hash] a hash with list of open orders along with pagination
  async create<ResponseFormat>(params: object = {}) {
    return formatResponse(
      await this.post(`${this.portfolioUri()}/order`, params),
    );
  }

  // Get Order Preview(POST)

  // ==== options
  //
  // * +portfolio_id+ -       [String] Id of portfolio.
  // * +product_id+         - [String] A valid product id (e.g. "BTC-USD")
  // * +client_order_id+    - [String] Order ID selected by you to identify
  // your orde
  // * +type+               -  [String]
  //                        Market: market
  //                        LIMIT: limit
  //                        TWAP: twap
  // * +base_quantity+      -  [String]
  // * +quote_value+        -  [String]
  // * +limit_price+        -  [String]
  // * +start_time+         -  [String] In DateTime format
  // * +expiry_time+        -  [String] In DateTime format
  // * +time_in_force+      -  [String]
  //                            GOOD_UNTIL_DATE_TIME: Good until date time
  //                            GOOD_UNTIL_CANCELLED: good until cancelled
  //                            IMMEDIATE_OR_CANCEL: immediate or cancel
  //
  // ==== Returns
  // * [Hash] a hash with status code and order details.
  async preview<ResponseFormat>(params: object = {}) {
    return formatResponse(
      await this.post(`${this.portfolioUri()}/order_preview`, params),
    );
  }

  // List Portfolio Orders

  // ==== options
  //
  // * +start_date+        - [String] A start date for the orders to be
  // queried from(required)
  // * +end_date+          - [String] n end date for the orders to be
  // queried from.
  // * +order_statuses+    - [Array] Order ID selected by you to identify
  //                       OPEN: The order is open but unfilled
  //                       FILLED: The order was filled
  //                       CANCELLED: The order was cancelled
  //                       EXPIRED: The order has expired
  //                       FAILED: Order submission failed
  //                       PENDING: The order has been sent but is not
  // yet confirmed your orde
  // * +product_ids+       -  [Array] List of products by which to
  // filter the response.
  // * +order_type+        -  [String] Order type by which to filter the
  // response.
  // * +cursor+            -  [String] Cursor used for pagination
  // (last consumed record)
  // * +limit+             -  [Int] Number of items to retrieve.
  // * +sort_direction+    -  [String] Sorting order.
  // * +order_side+        -  [String] An order side to filter on.
  //
  // ==== Returns
  // * [Hash] a hash with status code and orders.
  async list<ResponseFormat>(params: object = {}) {
    return formatResponse(
      await this.get(`${this.portfolioUri()}/orders`, params),
    );
  }

  // Get Order by Order ID
  // ==== options
  //
  // * +order_id+ -  [String] the valid order id.
  //
  // ==== Returns
  // * [Hash] a hash with status code and order
  async fetch<ResponseFormat>(orderId: string) {
    return formatResponse(
      await this.get(`${this.portfolioUri()}/orders/${orderId}`),
    );
  }

  // Cancel an order. (Filled orders cannot be canceled.)
  // ==== options
  //
  // * +order_id+ -  [String] the valid order id.
  //
  // ==== Returns
  // * [Hash] a hash with status code and order id
  async cancel<ResponseFormat>(orderId: string) {
    return formatResponse(
      await this.post(`${this.portfolioUri()}/orders/${orderId}/cancel`),
    );
  }

  // Get Order Fills

  // ==== options
  //
  // * +order_id+        - [String] The order ID generated by Coinbase
  // * +cursor+          - [String] Cursor used for pagination
  // (last consumed record)
  // * +limit+             -  [Int] Number of items to retrieve.
  // * +sort_direction+    -  [String] Sorting order.
  //
  // ==== Returns
  // * [Hash] a hash with status code and fills.
  async fills<ResponseFormat>(orderId: string, params: object = {}) {
    return formatResponse(
      await this.post(`${this.portfolioUri()}/orders/${orderId}/fills`, params),
    );
  }
}
