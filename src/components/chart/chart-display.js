import Chart from 'chart.js/auto'

class ChartDisplay extends HTMLElement {
  set chartConfig (chartConfig) {
    this._chartConfig = chartConfig
  }

  get chartConfig () {
    return this._chartConfig
  }

  render () {
    this.innerHTML = ''
    if (this._chartConfig) {
      const ctx = document.createElement('canvas')
      this.appendChild(ctx)
      // eslint-disable-next-line no-new
      new Chart(ctx, this._chartConfig)
    }
  }
}

customElements.define('chart-display', ChartDisplay)
