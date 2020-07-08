import { MostRecentlyScanned as MostRecentlyScannedRes } from './types';
import React from 'react';

export function MostRecentlyScanned(props: { wines: MostRecentlyScannedRes[] }) {
  const {wines} = props;
  if (wines.length === 0) return null;


  return <>
    <h3>Nyeste viner</h3>
    <table className="wine-table">
      <thead>
      <tr>
        <td>Vin</td>
        <td>Poeng</td>
        <td>Antall</td>
      </tr>
      </thead>
      <tbody>
      {wines.map((wine, index) =>
        <tr key={index}>
          <td>{wine.wineName}</td>
          <td className="number-column">{wine.rating}</td>
          <td className="number-column">{wine.numberOfBottles}</td>
        </tr>
      )}
      </tbody>
    </table>
  </>;
}
