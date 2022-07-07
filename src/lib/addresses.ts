// Base class to connect to coinbase
import * as _ from 'lodash';
import util = require('./util');
import { formatResponse, ResponseFormat, buildQueryParams } from "./util";
import { Client } from './client';

export class Addresses extends Client {

  // Gets a list of address book addresses.
  // ==== options
  // 
  // * +currency_symbol+ - [String]  A Currency symbol of address (optional)
  // * +search+          - [String] Address name (optional)
  // * +cursor+          - [String] Retrieve additional res by ID (optional)
  // * +limit+           - [Int] Addresses to retrieve (optional)
  // * +sort_direction+  - [String] Sorting order (optional)
  // 
  // ==== Returns
  // * [Hash] a hash with list of addresses
  async list<ResponseFormat>(params: object = {}) {
    let operationalUrl: string = `${this.portfolioUri()}/address_book`
    let res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }

  // Creates an entry for a portfolio's trusted addresses
  // ==== options
  //
  // * +address+            - [String] A Crypto address to add. (required)
  // * +currency_symbol+    - [String] A Currency symbol of address (required)
  // * +name+               - [String] Name of address book entry (required)
  // * +account_identifier+ - [String] Acc Identifier (DESC, ASC) (optional)
  //
  // ==== Returns
  // * [Hash] a hash with list of addresses along with pagination
  async create<ResponseFormat>(params: object = {}) {
    let operationalUrl: string = `${this.portfolioUri()}/address_book`
    let res = await this.post(operationalUrl, params);
    return formatResponse(res);
  }
}

