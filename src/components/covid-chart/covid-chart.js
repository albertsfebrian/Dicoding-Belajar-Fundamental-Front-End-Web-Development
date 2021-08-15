import ComponentHTMLElement from '@components/ComponentHTMLElement'
import '@components/chart/chart-display'

class CovidChart extends ComponentHTMLElement {
  connectedCallback () {
    this.render()
  }

  constructor () {
    super()
    this._id = `select-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`
  }

  set changeEvent (event) {
    this._changeEvent = event
    this.render()
  }

  get changeEvent () {
    return this._changeEvent
  }

  get selectedValue () {
    return this.querySelector(`#${this._id}`).value
  }

  set chartData (chartData) {
    this._chartData = chartData
  }

  get chartData () {
    return this._chartData
  }

  rootElement () {
    const rootElement = document.createElement('div')
    rootElement.classList.add('container', 'my-4')
    return rootElement
  }

  contentElement () {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row')
    const colElement = document.createElement('div')
    colElement.classList.add('col-12', 'col-md-8', 'offset-md-2')
    colElement.setAttribute('data-aos', 'fade-down')
    colElement.appendChild(this.optionElement())
    colElement.appendChild(this.chartElement())
    rowElement.appendChild(colElement)
    return rowElement
  }

  optionElement () {
    const divElement = document.createElement('div')
    divElement.classList.add('mb-3')
    const selectElement = document.createElement('select')
    selectElement.setAttribute('id', this._id)
    selectElement.innerHTML = `
        <option selected value="all">All Time</option>
        <option value="7">Last 7 day</option>
        <option value="30">Last 30 day</option>
    `
    selectElement.addEventListener('change', this._changeEvent)
    divElement.appendChild(selectElement)
    const spanElement = document.createElement('span')
    spanElement.classList.add('mx-2')
    spanElement.innerText = 'from reported data'
    divElement.appendChild(spanElement)
    return divElement
  }

  initChartConfig () {
    const data = {
      labels: this._chartData?.reportDate,
      datasets: [
        {
          label: 'Infected',
          data: this._chartData?.confirmed,
          backgroundColor: '#ffa500',
          borderColor: '#ffa500'
        },
        {
          label: 'Recovered',
          data: this._chartData?.recovered,
          backgroundColor: '#008000',
          borderColor: '#008000'
        },
        {
          label: 'Deaths',
          data: this._chartData?.deaths,
          backgroundColor: '#ff0000',
          borderColor: '#ff0000'
        }
      ]
    }
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
    this._chartConfig = { type: 'line', data: data, options: options }
  }

  chartElement () {
    const chartElement = document.createElement('chart-display')
    this._chartElement = chartElement
    return chartElement
  }

  renderChart () {
    this.initChartConfig()
    this._chartElement.chartConfig = this._chartConfig
    this._chartElement.render()
  }

  loader () {
    const divElement = document.createElement('div')
    divElement.setAttribute('data-aos', 'fade-down')
    divElement.classList.add('text-center', 'py-4')
    const spinner = document.createElement('div')
    spinner.classList.add('spinner-border')
    divElement.appendChild(spinner)
    const pElement = document.createElement('p')
    // pElement.classList.add('fs-5')
    pElement.innerText = 'Please wait, Preparing Covid Chart'
    divElement.appendChild(pElement)
    return divElement
  }

  render () {
    this.innerHTML = ''
    const rootElement = this.rootElement()
    if (this._loading) {
      rootElement.appendChild(this.loader())
      this.appendChild(rootElement)
    } else if (!this._errorMessage) {
      rootElement.appendChild(this.contentElement())
      this.appendChild(rootElement)
      this.renderChart()
    }
  }
}

customElements.define('covid-chart', CovidChart)
