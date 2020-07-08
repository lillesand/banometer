import { HighestRated as HighestRatedRes } from './types';
import { pluralize } from '../utils/strings';
import React from 'react';

export function HighestRated(props: { wines: HighestRatedRes[] }) {
  const {wines} = props;
  if (wines.length === 0) return null;

  return <>
    <h3>Høyest rangering på Vivino</h3>
    <table className="wine-table">
      <thead>
      <tr>
        <td>Poeng</td>
        <td>Vin</td>
        <td>Antall</td>
      </tr>
      </thead>
      <tbody>
      {wines.map((wine, index) =>
        <tr key={index}>
          <td>{wine.rating}</td>
          <td>{wine.wineName}</td>
          <td className="number-column">{wine.numberOfBottles}</td>
        </tr>
      )}
      </tbody>
    </table>
  </>;


  return <>
    <h3>Best rangering</h3>
    <ul>
      {wines.map((wine, index) =>
        <li key={index}>{wine.rating} - {wine.wineName} ({wine.numberOfBottles} {pluralize(wine.numberOfBottles, 'flaske', 'flasker')})</li>
      )}
    </ul>
  </>
}
