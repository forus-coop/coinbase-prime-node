import axios from 'axios';
import { Products } from '../../src/lib/products';
jest.mock('axios');

const singleProduct = {
  id: 'ZRX-USD',
  base_increment: '0.00001',
  quote_increment: '0.000001',
  base_min_size: '0.82',
  quote_min_size: '1',
  base_max_size: '1200000',
  quote_max_size: '10000000',
  permissions: [ 'PRODUCT_PERMISSION_READ', 'PRODUCT_PERMISSION_TRADE' ]
}

const mockedSuccessProductListResponse = {
  status: 200,
  data: {
    pagination: {
      next_cursor: 'df764917-f795-4a3b-a09b-37684329884c',
      sort_direction: 'DESC',
      has_next: true
    },
    products: [
      singleProduct
    ],
  },
  headers: {}
}

describe('Test Products Methods', () => {
  it('should return list of products', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(mockedSuccessProductListResponse);
    const resp = await new Products().list();
    expect(resp.status).toBe(200);
    expect(resp.result.products.length).toBe(1);
    expect(resp.result.products[0]).toBe(singleProduct);
  })
});
