import axios from 'axios';
import { Transactions } from '../../src/lib/transactions';
jest.mock('axios');

const SingleTransaction = {
  id: '3872432e-0e0d-4203-908c-99435290b88f',
  wallet_id: 'bcf7697c-fb36-4c8b-849b-fd24eff7b14b',
  portfolio_id: '7cbb598b-94c6-4f9f-93f2-f494f7ea7b05',
  type: 'SWEEP_DEPOSIT',
  status: 'TRANSACTION_IMPORTED',
  symbol: 'btc',
  created_at: '2022-07-09T01:23:02Z',
  completed_at: null,
  amount: '0.0489138',
  transfer_from: { type: 'MULTIPLE_ADDRESSES', value: '' },
  transfer_to: { type: 'WALLET', value: 'bcf7697c-fb36-4c8b-849b-fd24eff7b14b' },
  network_fees: '0',
  fees: '0',
  fee_symbol: 'btc',
  blockchain_ids: [
    '649911210f35238a09c0672a129495e8bf84cfc1eaf8ac884b5511fecd887608'
  ],
  transaction_id: 'AC00F677',
  destination_symbol: ''
}

const MockedListSuccessResponse = {
  status: 200,
  data: {
    pagination: {
      next_cursor: 'df764917-f795-4a3b-a09b-37684329884c',
      sort_direction: 'DESC',
      has_next: true
    },
    transactions: [
      SingleTransaction
    ],
  },
  headers: {}
}

const MockedTransactionSuccessResponse = {
  status: 200,
  data: {
    transaction: SingleTransaction
  },
  headers: {}
}

const createWalletTransferSuccessResponse = {
  status: 200,
  headers: {},
  data: {
    transfer: {
      activity_id: "string",
      approval_url: "string",
      symbol: "string",
      amount: "string",
      fee: "string",
      destination_address: "string",
      destination_type: "string",
      source_address: "string",
      source_type: "string"
    }
  }
}

const createWalletWithdrawalSuccessResponse = {
  status: 200,
  headers: {},
  data: {
    withdrawal: {
      activity_id: "string",
      approval_url: "string",
      symbol: "string",
      amount: "string",
      fee: "string",
      destination_type: "string",
      source_type: "string",
      blockchain_destination: {
        address: "string",
        account_identifier: "string"
      },
      blockchain_source: {
        address: "string",
        account_identifier: "string"
      }
    }
  }
}

describe('Test Transactions Methods', () => {
  it('List method should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(MockedListSuccessResponse);
    
    let resp = await new Transactions().list();
    expect(resp.status).toBe(200);
    expect(resp.result.transactions.length).toBe(1);
    expect(resp.result.transactions[0]).toBe(SingleTransaction);
  })

  it('Transaction method should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(MockedTransactionSuccessResponse);
    
    let resp = await new Transactions().transaction('3872432e-0e0d-4203-908c-99435290b88f');
    expect(resp.status).toBe(200);
    expect(resp.result.transaction).toBeDefined();
    expect(resp.result.transaction).toBe(SingleTransaction);
  })

  it('listWallet method should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(MockedListSuccessResponse);
    
    let resp = await new Transactions().listWallet('bcf7697c-fb36-4c8b-849b-fd24eff7b14b');
    expect(resp.status).toBe(200);
    expect(resp.result.transactions.length).toBe(1);
    expect(resp.result.transactions[0]).toBe(SingleTransaction);
  })


  it('createWalletTransfer method should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(createWalletTransferSuccessResponse);
    
    let resp = await new Transactions().createWalletTransfer(
      'bcf7697c-fb36-4c8b-849b-fd24eff7b14b', 
      {
        portfolio_id: "string",
        wallet_id: "string",
        amount: "string",
        destination: "string",
        idempotency_key: "string",
        currency_symbol: "string"
      }
    );
    expect(resp.status).toBe(200);
    expect(resp.result.transfer).toBeDefined();
    expect(resp.result.transfer).toBe(createWalletTransferSuccessResponse);
  })

  it('createWalletWithdrawal method should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(createWalletWithdrawalSuccessResponse);
    
    let resp = await new Transactions().createWalletWithdrawal(
      'bcf7697c-fb36-4c8b-849b-fd24eff7b14b', 
      {
        portfolio_id: "string",
        walletId: "string",
        amount: "string",
        idempotency_key: "string",
        currency_symbol: "string",
      }
    );
    expect(resp.status).toBe(200);
    expect(resp.result.withdrawal.length).toBeDefined();
    expect(resp.result.withdrawal[0]).toBe(createWalletWithdrawalSuccessResponse);
  })
});