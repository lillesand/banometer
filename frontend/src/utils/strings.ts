const pluralize = (number: number, singular: string, plural: string) =>
  number === 1 ? singular : plural;

export {
  pluralize
}
