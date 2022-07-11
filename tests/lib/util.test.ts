import * as Util from '../../src/lib/util';
import * as _ from 'lodash';

describe('format response', () => {
  it('should return required fields', async () => {
    const res = Util.formatResponse({});
    expect(_.keys(res)).toStrictEqual(['status', 'result', 'headers']);
  });
});

describe('build query params', () => {
  it('should return object with query params', async () => {
    const res = Util.buildQueryParams({ name: 'test', id: '1'});
    expect(res).toBe('?name=test&id=1');
  });
});


