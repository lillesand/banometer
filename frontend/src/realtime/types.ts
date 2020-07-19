export interface Departure {
  destinationName: string;
  lineId: string;
  localLineId: string;
  lineName: string;
  quayId: string;
  expectedDepartureTime: number;
  waitingTimeInMinutes: number;
}

export interface RealtimeResponse {
  departures: Departure[];
}
