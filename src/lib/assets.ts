// Base class to connect to coinbase
import { Client } from "./client";
import { formatResponse, ResponseFormat } from "./util";

export class Assets extends Client {
  // List all assets available for a given entity.
  // ==== Path Params
  // * +portfolio_id+ - [String] portfolioId (Required).
  // ==== Returns
  // * [Hash] list of Assets
  async list<ResponseFormat>(params: object = {}) {
    const operationalUrl =  `${this.entityUri()}/assets`;
    const res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }
}
