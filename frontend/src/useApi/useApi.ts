import { useEffect, useState } from 'react';
import { getApiRoot } from '../utils/env';
import { useHistory } from 'react-router';
import { toMillis } from '../utils/time';
import { SleepHistoryProps } from '../sleep/SleepView';

type Status = 'loading' | 'success' | 'failed';

export interface ApiResponse<T> {
  status: Status;
  error?: any;
  data?: T;
}

export const useApi = <T> (uri: string, updateFrequencyMillis?: number): ApiResponse<T> => {
  const [ response, setResponse ] = useState<ApiResponse<T>>({ status: 'loading' });
  const history = useHistory<SleepHistoryProps>();

  const url = uri.startsWith('http') ? uri : getApiRoot() + uri;

  useEffect(() => {
    const call = () => {
      setResponse({ status: 'loading' });

      fetch(url)
        .then(res => res.json())
        .then(res => {
          setResponse({
            status: 'success',
            data: res,
          });
        })
        .catch(error => {
          setResponse({
            status: 'failed',
            error: error
          });
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

  return response;
};
