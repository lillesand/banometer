import { SensorPair} from './types';
import { useApi } from '../utils/useApis';
import React from 'react';
import '../grid/grid.scss';


export const NetatmoView = () => {
  const [isLoading, data] = useApi<SensorPair[]>('http://localhost:5000/temperature');

  if (isLoading) {
    return <div>Laddar…</div>;
  }

  if (data?.failed) {
    return <div>Oh no, feilet :(</div>;
  }

  const response = data!.response;
  return <div>
    { response?.map((sensorPair, index) =>
      <div className="sensorpair" key={index}>
        <h3 className="number-grid-row__heading">{sensorPair.indoor.sensorName}</h3>
        <div className="number-grid-row__row">
          <div className="number-grid-row__entry">
            <span className="number-grid-row__number">{sensorPair.indoor.humidity}%</span>
            <span className="number-grid-row__detail">Luftfuktighet</span>
          </div>
          <div className="number-grid-row__entry">
            <span className="number-grid-row__number">{sensorPair.indoor.temperature}°c</span>
            <span className="number-grid-row__detail">Inne</span>
          </div>
          {sensorPair.outdoor && <div className="number-grid-row__entry">
              <span className="number-grid-row__number">{sensorPair.outdoor.temperature}°c</span>
              <span className="number-grid-row__detail">Ute</span>
          </div>}
          {sensorPair.outdoor && <div className="number-grid-row__entry">
              <span className="number-grid-row__number">{sensorPair.outdoor?.humidity}%</span>
              <span className="number-grid-row__detail">Luftfuktighet ute</span>
          </div>}
        </div>
      </div>
    )}
  </div>

};
