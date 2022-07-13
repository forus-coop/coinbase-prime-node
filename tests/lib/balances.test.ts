import { Balances } from "../../src/lib/balances";
import axios from 'axios';
jest.mock('axios');

const walletBalance =  {
  symbol: 'btc',
  amount: '8229.9',
  holds: '0',
}

const portfolioBalance =  {
  balances: [],
  type: 'TOTAL_BALANCES',
  trading_balances: { total: '0.0' },
  vault_balances: { total: '234.0' }
}

const mockedSuccessWalletResponse = {
  status: 200,
  data: {
    balance: walletBalance
  },
  headers: {}
}

const mockedSuccessPortfolioResponse = {
  status: 200,
  data: {
    balance: portfolioBalance
  },
  headers: {}
}

describe('wallet API', () => {
  it('should return wallet balance', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(mockedSuccessWalletResponse);
    const resp = await new Balances().wallet('123');
    expect(resp.status).toBe(200);
    expect(resp.result.balance).toBe(walletBalance);
  })

  it('should return portfolio balance', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(mockedSuccessPortfolioResponse);
    const resp = await new Balances().portfolio();
    expect(resp.status).toBe(200);
    expect(resp.result.balance).toBe(portfolioBalance);
  })
});
