import React, { useEffect, useState } from 'react';
import { WinesResponse } from './types';
import { toMillis } from '../utils/time';
import { useApi } from '../utils/useApis';
import { WineList } from '../winelisting/WineListingView';
import './WineView.scss';

const VintageList = (vintages: string[]) =>
  <ul className="vintages">
    { vintages.map(vintage => <li key={vintage}>{vintage}</li>)}
  </ul>;

export const WineView = () => {

  const [ StatsView, setStatsView ] = useState();
  const [ loading, response ] = useApi<WinesResponse>('/wine_status', toMillis(30, 'minutes'));

  let currentIndex = 0;
  useEffect(() => {
    if (!response || response.failed || !response.data) return;
    const statsViews = [
      <WineList
        title="Høyest rangering på Vivino"
        wines={response.data.wineStatus.stats.highestRated}
        fields={['rating', 'wineName', 'numberOfBottles']}/>,
      <WineList
        title="Mest samlet"
        wines={response.data.wineStatus.stats.mostCollected.map((wine) => {
          return {...wine, vintages: VintageList(wine.vintages)}
        })}
        fields={['numberOfBottles', 'wineName', 'vintages']}/>,
      <WineList
        title="Nyeste viner"
        wines={response.data.wineStatus.stats.mostRecentlyScanned}
        fields={['wineName', 'vintage', 'rating', 'numberOfBottles']}/>,
    ];

    setStatsView(statsViews[currentIndex]);
    const interval = setInterval(() => {
      setStatsView(statsViews[currentIndex++ % statsViews.length]);
    }, toMillis(25, 'seconds'));

    return () => { clearInterval(interval) };
  }, [response, currentIndex]);


  if (loading) {
    return null;
  }
  return <>{StatsView}</>;
};
