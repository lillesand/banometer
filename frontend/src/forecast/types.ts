export interface Forecast {
  instant: Date;
  dayString: string;
  time: string;
  temperature: number;
  precipiation: number;
  windFromDirection: number;
  windFromDirectionWord: string;
  windSpeed: number;
  symbol: string;
}

export interface ForecastResponse {
  forecast: Forecast[];
}
