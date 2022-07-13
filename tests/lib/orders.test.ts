import * as constants from '../constants';
import { Orders } from '../../src/lib/orders';
import { ResponseFormat } from '../../src/lib/util';
import axios from 'axios';
jest.mock('axios');

const MockedSuccessResponse = {
  status: 200,
  data: {
    orders: []
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

describe('#Orders', () => {
  let mockedAxios: any;
  let signature;
  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    signature = jest.fn();
    Orders.prototype.signature = signature;
    signature.mockReturnValue('ANN2EJi9q09sNxQGD5qKzkLMB+MtJGbGiuTqoDMVOYg=');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of orders', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Orders().list();
    expect(resp.status).toBe(200);
    expect(resp.result.orders.length).toBe(0);
    expect(axios.get).toHaveBeenCalledWith(
      `${constants.BASE_URL}/v1/portfolios/portfolioId/orders`,
      headers
    );
  })

  it('should return list of open orders', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Orders().openOrders();
    expect(resp.status).toBe(200);
    expect(resp.result.orders.length).toBe(0);
    expect(axios.get).toHaveBeenCalledWith(
      `${constants.BASE_URL}/v1/portfolios/portfolioId/open_orders`,
      headers
    );
  })

  it('should return preview orders', async () => {
    mockedAxios.post.mockResolvedValue(MockedSuccessResponse);
    const body = Object.assign({}, headers, { body: '{}' });
    const resp = await new Orders().preview();
    expect(resp.status).toBe(200);
    expect(resp.result.orders.length).toBe(0);
    expect(axios.post).toHaveBeenCalledWith(
      `${constants.BASE_URL}/v1/portfolios/portfolioId/order_preview`,
      body
    );
  })

  it('should return a order by Order ID', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Orders().fetch('orderId');
    expect(resp.status).toBe(200);
    expect(resp.result.orders.length).toBe(0);
    expect(axios.get).toHaveBeenCalledWith(
      `${constants.BASE_URL}/v1/portfolios/portfolioId/orders/orderId`,
      headers
    );
  })

  it('should cancel a order by Order ID', async () => {
    mockedAxios.post.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Orders().cancel('orderId');
    expect(resp.status).toBe(200);
    expect(resp.result.orders.length).toBe(0);
    expect(axios.post).toHaveBeenCalledWith(
      `${constants.BASE_URL}/v1/portfolios/portfolioId/orders/orderId/cancel`,
      headers
    );
  })

  it('should return fill orders', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Orders().fills('orderId');
    expect(resp.status).toBe(200);
    expect(resp.result.orders.length).toBe(0);
    expect(axios.get).toHaveBeenCalledWith(
      `${constants.BASE_URL}/v1/portfolios/portfolioId/orders/orderId/fills`,
      headers
    );
  })
});