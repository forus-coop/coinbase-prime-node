import * as constants from '../constants';
import { Wallets } from '../../src/lib/wallets';
import { ResponseFormat } from '../../src/lib/util';
import axios from 'axios';
jest.mock('axios');

const MockedSuccessResponse = {
  status: 200,
  data: {
    wallets: []
  }
}

const headers = {
  'headers': {
    'Content-Type': 'application/json',
    'X-CB-ACCESS-KEY': '',
    'X-CB-ACCESS-PASSPHRASE': '',
    'X-CB-ACCESS-SIGNATURE': 'ANN2EJi9q09sNxQGD5qKzkLMB+MtJGbGiuTqoDMVOYg=',
    'X-CB-ACCESS-TIMESTAMP': 1577836800
  }
}

describe('#Wallets', () => {
  let mockedAxios: any;
  let signature;
  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    signature = jest.fn();
    Wallets.prototype.signature = signature;
    signature.mockReturnValue('ANN2EJi9q09sNxQGD5qKzkLMB+MtJGbGiuTqoDMVOYg=');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of Wallets', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Wallets().list();
    expect(resp.status).toBe(200);
    expect(axios.get).toHaveBeenCalledWith(`${constants.BASE_URL}/v1/portfolios/portfolioId/wallets`, headers);
  })

   it('should return single wallet', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Wallets().fetch('walletId');
    expect(resp.status).toBe(200);
    expect(axios.get).toHaveBeenCalledWith(`${constants.BASE_URL}/v1/portfolios/portfolioId/wallets/walletId`, headers);
  })

  it('should return a specific wallets deposit instructions', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Wallets().depositInstructions('walletId');
    expect(resp.status).toBe(200);
    expect(axios.get).toHaveBeenCalledWith(`${constants.BASE_URL}/v1/portfolios/portfolioId/wallets/walletId/deposit_instructions`, headers);
  })

  it('should create wallet', async () => {
    mockedAxios.post.mockResolvedValue(MockedSuccessResponse);
    const body = Object.assign({}, headers, { body: '{}' });
    const resp = await new Wallets().create();
    expect(resp.status).toBe(200);
    expect(axios.post).toHaveBeenCalledWith(`${constants.BASE_URL}/v1/portfolios/portfolioId/wallets`, body);
  })
});