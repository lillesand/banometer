import React, { useEffect, useState } from 'react';
import { WinesResponse } from './types';
import { toMillis } from '../utils/time';
import { useApi } from '../useApi/useApi';
import { WineList } from '../winelist/WineList';
import { LoaderWrapper } from '../useApi/LoaderWrapper';
import { LinkItem } from '../menu/LinkItem';
import styles from './WineView.module.scss';

const VintageList = (vintages: string[]) =>
  <ul className="vintages">
    { vintages.map(vintage => <li key={vintage}>{vintage}</li>)}
  </ul>;

export const WineView = () => {

  const [ StatsView, setStatsView ] = useState();
  const response = useApi<WinesResponse>('/wine_status', toMillis(30, 'minutes'));

  let currentIndex = 0;
  useEffect(() => {
    if (response.status !== 'success') return;
    const data = response!.data!;
    const statsViews = [
      <WineList
        title="Høyest rangering på Vivino"
        wines={data.wineStatus.stats.highestRated}
        fields={['rating', 'wineName', 'numberOfBottles']}/>,
      <WineList
        title="Mest samlet"
        wines={data.wineStatus.stats.mostCollected.map((wine) => {
          return {...wine, vintages: VintageList(wine.vintages)}
        })}
        fields={['numberOfBottles', 'wineName', 'vintages']}/>,
      <WineList
        title="Nyeste viner"
        wines={data.wineStatus.stats.mostRecentlyScanned}
        fields={['wineName', 'vintage', 'rating', 'numberOfBottles']}/>,
    ];

    setStatsView(statsViews[currentIndex]);
    const interval = setInterval(() => {
      setStatsView(statsViews[currentIndex++ % statsViews.length]);
    }, toMillis(25, 'seconds'));

    return () => { clearInterval(interval) };
  }, [response, currentIndex]);


  const needsSync = (response?.data?.wineStatus?.diff?.numberOfBottlesNeedSync ?? 0) > 0;

  return <LoaderWrapper response={response}>
    <div className={styles.wineView}>
      { needsSync && <LinkItem className={styles.syncLink} emoji="🥂" text="Synk" to="/wine_sync" /> }
      { response?.data && StatsView }
    </div>
  </LoaderWrapper>;
};
