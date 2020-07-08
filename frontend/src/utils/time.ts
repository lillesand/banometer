type TemporalUnit = 'seconds' | 'minutes' | 'hours';
export type Time = [number, TemporalUnit];

const toMillis = (time: Time) => {
  const units = time[0];
  const temporalUnit = time[1];
  switch (temporalUnit) {
    case 'seconds': return units * 1000;
    case 'minutes': return units * 60 * 1000;
    case 'hours': return units * 60 * 60 * 1000;
  }
};

export {
  toMillis
}
