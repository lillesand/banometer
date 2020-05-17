import { HighestRated as HighestRatedRes } from './types';
import { pluralize } from '../utils/strings';
import React from 'react';

export function HighestRated(props: { wines: HighestRatedRes[] }) {
  const {wines} = props;
  if (wines.length === 0) return null;

  return <>
    <h3>Best rangering</h3>
    <ul>
      {wines.map((wine, index) =>
        <li key={index}>{wine.rating} - {wine.wineName} ({wine.numberOfBottles} {pluralize(wine.numberOfBottles, 'flaske', 'flasker')})</li>
      )}
    </ul>
  </>
}
