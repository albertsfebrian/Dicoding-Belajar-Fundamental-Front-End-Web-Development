import FetchData from '@scripts/FetchData'
import '@components/covid-chart/covid-chart'
import chartDataProcessing from '@utils/chartDataProcessing'

const ChartController = () => {
  let memoCovidData = null
  const covidChart = document.querySelector('covid-chart')
  covidChart.render()

  const onChangeHandler = () => {
    const chartData = chartDataProcessing(memoCovidData, covidChart.selectedValue)
    covidChart.chartData = chartData
    covidChart.renderChart()
  }
  covidChart.changeEvent = onChangeHandler

  const renderCovidChart = (data) => {
    covidChart.error = ''
    covidChart.chartData = data
    covidChart.loading = false
  }
  const fallbackCovidChart = (error) => {
    covidChart.errorMessage = error
    covidChart.loading = false
  }
  const showCovidChart = async () => {
    try {
      const covidChart = await FetchData.getCovidChart()
      memoCovidData = covidChart
      const chartData = chartDataProcessing(covidChart, covidChart.selectedValue)
      renderCovidChart(chartData)
    } catch (error) {
      fallbackCovidChart(error.message)
    }
  }
  showCovidChart()
}

export default ChartController
