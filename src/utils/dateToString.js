const dateToString = (date, locales = 'en-GB') => {
  return new Date(date).toLocaleDateString(locales)
}

export default dateToString
