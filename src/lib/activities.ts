import { Client } from "./client";
import { formatResponse, ResponseFormat } from "./util";

type listParams = {
  currency_symbol?: string,
  symbols?: string[],
  categories?: string[],
  statuses?: string[],
  start_time?: string,
  end_time?: string,
  cursor?: string,
  limit?: number,
  sort_direction?: string,
}

export class Activities extends Client {

  // Gets a list of address book Activities.
  // ==== options
  //
  // * +currency_symbol+ - [String]  A Currency symbol of address (optional)
  // * +symbols+ - [Array] Filter by list of currencies (optional)
  // * +categories+ - [Array] Filter by list of activity categories [order,allocation] (optional)
  // * +statuses+ - [Array] Filter by list of statuses(optional)
  // * +start_time+ - [String] Filter created time by start date (optional)
  // * +end_time+ - [String] Filter created time by end date (optional)
  // * +cursor+ - [String] Id to retrieve additional results strictly after (optional)
  // * +limit+ - [Int] Filter created time by end date (optional)
  // * +sort_direction+ - [String] Sorting order (optional)
  // ==== Returns
  // * [Hash] a hash with list of Activities
  async list<ResponseFormat>(params: listParams = {}) {
    return formatResponse(
      await this.get(`${this.portfolioUri()}/activities`, params)
    );
  }


  // Get Order by Activity Id
  // ==== options
  //
  // * +activityId+ -  [String] the valid activity id.
  //
  // ==== Returns
  // * [Hash] a hash with status code and activity
  async fetch<ResponseFormat>(activityId:string ,params = {}) {
    return formatResponse(
      await this.get(`${this.portfolioUri()}/activities/${activityId}`, params)
    );
  }
}
