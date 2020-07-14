import { useEffect, useState } from 'react';
import { getApiRoot } from './env';

interface ApiResponse<T> {
  failed: boolean;
  error?: any;
  data?: T;
}

export const useApi = <T> (uri: string, updateFrequencyMillis?: number): [boolean, ApiResponse<T>?] => {
  const [ data, setData ] = useState<ApiResponse<T>>();
  const [ isLoading, setIsLoading ] = useState(true);

  const url = uri.startsWith('http') ? uri : getApiRoot() + uri;

  useEffect(() => {
    const call = () => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          setData({
            failed: false,
            data: res,
          });
        })
        .catch(error => {
          setData({
            failed: true,
            error: error
          });
        })
        .finally(() => {
          setIsLoading(false);
        })
    };

    call();

    if (updateFrequencyMillis) {
      let interval = window.setInterval(call, updateFrequencyMillis);

      return () => {
        window.clearInterval(interval);
      }
    }
  }, [url, updateFrequencyMillis]);

  return [isLoading, data];
};
