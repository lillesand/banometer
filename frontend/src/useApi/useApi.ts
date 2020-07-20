import { useEffect, useState } from 'react';
import { getApiRoot } from '../utils/env';
import { useHistory } from 'react-router';
import { toMillis } from '../utils/time';
import { SleepHistoryProps } from '../sleep/SleepView';

interface ApiResponse<T> {
  failed: boolean;
  error?: any;
  data?: T;
}

export const useApi = <T> (uri: string, updateFrequencyMillis?: number): [boolean, ApiResponse<T>?] => {
  const [ data, setData ] = useState<ApiResponse<T>>();
  const [ isLoading, setIsLoading ] = useState(true);
  const history = useHistory<SleepHistoryProps>();

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
        .then(() => {
          setIsLoading(false);
        })
    };

    call();

    if (updateFrequencyMillis) {
      let interval = window.setInterval(call, updateFrequencyMillis);
      let sleepInteval = window.setTimeout(() => {
        history.push('/sleep', { previous: history.location.pathname });
      }, toMillis(20, 'minutes'));

      return () => {
        window.clearInterval(interval);
        window.clearInterval(sleepInteval);
      }
    }
  }, [url, updateFrequencyMillis, history]);

  return [isLoading, data];
};
