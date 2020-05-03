import React from 'react';
import { useEffect, useState } from 'react';
import { HighestRated as HighestRatedRes, WinesResponse } from './types';
import { pluralize } from '../utils/strings';

function WineView() {

  const [ wines, setWines ] = useState<WinesResponse | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    console.log('called');
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

  console.log("Rendering", wines, isLoading);
  return <div>
    {isLoading && <p>laddar…</p>}
    {wines && <>
      <h3>Best rangering</h3>
      <HighestRated wines={wines?.wineStatus.stats.highestRated}/>
    </>
    }
  </div>
}

function HighestRated(props: {wines: HighestRatedRes[]}) {
  const {wines} = props;
  if (wines.length == 0) return null;

  return <ul>
    {wines.map(wine =>
      <li>{wine.rating} - {wine.wineName} ({wine.numberOfBottles} {pluralize(wine.numberOfBottles, "flaske", "flasker")})</li>
    )}
  </ul>
}

export default WineView;
