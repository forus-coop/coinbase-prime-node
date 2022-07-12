import { Addresses } from "../../src/lib/addresses";
import axios from 'axios';
jest.mock('axios');

const address =  {
  id: '123',
  currency_symbol: 'btc',
  name: 'ExchangeBTC',
  address: '124',
  account_identifier: '',
  account_identifier_name: '',
  state: 'in_usa',
  explorer_link: '',
  last_used_at: '',
  added_at: '',
  added_by: {}
}

const mockedSuccessResponse = {
  status: 200,
  data: {
    addresses: [
      address
    ]
  },
  headers: {}
}

describe('list addresses', () => {
  it('should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(mockedSuccessResponse);
    const resp = await new Addresses().list();
    expect(resp.status).toBe(200);
    expect(resp.result.addresses.length).toBe(1);
    expect(resp.result.addresses[0]).toBe(address);
  })
});

describe('create address', () => {
  it('should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(mockedSuccessResponse);
    const resp = await new Addresses().create(address);
    expect(resp.status).toBe(200);
  })
});


