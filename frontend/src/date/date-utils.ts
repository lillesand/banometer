// Okay, this blows a bit… but whatever works: https://stackoverflow.com/questions/25050034/get-iso-8601-using-intl-datetimeformat
const ISO_DATETIME_FORMAT = Intl.DateTimeFormat('sv-SE');

export const lastWeek = () => {
  const today = new Date();
  return ['I dag', 'I går', 'I forigårs', '{day}', '{day}', '{day}', '{day}'].map((day, index) => {
    const date = new Date().setDate(today.getDate() - index);
    const weekday = Intl.DateTimeFormat('no', { weekday: 'short'}).format(date).slice(0, -1);
    const shortDate = Intl.DateTimeFormat('no', { day: 'numeric', month: 'numeric'}).format(date).slice(0, -1);
    return [day.replace('{day}', weekday + ' ' + shortDate), ISO_DATETIME_FORMAT.format(date)]
  });
};

export const prettyDate = (isoDate: string) => {
  const today = Date.now();
  const date = Date.parse(isoDate);
  const daysBetween = Math.trunc((today - date) / (1000 * 60 * 60 * 24));

  if (daysBetween < 0) {
    throw new Error('We only support past dates 🤷‍♂️');
  }

  const words = ['I dag', 'I går', 'I forigårs'][daysBetween];
  if (words) {
    return words;
  }

  if (daysBetween < 8) {
    return daysBetween + ' dager siden';
  }

  return Intl.DateTimeFormat('no', { day: 'numeric', month: 'short'}).format(date).slice(0, -1);
};
