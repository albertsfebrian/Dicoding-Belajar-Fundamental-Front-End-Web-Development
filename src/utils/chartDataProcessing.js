const chartDataProcessing = (rawData, range = 'all', options = { confirmed: true, deaths: true, recovered: true }) => {
  let index = 0
  // eslint-disable-next-line prefer-const
  let returnData = { confirmed: [], deaths: [], recovered: [], reportDate: [] }
  if (range !== 'all') {
    index = rawData.length - range
  }
  for (; index < rawData.length; index++) {
    const data = rawData[index]
    if (data) {
      returnData.confirmed.push(data.confirmed.total)
      returnData.deaths.push(data.deaths.total)
      returnData.recovered.push(data.recovered.total)
      returnData.reportDate.push(data.reportDate)
    }
  }
  return returnData
}

export default chartDataProcessing
