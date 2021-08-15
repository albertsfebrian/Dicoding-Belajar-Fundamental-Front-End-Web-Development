const numberSeparator = (number = 0, separator = ',') => {
  const regex = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return number.toString().replace(regex, separator)
}

export default numberSeparator
