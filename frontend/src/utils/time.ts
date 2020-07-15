type TemporalUnit = 'seconds' | 'minutes' | 'hours';
export type Time = [number, TemporalUnit];

const toMillis = (amount: number, temporalUnit: TemporalUnit) => {
  switch (temporalUnit) {
    case 'seconds': return amount * 1000;
    case 'minutes': return amount * 60 * 1000;
    case 'hours': return amount * 60 * 60 * 1000;
  }
};

export {
  toMillis
}
