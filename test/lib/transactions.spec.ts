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

const MockedSuccessResponse = {
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

describe('Test Transactions Methods', () => {
  it('should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    
    let resp = await new Transactions().list();
    expect(resp.status).toBe(200);
    expect(resp.result.transactions.length).toBe(1);
    expect(resp.result.transactions[0]).toBe(SingleTransaction);
  })
});