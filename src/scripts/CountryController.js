import FetchData from '@scripts/FetchData'
import '@components/country-section/country-section'
import countryDataProcessing from '@utils/countryDataProcessing'
import CounterController from '@scripts/CounterController'

const CountryController = (fetchFunction) => {
  // eslint-disable-next-line no-unused-vars
  let memoCountryList = null
  const countryElement = document.querySelector('country-section')
  countryElement.render()

  const onClickHandler = () => {
    countryElement.showCounter = true
    const country = countryElement.inputValue.trim()
    CounterController(null, countryElement.counterElement, FetchData.getCovidInCountry(country))
  }
  countryElement.clickEvent = onClickHandler

  const renderCountryList = (countryList) => {
    memoCountryList = countryList
    countryElement.autoCompleteData = countryList
    countryElement.render()
  }

  const fetchCountryList = async () => {
    try {
      const data = await FetchData.getCountryList()
      const countryList = await countryDataProcessing(data?.countries)
      renderCountryList(countryList)
    } catch (error) {
      // do nothing (not render the recomendation in input field)
    }
  }
  fetchCountryList()
}

export default CountryController
