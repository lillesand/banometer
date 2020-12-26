import { useApi } from '../useApi/useApi';
import React from 'react';
import { Measurement, NetatmoResponse } from './types';
import { GridRow } from '../number-grid/GridRow';
import { GridRowEntry } from '../number-grid/GridRowEntry';
import { toMillis } from '../utils/time';
import { LoaderWrapper } from '../useApi/LoaderWrapper';

const renderMeasurement = (measurement: Measurement) => {
  return <GridRow heading={measurement.name} key={`measurement-${measurement.name}`}>
    <GridRowEntry fieldName="Luftfuktighet">{measurement.humidity}%</GridRowEntry>
    <GridRowEntry fieldName="Temp">{measurement.temperature}°c</GridRowEntry>
  </GridRow>;
};

export const NetatmoView = () => {
  const response = useApi<NetatmoResponse>('/temperature', toMillis(30, 'minutes'));

  const data = response.data;

  return <LoaderWrapper response={response}>
    <div className="temperature number-grid">
      {
        data?.sensors?.map(renderMeasurement)
      }
    </div>
  </LoaderWrapper>
};
