// Base class to connect to coinbase
import * as _ from "lodash";
import "../../dotenv";
import { buildQueryParams } from "./util";
import * as CryptoJS from "crypto-js";
import axios from "axios";

enum requestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

const API_SECRET = process.env.API_SECRET || "";
const API_KEY = process.env.API_KEY || "";
const PASSPHRASE = process.env.PASSPHRASE || "";
const BASE_URL = process.env.BASE_URL || "";
const PORTFOLIO_ID = process.env.PORTFOLIO_ID || "";
const ENTITY_ID = process.env.ENTITY_ID || "";
export class Client {
  // Generate signature
  signature(
    method: requestMethod,
    timestamp: number,
    requestPath = "",
    body?: any
  ) {
    if (!_.isUndefined(body)) {
      body = JSON.stringify(body);
    } else {
      body = "";
    }
    const message = `${timestamp}${method}${requestPath}${body}`;
    const hash = CryptoJS.HmacSHA256(message, API_SECRET);
    return hash.toString(CryptoJS.enc.Base64);
  }

  // Required headers for every request
  headers(method: requestMethod, path: string, body: any) {
    const timestamp = Math.floor(Date.now() / 1000);

    const sign = this.signature(method, timestamp, path, body);
    return {
      "Content-Type": "application/json",
      "X-CB-ACCESS-KEY": API_KEY,
      "X-CB-ACCESS-SIGNATURE": sign,
      "X-CB-ACCESS-TIMESTAMP": timestamp,
      "X-CB-ACCESS-PASSPHRASE": PASSPHRASE,
    };
  }

  // Generate object of params and headers for request
  requestParams(method: requestMethod, path: string, body?: any): any {
    const requestHeaders = this.headers(method, path, body);
    const params = { headers: requestHeaders };
    if (!_.isUndefined(body)) {
      _.merge(params, { body: JSON.stringify(body) });
    }
    return params;
  }

  // Get request
  async get(path: string, params: object = {}) {
    const headers = this.requestParams(requestMethod.GET, path);
    const queryParams: string | object = buildQueryParams(params);

    if (!_.isEmpty(queryParams)) {
      path += queryParams;
    }

    return await axios.get(BASE_URL + path, headers);
  }

  // Post request
  async post(path: string, body?: any) {
    const params = this.requestParams(requestMethod.POST, path, body);

    return await axios.post(BASE_URL + path, params);
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
