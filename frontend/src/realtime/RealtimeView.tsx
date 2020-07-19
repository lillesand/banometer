import React from 'react';
import { useApi } from '../utils/useApis';
import { RealtimeResponse } from './types';
import { GridRowEntry } from '../number-grid/GridRowEntry';
import { GridRow } from '../number-grid/GridRow';

interface Quay {
  id: string;
  minTime?: number,
  maxDepartures?: number;
  name: string;
  lines?: string[]
}

interface OwnProps {
  stopIds: string[];
  quays: Quay[];
}

export const RealtimeView = (props: OwnProps) => {
  const [isLoading, response] = useApi<RealtimeResponse>(`/realtime?stopId=${props.stopIds.join(",")}`);

  if (!response?.data) {
    return <div>"Laddar…"</div>
  }

  return <>
    {
      props.quays.map(quay =>
        <GridRow heading={quay.name}>
          {
            response!.data!.departures
              .filter(response => response.quayId === quay.id)
              .map(departure =>
                <GridRowEntry fieldName={departure.destinationName}>{departure.waitingTimeInMinutes}</GridRowEntry>
              )
          }
        </GridRow>)
    }
  </>

};
