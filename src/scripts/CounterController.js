import '@components/covid-counter/covid-counter'

const CounterController = (id, element, fetchFunction) => {
  let counterElement = null
  if (id) counterElement = document.querySelector(`covid-counter#${id}`)
  else if (element) counterElement = element
  else throw new Error('You have to insert either id or element of covid-counter')

  counterElement.render()

  const renderCovidChart = (data) => {
    counterElement.errorMessage = ''
    counterElement.counterData = data
    counterElement.loading = false
  }
  const fallbackCovidChart = (error) => {
    counterElement.errorMessage = error
    counterElement.loading = false
  }

  const showCovidChart = async () => {
    try {
      const covidChart = await fetchFunction
      renderCovidChart(covidChart)
    } catch (error) {
      fallbackCovidChart(error.message)
    }
  }
  showCovidChart()
}

export default CounterController
