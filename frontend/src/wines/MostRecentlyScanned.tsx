import { MostRecentlyScanned as MostRecentlyScannedRes } from './types';
import React from 'react';

export function MostRecentlyScanned(props: { wines: MostRecentlyScannedRes[] }) {
  const {wines} = props;
  if (wines.length === 0) return null;

  return <>
    <h3>Nyeste viner</h3>
    <ul>
      {wines.map((wine, index) => <li key={index}>{wine.wineName}</li> )}
    </ul>
  </>
}
