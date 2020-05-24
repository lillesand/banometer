export interface SensorData {
  sensorName: string;
  temperature: number;
  humidity: number;
}

export interface SensorPair {
  indoor: SensorData;
  outdoor?: SensorData;
}
