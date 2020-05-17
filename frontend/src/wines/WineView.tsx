import React, { useEffect, useState } from 'react';
import { WinesResponse } from './types';
import { HighestRated } from './HighestRated';
import { toMillis } from '../utils/time';
import { MostCollected } from './MostCollected';
import { MostRecentlyScanned } from './MostRecentlyScanned';

function WineView() {

  const [ StatsView, setStatsView ] = useState();
  const [ wines, setWines ] = useState<WinesResponse>();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/wine_status')
      .then(res => res.json())
      .then(res => {
        setWines(res);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('oh no, failed!', error);
      })
  }, []);

  let currentIndex = 0;
  useEffect(() => {
    if (!wines) return;
    const statsViews = [
      <HighestRated wines={wines!.wineStatus.stats.highestRated}/>,
      <MostCollected wines={wines!.wineStatus.stats.mostCollected}/>,
      <MostRecentlyScanned wines={wines!.wineStatus.stats.mostRecentlyScanned}/>
    ];

    setStatsView(statsViews[currentIndex]);
    const interval = setInterval(() => {
      setStatsView(statsViews[currentIndex++ % statsViews.length]);
    }, toMillis(5, 'seconds'));

    return () => { clearInterval(interval) };
  }, [wines, currentIndex]);

  return <div>
    {isLoading && <p>laddar…</p>}
    {StatsView}
  </div>
}

export default WineView;
