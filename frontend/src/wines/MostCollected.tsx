import { MostCollected as MostCollectedRes } from './types';
import { pluralize } from '../utils/strings';
import React from 'react';

export function MostCollected(props: { wines: MostCollectedRes[] }) {
  const {wines} = props;
  if (wines.length === 0) return null;

  return <>
    <h3>Mest samlet</h3>
    <ul>
      {wines.map((wine, index) =>
        <li key={index}>{wine.numberOfBottles} {pluralize(wine.numberOfBottles, 'flaske', 'flasker')} - {wine.wineName} ({wine.vintages})</li>
      )}
    </ul>
  </>
}
