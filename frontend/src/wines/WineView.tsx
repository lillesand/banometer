import React, { useEffect, useState } from 'react';
import { WinesResponse } from './types';
import { HighestRated } from './HighestRated';
import { toMillis } from '../utils/time';
import { MostCollected } from './MostCollected';
import { MostRecentlyScanned } from './MostRecentlyScanned';
import { useApi } from '../utils/useApis';

export const WineView = () => {

  const [ StatsView, setStatsView ] = useState();
  const [ loading, response ] = useApi<WinesResponse>('http://localhost:5000/wine_status');

  let currentIndex = 0;
  useEffect(() => {
    if (!response || response.failed || !response.data) return;
    const statsViews = [
      <HighestRated wines={response.data.wineStatus.stats.highestRated}/>,
      <MostCollected wines={response.data.wineStatus.stats.mostCollected}/>,
      <MostRecentlyScanned wines={response.data.wineStatus.stats.mostRecentlyScanned}/>
    ];

    setStatsView(statsViews[currentIndex]);
    const interval = setInterval(() => {
      setStatsView(statsViews[currentIndex++ % statsViews.length]);
    }, toMillis(25, 'seconds'));

    return () => { clearInterval(interval) };
  }, [response, currentIndex]);


  if (loading) {
    return '';
  }
  return StatsView;
};
