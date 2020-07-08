import { useApi } from '../utils/useApis';
import React from 'react';
import { Measurement, NetatmoResponse } from './types';
import { GridRow } from '../number-grid/GridRow';
import { GridRowEntry } from '../number-grid/GridRowEntry';

const renderMeasurement = (name: string, measurement: Measurement) => {
  return <GridRow heading={name}>
    <GridRowEntry fieldName="Luftfuktighet">{measurement.humidity}%</GridRowEntry>
    <GridRowEntry fieldName="Temp">{measurement.temperature}°c</GridRowEntry>
  </GridRow>;
};

export const NetatmoView = () => {
  const [isLoading, data] = useApi<NetatmoResponse>('http://localhost:5000/temperature', [30, 'minutes']);

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
