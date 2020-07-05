export interface Measurement {
  sensorName: string;
  temperature: number;
  humidity: number;
}

export interface SensorPair {
  indoor?: Measurement;
  outdoor?: Measurement;
}

export interface NetatmoResponse {
  nydalen?: SensorPair;
  ski?: SensorPair;
}
