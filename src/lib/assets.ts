import { Client } from "./client";
import { formatResponse, ResponseFormat } from "./util";

export class Assets extends Client{
  async list<ResponseFormat>(params: object = {}) {
    const operationalUrl =  `${this.entityUri()}/assets`;
    const res = await this.get(operationalUrl, params);
    console.log('====================================')
    console.log(operationalUrl)
    return formatResponse(res);
  }
}
