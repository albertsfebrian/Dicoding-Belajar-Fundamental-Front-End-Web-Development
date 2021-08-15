import BasicHTMLElement from '@components/BasicHTMLElement'

class ComponentHTMLElement extends BasicHTMLElement {
  constructor () {
    super()
    this._loading = true
    this._errorMessage = ''
  }

  set loading (loading) {
    this._loading = loading
    this.render()
  }

  get loading () {
    return this._loading
  }

  set errorMessage (errorMessage) {
    this._errorMessage = errorMessage
  }

  get errorMessage () {
    return this._errorMessage
  }
}

export default ComponentHTMLElement
