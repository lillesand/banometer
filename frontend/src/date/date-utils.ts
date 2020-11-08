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
