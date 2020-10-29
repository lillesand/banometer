import { getApiRoot } from '../utils/env';

export const makeRequest = (uri: string, opts: RequestInit) => {

  const url = uri.startsWith('http') ? uri : getApiRoot() + uri;
  return fetch(url, opts);

}
