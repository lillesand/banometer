import { MostCollected as MostCollectedRes } from './types';
import React from 'react';

export function MostCollected(props: { wines: MostCollectedRes[] }) {
  const {wines} = props;
  if (wines.length === 0) return null;

  return <>
    <h3>Mest samlet</h3>
    <table className="wine-table">
      <thead>
        <tr>
          <td>Antall</td>
          <td>Vin</td>
          <td>Årgang</td>
        </tr>
      </thead>
      <tbody>
        {wines.map((wine, index) =>
          <tr key={index}>
            <td className="number-column">{wine.numberOfBottles}</td>
            <td>{wine.wineName}</td>
            <td><ul className="vintages">{wine.vintages.reverse().map((vintage) => <li>{vintage}</li>)}</ul></td>
          </tr>
        )}
      </tbody>
    </table>
  </>;
}
