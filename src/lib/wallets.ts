import { Client } from "./client";
import { formatResponse, ResponseFormat } from "./util";

type ListParams = {
  portfolio_id?: string,
  type?: string,
  cursor?: string,
  limit?: number,
  sort_direction?: string,
  symbols?: string[],
}

type CreateParams = {
  name?: string,
  symbol?: string,
  wallet_type?: string,
}

type DepositInstructionsParams = {
  portfolio_id?: string,
  wallet_id?: string,
  deposit_type?: string
}

export class Wallets extends Client {

  // List all wallets associated with a given portfolio
  // ==== Path Params
  // * +portfolio_id+ - [String] ID of portfolio
  // ==== options
  //
  // * +type+           - [String] The wallet type.
  //                      VAULT: A crypto vault
  //                      TRADING: A trading wallet
  // * +cursor+         - [String] Cursor used for pagination
  //                       (last consumed record)
  // * +limit+          - [Int] Number of wallets to retrieve
  // * +sort_direction+ - [String] Sorting order (DESC, ASC)
  // * +symbols+        - [Array] The wallet symbol.
  // ==== Returns
  // * [Hash] a hash with list of wallets along with pagination
  async list<ResponseFormat>(params: ListParams = {}) {
    return formatResponse(
      await this.get(`${this.portfolioUri()}/wallets`, params)
    );
  }

  // Create wallet
  // ==== Path Params
  // * +portfolio_id+ - [String] ID of portfolio
  // ==== wallet_details
  //
  // * +name+         - [String] Wallet name
  // * +symbol+       - [String] Wallet Symbol
  // * +wallet_type+  - [String] The wallet type
  //                    VAULT: A crypto vault
  //                    TRADING: A trading wallet
  // ==== Returns
  // * [Hash] a hash with created wallet details

  async create<ResponseFormat>(params: CreateParams = {}) {
    return formatResponse(
      await this.post(`${this.portfolioUri()}/wallets`, params)
    );
  }

  // Get Wallet by Wallet ID
  // ==== Path Params
  // * +portfolio_id+ - [String] ID of portfolio
  // * +wallet_id+    - [String] ID of wallet
  // ==== Returns
  // * [Hash] a hash of wallet details
  async fetch<ResponseFormat>(walletId: string) {
    return formatResponse(
      await this.get(`${this.portfolioUri()}/wallets/${walletId}`)
    );
  }

  // Retrieve a specific wallet's deposit instructions.
  // ==== Path Params
  // * +portfolio_id+ - [String] ID of portfolio
  // * +wallet_id+    - [String] ID of wallet
  // ==== options
  //
  // * +deposit_type+ - [String] The deposit type
  //                    UNKNOWN_WALLET_DEPOSIT_TYPE: nil value
  //                    CRYPTO: A cryptocurrency deposit
  //                    WIRE: A wire deposit
  //                    SEN: A Silvergate Exchange Network deposit
  //                    SWIFT: A SWIFT deposit
  // ==== Returns
  // * [Hash] a hash of deposite instructions
  async depositInstructions<ResponseFormat>(walletId: string, params: DepositInstructionsParams = {}) {
    return formatResponse(
      await this.get(
        `${this.portfolioUri()}/wallets/${walletId}/deposit_instructions`, params
      )
    );
  }
}
