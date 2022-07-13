// Base class to connect to coinbase
import { formatResponse, ResponseFormat } from "./util";
import { Client } from './client';

type ListParams = {
  currency_symbol?: string,
  search?: string,
  cursor?: string,
  limit?: number,
  sort_direction?: string
}

type CreateParams = {
  address: string,
  currency_symbol: string,
  name: string,
  account_identifier?: string
}

export class Addresses extends Client {

  // Gets a list of address book addresses.
  // ==== params
  // 
  // * +currency_symbol+ - [String]  A Currency symbol of address (optional)
  // * +search+          - [String] Address name (optional)
  // * +cursor+          - [String] Retrieve additional res by ID (optional)
  // * +limit+           - [Int] Addresses to retrieve (optional)
  // * +sort_direction+  - [String] Sorting order (optional)
  // 
  // ==== Returns
  // * [Hash] a hash with list of addresses
  async list<ResponseFormat>(params: ListParams = {}) {
    const operationalUrl = `${this.portfolioUri()}/address_book`
    const res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }

  // Creates an entry for a portfolio's trusted addresses
  // ==== params
  //
  // * +address+            - [String] A Crypto address to add. (required)
  // * +currency_symbol+    - [String] A Currency symbol of address (required)
  // * +name+               - [String] Name of address book entry (required)
  // * +account_identifier+ - [String] Acc Identifier (DESC, ASC) (optional)
  //
  // ==== Returns
  // * [Hash] a hash with list of addresses along with pagination
  async create<ResponseFormat>(params: CreateParams) {
    const operationalUrl = `${this.portfolioUri()}/address_book`
    const res = await this.post(operationalUrl, params);
    return formatResponse(res);
  }
}

