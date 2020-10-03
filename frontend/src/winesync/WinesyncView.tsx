import React from 'react';
import { useApi } from '../useApi/useApi';
import { toMillis } from '../utils/time';
import { Diff, WinesResponse } from '../wines/types';
import { WineList } from '../winelist/WineList';
import { LoaderWrapper } from '../useApi/LoaderWrapper';

const View = (props: { diff: Diff } ) => {
  const diff = props.diff;
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

export const Winesync = () => {
  const response = useApi<WinesResponse>('/wine_status', toMillis(30, 'minutes'));

  const diff = response?.data?.wineStatus.diff;
  return <LoaderWrapper response={response}>
    {diff &&  <View diff={diff} /> }
  </LoaderWrapper>
};
