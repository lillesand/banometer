import { useEffect, useState } from 'react';

interface ApiResponse<T> {
  failed: boolean;
  error?: any;
  response?: T;
}

export const useApi = <T> (url: string): [boolean, ApiResponse<T>?] => {

  const [ data, setData ] = useState<ApiResponse<T>>();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData({
          failed: false,
          response: res,
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
  }, [url]);

  return [isLoading, data];
};
