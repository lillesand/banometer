import React from 'react';
import { useApi } from '../useApi/useApi';
import { toMillis } from '../utils/time';
import { WinesResponse } from '../wines/types';
import { WineList } from '../winelisting/WineListingView';

export const Winesync = () => {
  const [ isLoading, response ] = useApi<WinesResponse>('/wine_status', toMillis(30, 'minutes'));

  if (isLoading) {
    return <div>'laddar yo'</div>;
  }

  if (!response || !response.data || response.failed) {
    return <div>Noe feila :(</div>;
  }

  const diff = response.data.wineStatus.diff;
  if (diff.numberOfBottlesNeedSync > 0) {
    return <>
      <WineList
        title={`Nyinnkjøpte viner (${diff.newWines.length} viner)`}
        wines={diff.newWines}
        fields={['wineName', 'numberOfBottles', 'rating']}
      />

      <WineList
        title={`Endret antall (${diff.changedAmount.length} viner)`}
        wines={diff.changedAmount.map(wine => {
          return {...wine, numberOfBottles: `${wine.oldAmount} → ${wine.newAmount}`}
        })}
        fields={['wineName', 'numberOfBottles']}
      />
    </>
  } else {
    return <div>Alt er i synk <span role="img" aria-label="innocent">👼</span></div>
  }

};
