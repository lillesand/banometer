import React, { useState } from 'react';
import { useApi } from '../useApi/useApi';
import { toMillis } from '../utils/time';
import { WinesResponse } from '../wines/types';
import { WineList } from '../winelist/WineList';
import { LoaderWrapper } from '../useApi/LoaderWrapper';
import { Button } from '../button/Button';
import styles from './WinesyncView.module.scss';
import { makeRequest } from '../http/makeRequest';


const update = (generatedId: string, setUpdating: (updating: boolean) => void) => {
  setUpdating(true);
  makeRequest(`/update_wines?generatedId=${generatedId}`, {method: 'post'})
    .then((res) => {
      if (res.ok) {
        alert('Oppdatert!');
        window.location.reload();
      } else {
        alert (`Oppdatering feilet (${res.status} 😢)`);
      }
    })
    .catch((e) => {
      console.log(e);
      alert('Oppdatering feilet 😢');
    })
    .finally(() => {
      setUpdating(false)
    });
};


const View = (props: { winesResponse: WinesResponse } ) => {
  const diff = props.winesResponse.wineStatus.diff;
  const generatedId = props.winesResponse.generatedId;
  const [ updating, setUpdating ] = useState<boolean>(false);

  if (diff.numberOfBottlesNeedSync > 0) {
    return <>
      {diff.newWines.length > 0 ?
        <WineList
          title={`Nyinnkjøpte viner (${diff.newWines.length} viner)`}
          wines={diff.newWines}
          fields={['wineName', 'numberOfBottles', 'rating']}
        />
        : 'Ingen nye viner!'
      }

      {
        diff.changedAmount.length > 0 ?
          <WineList
            title={`Endret antall (${diff.changedAmount.length} viner)`}
            wines={diff.changedAmount.map(wine => {
              return {...wine, numberOfBottles: `${wine.oldAmount} → ${wine.newAmount}`}
            })}
            fields={['wineName', 'numberOfBottles']}
          />
          : 'Ingen viner med endret antall'
      }

      <Button className={styles.wineSyncButton} onClick={() => {
        if (!updating) {
          update(generatedId, setUpdating)
        }
      }}>
        Kjør synk!
      </Button>
    </>
  } else {
    return <div>Alt er i synk <span role="img" aria-label="innocent">👼</span></div>
  }

};

export const Winesync = () => {
  const response = useApi<WinesResponse>('/wine_status', toMillis(30, 'minutes'));

  const winesResponse = response?.data;
  return <LoaderWrapper response={response}>
    { winesResponse && <View winesResponse={winesResponse} /> }
  </LoaderWrapper>
};
