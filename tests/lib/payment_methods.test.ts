import axios from 'axios';
import { PaymentMethods } from '../../src';
jest.mock('axios');

const MockedSuccessResponse = {
  status: 200,
  data: {
    details: {
      id: "payment_method_id",
      symbol: "string",
      payment_method_type: "METHOD_WIRE",
      name: "string",
      account_number: "string",
      bank_code: "string"
    }
  },
  headers: {}
}

describe('Test Payment Method Methods', () => {
  it('should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    
    let resp = await new PaymentMethods().entityPaymentMethod('payment_method_id');
    expect(resp.status).toBe(200);
    expect(resp.result.details).toBeDefined();
    expect(resp.result.details.id).toBe('payment_method_id');
  })
});
