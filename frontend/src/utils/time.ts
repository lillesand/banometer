const toMillis = (units: number, type: 'seconds' | 'minutes' | 'hours') => {
  switch (type) {
    case 'seconds': return units * 1000;
    case 'minutes': return units * 60 * 1000;
    case 'hours': return units * 60 * 60 * 1000;
  }
};

export {
  toMillis
}
