import React from 'react';
import { useApi } from '../useApi/useApi';
import { RealtimeResponse } from './types';
import { GridRowEntry } from '../number-grid/GridRowEntry';
import { GridRow } from '../number-grid/GridRow';
import { toMillis } from '../utils/time';
import { LoaderWrapper } from '../useApi/LoaderWrapper';

interface Quay {
  id: string;
  minTime?: number,
  maxDepartures?: number;
  name: string;
  lines: string[];
  destination?: string[];
}

interface OwnProps {
  stopIds: string[];
  quays: Quay[];
}

function hourPrint(waitingTimeInMinutes: number) {
  if (waitingTimeInMinutes > 60) {
    const minuteString = `${waitingTimeInMinutes % 60}`.padStart(2, "0");
    return `${Math.floor(waitingTimeInMinutes / 60)}:${minuteString}`;
  } else {
    return waitingTimeInMinutes;
  }

}

export const RealtimeView = (props: OwnProps) => {
  const response = useApi<RealtimeResponse>(`/realtime?stopId=${props.stopIds.join(",")}&lines=${props.quays.map(quay => quay.lines).join(",")}`,
    toMillis(1, 'minutes'));

  return <LoaderWrapper response={response}>
    {
      response?.data && props.quays.map(quay =>
        <GridRow heading={quay.name} key={'gridrow-' + quay.id}>
          {
            response!.data!.departures
              .filter(departure => departure.quayId === quay.id)
              .filter(departure => !quay.minTime || departure.waitingTimeInMinutes >= quay.minTime)
              .filter(departure => !quay.destination || quay.destination.includes(departure.destinationName))
              .filter(departure => !quay.lines || quay.lines.includes(departure.lineId))
              .splice(0, quay.maxDepartures)
              .map(departure =>
                <GridRowEntry key={"gridrowentry-" + quay.id + departure.lineId + departure.expectedDepartureTime}
                              fieldName={departure.destinationName}>
                  {departure.waitingTimeInMinutes <= 60 ? departure.waitingTimeInMinutes : hourPrint(departure.waitingTimeInMinutes)}
                </GridRowEntry>
              )
          }
        </GridRow>)
    }
  </LoaderWrapper>

};
