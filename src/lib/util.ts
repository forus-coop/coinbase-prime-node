import * as _ from 'lodash';

export interface ResponseFormat {
  status: (number | string),
  result: any,
  headers: any
}

// Format API response
export function formatResponse<ResponseFormat>(response: any) {
  return {
    status: response.status,
    result: response.data,
    headers: response.headers
  }
}

// Build query params
export function buildQueryParams(params?: any) {
  if (_.isUndefined(params) || _.isEmpty(params)) {
    return {};
  }
  return '?' + new URLSearchParams(params).toString();
}
