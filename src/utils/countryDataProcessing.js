const countryDataProcessing = (rawData) => {
  // eslint-disable-next-line prefer-const
  let returnData = []
  // eslint-disable-next-line array-callback-return
  rawData.map(data => {
    returnData.push(data.name)
  })
  return returnData
}

export default countryDataProcessing
