// Base class to connect to coinbase
import { Client } from "./client";
import { formatResponse, ResponseFormat } from "./util";

export class Transactions extends Client {
  // List transactions for a given portfolio (only transactions that affect balances are accessible).
  // ==== options
  // 
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +symbols+ - [String] A case insensitive list of symbols by which to filter the response
  // * +types+ - [Array] The transaction types by which to filter the response
  //       TRANSACTION_TYPE_UNKNOWN: An unknown transaction type
  //       DEPOSIT: A fiat or crypto deposit
  //       WITHDRAWAL: A fiat or crypto withdrawal
  //       INTERNAL_DEPOSIT: An internal fiat or crypto deposit
  //       INTERNAL_WITHDRAWAL: An internal fiat or crypto withdrawal
  //       SWEEP_DEPOSIT: Internal automated deposit to a cold address from a restored address
  //       SWEEP_WITHDRAWAL: Internal automated withdrawal from a restored address to a cold address
  //       PROXY_DEPOSIT: On-chain deposit of funds into proxy contract from cold address
  //       PROXY_WITHDRAWAL: On-chain withdrawal of funds from proxy contract to cold address
  //       BILLING_WITHDRAWAL: Coinbase Prime automated invoice settlement payment
  //       REWARD: Reward payment to an associated address for a staked asset
  //       COINBASE_REFUND: Coinbase Prime refund for the leftover amount
  //       TRANSACTION_TYPE_OTHER: An OTHER type of transaction
  //       WITHDRAWAL_ADJUSTMENT: A manual adjustment withdrawal transaction
  //       DEPOSIT_ADJUSTMENT: A manual adjustment deposit transaction
  //       KEY_REGISTRATION: An on-chain registration for an address
  //       DELEGATION: An on-chain delegation transaction
  //       UNDELEGATION: An on-chain undelegation transaction
  //       RESTAKE: On-chain restaking transaction
  //       COMPLETE_UNBONDING: On-chain unbonding event transaction
  //       WITHDRAW_UNBONDED: On-chain event indicating unbonding period is over
  //       STAKE_ACCOUNT_CREATE: On-chain transaction to begin staking from an address
  //       CHANGE_VALIDATOR: On-chain transaction alter validator
  //       STAKE: On-chain transaction to begin staking in Cryptocurrency network
  //       UNSTAKE: On-chain transaction to stop staking in Cryptocurrency network
  //       REMOVE_AUTHORIZED_PARTY: On-chain transaction to remove a party from a multi-signature wallet
  //       STAKE_AUTHORIZE_WITH_SEED: On-chain transaction to begin staking from a seed account
  //       SLASH: On-chain transaction indicating a slash event has occurred
  //       COINBASE_DEPOSIT: On-chain transaction deposit
  // * +start_time+ - [date-time] start_time (UTC timestamp from which to filter the response)
  // * +end_time+ - [date-time] end_time (UTC timestamp from which to filter the response)
  // * +cursor+ - [String] cursor (Id to retrieve additional results strictly after.)
  // * +limit+ - [Int] limit (Number of items to retrieve)
  // * +sort_direction+ - [String] sort_direction (Page sorting direction)
  // ==== Returns
  // 
  // * [Hash] list of transactions
  async list<ResponseFormat>(params: object = {}) {
    const operationalUrl =  `${this.portfolioUri()}/transactions`;
    const res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }

  // Retrieve a specific transaction by its transaction ID (only transactions that affect balances are accessible).
  // ==== Path Params
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +transactionId+ - [String] transactionId (The transaction ID) (Required)
  // ==== Returns
  // * [Hash] list of transactions
  async transaction<ResponseFormat>(transactionId: string, params: object = {}) {
    const operationalUrl =  `${this.portfolioUri()}/transactions/${transactionId}`;
    const res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }

