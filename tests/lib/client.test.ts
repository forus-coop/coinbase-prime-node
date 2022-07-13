import { Client } from '../../src/lib/client';
import * as _ from 'lodash';

enum requestMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE'
}

describe('headers', () => {

  it('should generate signature', async () => {
    const sign = await new Client().signature(requestMethod.GET, 1657279139, '/test');
    expect(sign).toBe('NAidNF5qazoSJpmLR/pe8qHTrEDLPx4PA11Xf/ayerY=');
  });

  it('should render all required headers', async () => {
    const requiredHeaders =   [
      'Content-Type',
      'X-CB-ACCESS-KEY',
      'X-CB-ACCESS-SIGNATURE',
      'X-CB-ACCESS-TIMESTAMP',
      'X-CB-ACCESS-PASSPHRASE'
    ]

    const headers = await new Client().headers(requestMethod.GET, '/test', undefined);
    expect(_.keys(headers)).toStrictEqual(requiredHeaders);
  });
});

describe('requestHeaders', () => {
  it('should not have body key if body is undefined', async () => {
    const res = await new Client().requestParams(requestMethod.GET, '/test');
    expect(_.keys(res)).toStrictEqual(['headers']);
  });

  it('should have body key if body is present', async () => {
    const res = await new Client().requestParams(requestMethod.GET, '/test', { name: 'test' });
    expect(_.keys(res)).toStrictEqual(['headers', 'body']);
  });
});

describe('build URLs', () => {
  it('should return portfolio URL', async () => {
    const res = await new Client().portfolioUri();
    expect(res).toBe(`/v1/portfolios/${process.env.PORTFOLIO_ID}`);
  });

  it('should return entity URL', async () => {
    const res = await new Client().entityUri();
    expect(res).toBe(`/v1/entities/${process.env.ENTITY_ID}`);
  });  
});


