import { useApi } from '../useApi/useApi';
import React from 'react';
import { Measurement, NetatmoResponse } from './types';
import { GridRow } from '../number-grid/GridRow';
import { GridRowEntry } from '../number-grid/GridRowEntry';
import { toMillis } from '../utils/time';
import { LoaderWrapper } from '../useApi/LoaderWrapper';

const renderMeasurement = (name: string, measurement: Measurement) => {
  return <GridRow heading={name}>
    <GridRowEntry fieldName="Luftfuktighet">{measurement.humidity}%</GridRowEntry>
    <GridRowEntry fieldName="Temp">{measurement.temperature}°c</GridRowEntry>
  </GridRow>;
};

export const NetatmoView = () => {
  const response = useApi<NetatmoResponse>('/temperature', toMillis(30, 'minutes'));

  const data = response.data;

  return <LoaderWrapper response={response}>
    <div className="temperature number-grid">
      { data?.nydalen?.indoor && renderMeasurement('Inne', data.nydalen?.indoor) }
      { data?.nydalen?.outdoor && renderMeasurement('Ute', data.nydalen?.outdoor) }
      { data?.ski?.indoor && renderMeasurement('Vinkjeller', data.ski?.indoor) }
    </div>
  </LoaderWrapper>
};
