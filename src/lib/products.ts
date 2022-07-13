// Base class to connect to coinbase
import { formatResponse, ResponseFormat } from "./util";
import { Client } from './client';

type ListParams = { cursor?: string, limit?: number, sort_direction?: string }
export class Products extends Client {

  // List tradable products for a given portfolio
  // ==== Path Params
  // * +portfolio_id+   - [String] ID of portfolio
  // ==== options
  //
  // * +cursor+         - [String] Cursor used for pagination
  //                       (last consumed record)
  // * +limit+          - [Int] Number of products to retrieve
  // * +sort_direction+ - [String] Sorting order (DESC, ASC)
  // ==== Returns
  // * [Hash] a hash with list of products along with pagination
  async list<ResponseFormat>(params: ListParams = {}) {
    const operationalUrl = `${this.portfolioUri()}/products`
    const res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }
}

