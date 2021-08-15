import ComponentHTMLElement from '@components/ComponentHTMLElement'
import '@components/covid-counter-item/covid-counter-item'
import '@components/covid-counter/covid-counter.css'
import dateToString from '@utils/dateToString'

class CovidCounter extends ComponentHTMLElement {
  set counterData (counterData) {
    this._counterData = counterData
  }

  get counterData () {
    return this._counterData
  }

  rootElement () {
    const rootElement = document.createElement('div')
    rootElement.classList.add('container')
    return rootElement
  }

  covidCounterItemElement () {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row', 'text-center')
    const keyToShow = ['confirmed', 'recovered', 'deaths']
    // eslint-disable-next-line array-callback-return
    keyToShow.map((key, index) => {
      const covidCounterItem = document.createElement('covid-counter-item')
      covidCounterItem.classList.add('col-12', 'col-md-4', 'my-2')
      if (index + 1 !== keyToShow.length) covidCounterItem.classList.add('line')
      covidCounterItem.setAttribute('data-aos', 'fade-down')
      const itemData = {
        value: this._counterData?.[key].value ?? 0,
        type: key
      }
      covidCounterItem.itemData = itemData
      covidCounterItem.errorMessage = this._errorMessage
      covidCounterItem.loading = this._loading
      rowElement.appendChild(covidCounterItem)
    })
    return rowElement
  }

  informationElement () {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row')
    rowElement.innerHTML = `
      <div class="col-12 information" data-aos="fade-up">
        <p>Last Update: ${dateToString(this._counterData?.lastUpdate)}</p>
        <p>Data Source: <a href="https://github.com/mathdroid/covid-19-api" target="_blank"
                rel="noreferrer">Covid-19 Statistic</a></p>
      </div>
    `
    return rowElement
  }

  errorElement () {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row')
    rowElement.innerHTML = `
      <div class="col-12 mt-3 text-center" data-aos="fade-up">
        <p>${this._errorMessage}</p>
      </div>
    `
    return rowElement
  }

  render () {
    this.innerHTML = ''
    const rootElement = this.rootElement()
    rootElement.appendChild(this.covidCounterItemElement())
    if (this._errorMessage) {
      rootElement.appendChild(this.errorElement())
    }
    if (!this._loading && !this._errorMessage) {
      rootElement.appendChild(this.informationElement())
    }
    this.appendChild(rootElement)
  }
}

customElements.define('covid-counter', CovidCounter)
