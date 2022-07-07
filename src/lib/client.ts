// Base class to connect to coinbase
import * as _ from 'lodash';
import util = require('./util');
const CryptoJS = require('crypto-js');
import axios from 'axios';
const API_SECRET = process.env.API_SECRET;
const API_KEY = process.env.API_KEY;
const PASSPHRASE = process.env.PASSPHRASE;
const BASE_URL = process.env.BASE_URL;
const PORTFOLIO_ID = process.env.PORTFOLIO_ID;
const ENTITY_ID = process.env.ENTITY_ID;

export class Client {
  // Generate signature
  signature(method: string, timestamp: number, requestPath: string = '', body?: any) {
    if (!_.isUndefined(body)){
      body = body.to_json();
    } else {
      body = '';
    }
  
    const message = `${timestamp}${method}${requestPath}${body}`;
    const hash = CryptoJS.HmacSHA256(message, API_SECRET);
    return hash.toString(CryptoJS.enc.Base64);
  }

  // Required headers for every request
  headers(method: string, path: string, body: any){
    const timestamp = Math.floor(Date.now() / 1000);

    const sign = this.signature(method, timestamp, path, body)
    return {
      "Content-Type": "application/json",
      "X-CB-ACCESS-KEY": API_KEY,
      "X-CB-ACCESS-SIGNATURE": sign,
      "X-CB-ACCESS-TIMESTAMP": timestamp,
      "X-CB-ACCESS-PASSPHRASE": PASSPHRASE
    }
  }

  // Generate object of params and headers for request
  requestParams(method: string, path: string, body?: any): any {
    let requestHeaders = this.headers(method, path, body)
    let params = { headers: requestHeaders }
    if (!_.isUndefined(body)) {
      _.merge(params, { body: body.to_json() })
    }
    return params;
  }

  // Get request
  async get(path: string, params: object = {}) {
    let queryParams: (string | object) = util.buildQueryParams(params)
    if (!_.isEmpty(queryParams)) {
      path += queryParams;
    }
    const headers = this.requestParams('GET', path);

    let result: any;
    try {
      result = await axios.get(BASE_URL + path, headers );
    } catch(error) {
      result = error;
      result = result.response;
    }
    return result;
  }

  // Post request
  async post(path: string, body?: any) {
    const params = this.requestParams('POST', path, body);

    let result: any;
    try {
      result = await axios.post(BASE_URL + path, params );
    } catch(error) {
      result = error;
      result = result.response;
    }
    return result;
  }

  // Generate portfolio url using portfolio ID
  portfolioUri(): string {
    return `/v1/portfolios/${PORTFOLIO_ID}`;
  }

  // Generate entity url using entity ID
  entityUri(): string {
    return `/v1/entities/${ENTITY_ID}`;
  }
}




