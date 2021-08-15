import ComponentHTMLElement from '@components/ComponentHTMLElement'
import { CountUp } from 'countup.js'
import numberSeparator from '@utils/numberSeparator'
import capitalize from '@utils/capitalize'
import '@components/covid-counter-item/covid-counter-item.css'

class CovidCounterItem extends ComponentHTMLElement {
  set itemData (itemData) {
    this._itemData = itemData
  }

  get itemData () {
    return this._itemData
  }

  animationText () {
    const valueElement = document.createElement('h2')
    valueElement.classList.add(`text-${this._itemData?.type}`)
    const valueAnimation = new CountUp(valueElement, this._itemData?.value, { duration: 3 })
    if (!valueAnimation.error) {
      valueAnimation.start()
    } else {
      valueElement.innerText = numberSeparator(this._itemData)
    }
    return valueElement
  }

  errorText () {
    const valueElement = document.createElement('h2')
    valueElement.classList.add(`text-${this._itemData?.type}`)
    valueElement.innerText = '--'
    return valueElement
  }

  loader () {
    const spinner = document.createElement('div')
    spinner.classList.add('spinner-border', `text-${this._itemData?.type}`)
    return spinner
  }

  contentElement () {
    const contentElement = document.createElement('div')
    if (this._loading) {
      contentElement.appendChild(this.loader())
    } else if (this._errorMessage) {
      contentElement.appendChild(this.errorText())
    } else {
      contentElement.appendChild(this.animationText())
    }
    const spanElement = document.createElement('div')
    spanElement.innerText = capitalize(this._itemData?.type)
    contentElement.appendChild(spanElement)
    return contentElement
  }

  render () {
    this.innerHTML = ''
    this.appendChild(this.contentElement())
  }
}

customElements.define('covid-counter-item', CovidCounterItem)
