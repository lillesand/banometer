export interface Measurement {
  name: string;
  temperature: number;
  humidity: number;
}

export interface NetatmoResponse {
  sensors: Measurement[];
}
