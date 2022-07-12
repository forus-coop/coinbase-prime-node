import * as constants from '../constants';
import { Activities } from '../../src/lib/activities';
import axios from 'axios';
jest.mock('axios');

const MockedSuccessResponse = {
  status: 200,
  data: {
    activities: []
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

describe('#Activities', () => {
  let mockedAxios: any;
  let signature;
  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    signature = jest.fn();
    Activities.prototype.signature = signature;
    signature.mockReturnValue('ANN2EJi9q09sNxQGD5qKzkLMB+MtJGbGiuTqoDMVOYg=');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of Activities', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Activities().list();
    expect(resp.status).toBe(200);
    expect(axios.get).toHaveBeenCalledWith(`${constants.BASE_URL}/v1/portfolios/portfolioId/activities`, headers);
  })

   it('should return single activity', async () => {
    mockedAxios.get.mockResolvedValue(MockedSuccessResponse);
    const resp = await new Activities().fetch('activityId');
    expect(resp.status).toBe(200);
    expect(axios.get).toHaveBeenCalledWith(`${constants.BASE_URL}/v1/portfolios/portfolioId/activities/activityId`, headers);
  })
});
