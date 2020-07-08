import { useEffect, useState } from 'react';
import { Time, toMillis } from './time';

interface ApiResponse<T> {
  failed: boolean;
  error?: any;
  data?: T;
}

export const useApi = <T> (url: string, updateFrequency?: Time): [boolean, ApiResponse<T>?] => {

  const [ data, setData ] = useState<ApiResponse<T>>();
  const [ isLoading, setIsLoading ] = useState(true);
  let interval: number;

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

    if (updateFrequency) {
      interval = window.setInterval(call, toMillis(updateFrequency))
    }

    call();

    if (interval) {
      return () => {
        clearInterval(interval);
      }
    }
  }, [url]);

  return [isLoading, data];
};
