import BasicHTMLElement from '@components/BasicHTMLElement'

class SectionHTMLElement extends BasicHTMLElement {
  rootElement () {
    const rootElement = document.createElement('div')
    rootElement.classList.add('container')
    return rootElement
  }

  headerElement () {
    const headerElement = document.createElement('div')
    headerElement.classList.add('text-center')
    return headerElement
  }
}

export default SectionHTMLElement
