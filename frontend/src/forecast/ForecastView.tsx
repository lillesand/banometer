import React from 'react';
import { useApi } from '../useApi/useApi';
import { Forecast, ForecastResponse } from './types';
import { toMillis } from '../utils/time';
import groupBy from 'lodash.groupby';
import './forecast.scss'

const forecastRow = (forecast: Forecast, index: number) => {
  const rowIdentifier = forecast.dayString + '-' + forecast.time;
  const key = index === 0 ? rowIdentifier + '-with-header' : rowIdentifier; // We render the same date and time differently if it's the first element in the table.

  return <React.Fragment key={key}>
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
    </React.Fragment>
};

export const ForecastView = () => {

  const [ isLoading, data ] = useApi<ForecastResponse>('/forecast', toMillis(20, 'minutes'));

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
      {Object.entries(forecastByDay).map(([day, forecastsForDay]) =>
        <React.Fragment key={day}>
          {forecastsForDay.map(forecastRow)}
        </React.Fragment>
      )}
      </tbody>
    </table>
  </div>;
};