  // Retrieve transactions for a given wallet (only transactions that affect balances are accessible).
  // ==== Path Params
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +walletId+ - [String]  walletId (The wallet ID) (Required)
  // ==== options
  //
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +walletId+ - [String] walletId (The wallet ID) (Required)
  // * +types+ - [Array] types (The transaction types by which to filter the response)
  //       TRANSACTION_TYPE_UNKNOWN: An unknown transaction type
  //       DEPOSIT: A fiat or crypto deposit
  //       WITHDRAWAL: A fiat or crypto withdrawal
  //       INTERNAL_DEPOSIT: An internal fiat or crypto deposit
  //       INTERNAL_WITHDRAWAL: An internal fiat or crypto withdrawal
  //       SWEEP_DEPOSIT: Internal automated deposit to a cold address from a restored address
  //       SWEEP_WITHDRAWAL: Internal automated withdrawal from a restored address to a cold address
  //       PROXY_DEPOSIT: On-chain deposit of funds into proxy contract from cold address
  //       PROXY_WITHDRAWAL: On-chain withdrawal of funds from proxy contract to cold address
  //       BILLING_WITHDRAWAL: Coinbase Prime automated invoice settlement payment
  //       REWARD: Reward payment to an associated address for a staked asset
  //       COINBASE_REFUND: Coinbase Prime refund for the leftover amount
  //       TRANSACTION_TYPE_OTHER: An OTHER type of transaction
  //       WITHDRAWAL_ADJUSTMENT: A manual adjustment withdrawal transaction
  //       DEPOSIT_ADJUSTMENT: A manual adjustment deposit transaction
  //       KEY_REGISTRATION: An on-chain registration for an address
  //       DELEGATION: An on-chain delegation transaction
  //       UNDELEGATION: An on-chain undelegation transaction
  //       RESTAKE: On-chain restaking transaction
  //       COMPLETE_UNBONDING: On-chain unbonding event transaction
  //       WITHDRAW_UNBONDED: On-chain event indicating unbonding period is over
  //       STAKE_ACCOUNT_CREATE: On-chain transaction to begin staking from an address
  //       CHANGE_VALIDATOR: On-chain transaction alter validator
  //       STAKE: On-chain transaction to begin staking in Cryptocurrency network
  //       UNSTAKE: On-chain transaction to stop staking in Cryptocurrency network
  //       REMOVE_AUTHORIZED_PARTY: On-chain transaction to remove a party from a multi-signature wallet
  //       STAKE_AUTHORIZE_WITH_SEED: On-chain transaction to begin staking from a seed account
  //       SLASH: On-chain transaction indicating a slash event has occurred
  // * +start_time+ - [date-time] start_time (UTC timestamp from which to filter the response)
  // * +end_time+ - [date-time] end_time (UTC timestamp from which to filter the response (inclusive, ISO-8601 format))
  // * +cursor+ - [String] cursor (Id to retrieve additional results strictly after.)
  // * +limit+ - [Int] limit (Number of items to retrieve)
  // * +sort_direction+ - [String] sort_direction (Page sorting direction)
  // ==== Returns
  // * [Hash] list of transactions
  async listWallet<ResponseFormat>(walletId: string, params: object = {}) {
    const operationalUrl =  `${this.portfolioUri()}/wallets/${walletId}/transactions`;
    const res = await this.get(operationalUrl, params);
    return formatResponse(res);
  }

  // Create a wallet transfer.
  // ==== Path Params
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +walletId+ - [String]  walletId (The wallet ID) (Required)
  // ==== options
  //
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +walletId+ - [String]  walletId (The wallet ID) (Required)
  // * +amount+ - [String] amount (The amount in whole units to send) (Required)
  // * +destination+ - [String] destination (The UUID of the destination wallet) (Required)
  // * +idempotency_key+ - [String] idempotency_key (The idempotency key associated with this transfer) (Required)
  // * +currency_symbol+ - [String] (The currency symbol to transfer) (Required)
  // ==== Returns
  // * [Hash] transfers
  async createWalletTransfer<ResponseFormat>(walletId: string, params: object = {}) {
    const operationalUrl = `${this.portfolioUri()}/wallets/${walletId}/transfers`
    const res = await this.post(operationalUrl, params);
    return formatResponse(res);
  }

  // Create a withdrawal.
  // ==== Path Params
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +walletId+ - [String]  walletId (The wallet ID) (Required)
  // ==== options
  //
  // * +portfolio_id+ - [String] portfolioId (Required).
  // * +walletId+ - [String]  walletId (The wallet ID) (Required)
  // * +amount+ - [String] amount (The amount in whole units to send) (Required)
  // * +destination_type+ - [String] destination Type
  // * +idempotency_key+ - [String] idempotency_key (The idempotency key associated with this transfer) (Required)
  // * +currency_symbol+ - [String] (The currency symbol to transfer) (Required)
  // * +Payment_method+ - [Hash] Payment_method (Optional)
  //       payment_method_id: String
  // * +blockchain_address+ - [Hash] Blockchain Address (Optional)
  //       address: String
  //       account_identifier: String
  // ==== Returns
  // * [Hash] withdrawal
  async createWalletWithdrawal<ResponseFormat>(walletId: string, params: object = {}) {
    const operationalUrl = `${this.portfolioUri()}/wallets/${walletId}/withdrawals`
    const res = await this.post(operationalUrl, params);
    return formatResponse(res);
  }
}
