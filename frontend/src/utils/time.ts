import { pluralize } from './strings';

type TemporalUnit = 'seconds' | 'minutes' | 'hours';
export type Time = [number, TemporalUnit];

const millis = 1000;
const seconds = 60;
const minutes = 60;
const hours = 24;
const toMillis = (amount: number, temporalUnit: TemporalUnit) => {
  switch (temporalUnit) {
    case 'seconds': return amount * millis;
    case 'minutes': return amount * seconds * millis;
    case 'hours': return amount * minutes * seconds * millis;
  }
};


const roundedInterval = (from: Date, to: Date) => {
  const intervalMs = Math.abs(to.getTime() - from.getTime());
  const wholeSeconds = Math.floor(intervalMs / millis);
  const wholeMinutes = Math.floor(wholeSeconds / seconds);
  const wholeHours = Math.floor(wholeMinutes / minutes);
  const wholeDays = Math.floor(wholeHours / hours);

  if (wholeDays !== 0) {
    return `${wholeDays} ${pluralize(wholeDays, 'dag', 'dager')}`
  }

  if (wholeHours !== 0) {
    return `${wholeHours} ${pluralize(wholeDays, 'time', 'timer')}`
  }

  if (wholeMinutes !== 0) {
    return `${wholeMinutes} ${pluralize(wholeDays, 'minutt', 'minutter')}`
  }

  if (wholeSeconds !== 0) {
    return `${wholeSeconds} ${pluralize(wholeDays, 'sekund', 'sekunder')}`
  }

  return 'kort tid';
};

export {
  toMillis, roundedInterval
}
