import React from 'react';
import { useApi } from '../utils/useApis';
import { Forecast, ForecastResponse } from './types';
import groupBy from 'lodash.groupby';
import './forecast.scss'

const forecastRow = (forecast: Forecast, index: number) => {
    return <>
      { index === 0 &&
        <tr className="heading-row">
          <td colSpan={2} className="day-heading">{forecast.dayString}</td>
          <td>Temp</td>
          <td>Nedbør</td>
          <td colSpan={2}>Vind</td>
        </tr>
      }
      <tr key={forecast.instant + ''}>
        <td>
          <img className="weather-symbol" src={require(`./symbols/${forecast.symbol}.svg`)} alt={forecast.symbol}/>
        </td>
        <td>
          {forecast.time}
        </td>
        <td>
          {forecast.temperature}°c
        </td>
        <td>
          {forecast.precipiation}mm
        </td>
        <td>
          {forecast.windSpeed}m/s
        </td>
        <td>
          {forecast.windFromDirectionWord}
        </td>
      </tr>
    </>
};

export const ForecastView = () => {

  const [ isLoading, data ] = useApi<ForecastResponse>('http://localhost:5000/forecast');

  if (isLoading) {
    return null;
  }

  if (data?.failed || !data?.data) {
    return <div>Oh no, feilet :(</div>;
  }

  const forecastByDay = groupBy(data.data.forecast, 'dayString');

  return <div className="forecast">
    <table>
      <tbody>
      {Object.values(forecastByDay).map(forecastsForDay => forecastsForDay.map(forecastRow))}
      </tbody>
    </table>
  </div>;
};
