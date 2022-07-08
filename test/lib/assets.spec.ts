import { Assets } from "../../src/lib/assets";
import { ResponseFormat } from "../../src/lib/util";
import axios from 'axios';
jest.mock('axios');

const DemoAsset =  {
  name: "Orbs",
  symbol: "orbs",
  decimal_precision: "18",
  trading_supported: false,
  explorer_url: "https://etherscan.io/address/"}

const MockedSuccessResponse = {
  status: 200,
  data: {
    assets: [
      DemoAsset
    ]
  },
  headers: {}
}

describe('Test Assets Methods', () => {
  it('should return valid Response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    
    let resp = await new Assets().list();
    expect(resp.status).toBe(200);
    expect(resp.result.assets.length).toBe(1);
    expect(resp.result.assets[0]).toBe(DemoAsset);
  })
});
