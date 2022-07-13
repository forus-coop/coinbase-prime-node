// Base class to connect to coinbase
import { formatResponse, ResponseFormat } from "./util";
import { Client } from './client';

type PortfolioParams = { balance_type?: string, symbol?: string }
export class Balances extends Client {

  // Get balance for a specific wallet
  // ==== Path Params
  // * +portfolio_id+   - [String] ID of portfolio
  // * +wallet_id+      - [String] ID of wallet
  // ==== Returns
  // @return [Hash] a hash with list of balances
  async wallet<ResponseFormat>(wallet_id: string) {
    const operationalUrl = `${this.portfolioUri()}/wallets/${wallet_id}/balance`
    const res = await this.get(operationalUrl);
    return formatResponse(res);
  }

  // List all balances for a specific portfolio
  // ==== Path Params
  // * +portfolio_id+  - [String] ID of portfolio
  // ==== params
  // * +balance_type+  - [String] A type by which to filter balances
  //                     TRADING_BALANCES: Trading balances
  //                     VAULT_BALANCES: Vault balances
  //                     TOTAL_BALANCES: Total balances
  // * +symbols+       - [String] A list of symbols by which to filter
  //                     the response
  // ==== Returns
  // @return [Hash] a hash with balances
  async portfolio<ResponseFormat>(params: PortfolioParams = {}) {
    const operationalUrl = `${this.portfolioUri()}/balances`
    const res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }
}
