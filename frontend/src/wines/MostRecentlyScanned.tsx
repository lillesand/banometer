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
          <td>{wine.displayName}</td>
          <td>{wine.rating}</td>
          <td>{wine.wineName}</td>
        </tr>
      )}
      </tbody>
    </table>
  </>


  return <>
    <h3>Nyeste viner</h3>
    <ul>
      {wines.map((wine, index) => <li key={index}>{wine.wineName}</li> )}
    </ul>
  </>
}
