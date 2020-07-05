import { useApi } from '../utils/useApis';
import React from 'react';
import '../grid/grid.scss';
import { Measurement, NetatmoResponse } from './types';

const renderMeasurement = (name: string, measurement: Measurement) => {
  return <>
    <h3 className="number-grid-row__heading">{name}</h3>
    <div className="number-grid-row__row">
      <div className="number-grid-row__entry">
        <span className="number-grid-row__number">{measurement.humidity}%</span>
        <span className="number-grid-row__detail">Luftfuktighet</span>
      </div>
      <div className="number-grid-row__entry">
        <span className="number-grid-row__number">{measurement.temperature}°c</span>
        <span className="number-grid-row__detail">Temp</span>
      </div>
    </div>
  </>;
};

export const NetatmoView = () => {
  const [isLoading, data] = useApi<NetatmoResponse>('http://localhost:5000/temperature');

  if (isLoading) {
    return <div>Laddar…</div>;
  }

  if (data?.failed) {
    return <div>Oh no, feilet :(</div>;
  }

  const response = data!.data;

  const nydalenIndoor = response?.nydalen?.indoor;
  const nydalenOutdoor = response?.nydalen?.outdoor;
  const wineCellar = response?.ski?.indoor;

  return <div className="temperature number-grid">
    { nydalenIndoor && renderMeasurement('Inne', nydalenIndoor) }
    { nydalenOutdoor && renderMeasurement('Ute', nydalenOutdoor) }
    { wineCellar && renderMeasurement('Vinkjeller', wineCellar) }
  </div>



};
