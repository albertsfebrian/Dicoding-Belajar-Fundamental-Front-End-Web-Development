import SectionHTMLElement from '@components/SectionHTMLElement'
import '@components/country-section/country-section.css'
import '@components/covid-counter/covid-counter'
import autocomplete from 'autocompleter'

class CountrySection extends SectionHTMLElement {
  connectedCallback () {
    this._showCounter = false
    this.render()
  }

  constructor () {
    super()
    this._id = `input-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`
  }

  set clickEvent (event) {
    this._clickEvent = event
    this.render()
  }

  get clickEvent () {
    return this._clickEvent
  }

  get inputValue () {
    return this.querySelector(`#${this._id}`).value
  }

  set autoCompleteData (data) {
    this._autoCompleteData = data
  }

  get autoCompleteData () {
    return this._autoCompleteData
  }

  set counterElement (element) {
    this._counterElement = element
  }

  get counterElement () {
    return this._counterElement
  }

  set showCounter (showCounter) {
    this._showCounter = showCounter
    this.renderCounter()
  }

  get showCounter () {
    return this._showCounter
  }

  contentElement () {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row')
    const colElement = document.createElement('div')
    colElement.classList.add('col-12', 'col-md-6', 'offset-md-3', 'col-lg-4', 'offset-lg-4', 'my-4')
    colElement.setAttribute('data-aos', 'fade-down')
    colElement.appendChild(this.searchFieldElement())
    rowElement.appendChild(colElement)
    return rowElement
  }

  initAutoComplete (inputElement) {
    const data = this._autoCompleteData
    const clickEvent = this._clickEvent
    autocomplete({
      input: inputElement,
      showOnFocus: true,
      minLength: 1,
      emptyMsg: 'No countries found',
      fetch: function (text, update) {
        text = text.toLowerCase()
        const suggestions = data.filter(n => n.toLowerCase().includes(text))
        update(suggestions)
      },
      render: function (item, currentValue) {
        const div = document.createElement('div')
        if (currentValue.match(/^[a-zA-Z\s]+$/)) {
          const regex = new RegExp(currentValue, 'gi')
          const label = item.replaceAll(regex, (match) => `<b>${match}</b>`)
          div.innerHTML = label
        } else {
          div.textContent = item
        }
        return div
      },
      onSelect: function (item, input) {
        input.value = item
        clickEvent()
      }
    })
  }

  searchFieldElement () {
    const inputGroup = document.createElement('div')
    inputGroup.classList.add('input-group', 'mb-3')
    const inputField = document.createElement('input')
    inputField.classList.add('form-control')
    inputField.setAttribute('type', 'text')
    inputField.setAttribute('id', this._id)
    inputField.setAttribute('placeholder', 'Search Country')
    if (this._autoCompleteData) this.initAutoComplete(inputField)
    inputGroup.appendChild(inputField)

    const inputGroupAppend = document.createElement('div')
    inputGroupAppend.classList.add('input-group-append')
    const buttonElement = document.createElement('button')
    buttonElement.classList.add('btn', 'btn-primary')
    buttonElement.setAttribute('type', 'button')
    buttonElement.addEventListener('click', this.clickEvent)
    buttonElement.innerText = 'Search'
    inputGroupAppend.appendChild(buttonElement)
    inputGroup.appendChild(inputGroupAppend)

    return inputGroup
  }

  covidCounterElement () {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row')
    const covidCounterElement = document.createElement('covid-counter')
    this.counterElement = covidCounterElement
    covidCounterElement.classList.add('col-12', 'my-3')
    covidCounterElement.render()
    rowElement.appendChild(covidCounterElement)
    return rowElement
  }

  renderCounter () {
    if (!this._showCounter) {
      if (!this._covidCounterElement) return
      this._rootElement.removeChild(this._covidCounterElement)
      return
    }
    if (!this._covidCounterElement) {
      this._covidCounterElement = this.covidCounterElement()
      this._rootElement.appendChild(this._covidCounterElement)
    }
  }

  render () {
    this.innerHTML = ''
    const data = {
      title: 'How is the conditions in your country?',
      content: 'Find out about the number of people infected, recovered, and died from COVID-19 cases in your country. And make sure you are always updated on COVID-19 information to protect yourself and others from this disease.'
    }
    const rootElement = this.rootElement()
    this._rootElement = rootElement
    const headerElement = this.headerElement()
    headerElement.innerHTML = `
      <h1 data-aos="zoom-in">${data.title}</h1>
      <p data-aos="fade-down" class="width-content">${data.content}</p>
    `
    rootElement.appendChild(headerElement)
    rootElement.appendChild(this.contentElement())
    this.appendChild(rootElement)
  }
}

customElements.define('country-section', CountrySection)
