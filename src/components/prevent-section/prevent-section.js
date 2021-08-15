import SectionHTMLElement from '@components/SectionHTMLElement'
import '@components/prevent-section/prevent-section.css'
import icon01 from '@public/01.png'
import icon02 from '@public/02.png'
import icon03 from '@public/03.png'
import icon04 from '@public/04.png'
import '@components/prevent-card/prevent-card'

class PreventSection extends SectionHTMLElement {
  cardElements (cards) {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row', 'text-center', 'mt-5')
    // eslint-disable-next-line array-callback-return
    cards.map(card => {
      const cardItem = document.createElement('prevent-card')
      cardItem.classList.add('col-12', 'col-md-6', 'col-lg-3', 'my-2')
      cardItem.setAttribute('data-aos', 'fade-down')
      cardItem.cardData = card
      cardItem.render()
      rowElement.appendChild(cardItem)
    })
    return rowElement
  }

  render () {
    this.innerHTML = ''
    const data = {
      title: 'How to protect myself and prevent the spread of disease?',
      content: 'Stay aware of the lastest information on the COVID-19 outbreak, available on the WHO website through your national and local public health authority. Many countries around the world have seen cases of COVID-19 and several have seen outbreaks.',
      cards: [
        {
          image: { src: icon01, alt: 'Wash Hand' },
          title: 'Clean hands frequently',
          content: 'Regularly and thoroughly clean your hands with an alcohol-based rub or wash them with soap and water.'
        },
        {
          image: { src: icon02, alt: 'Wear a Mask' },
          title: 'Wear a face mask',
          content: 'Everyone should wear a face cover when they have to go out in public. for example to the grocery store or to pick up other necessities.'
        },
        {
          image: { src: icon03, alt: 'Social Distancing' },
          title: 'Social distancing',
          content: 'Maintain a distance of at least 2 meters from others is important, especially for people who are at a higher risk of getting sick.'
        },
        {
          image: { src: icon04, alt: 'Stay at Home' },
          title: 'Stay at home',
          content: 'Stay home if you feel unwell. If you have a fever, cough, and difficulty breathing, seek medical attention and call in advance.'
        }
      ]
    }
    const rootElement = this.rootElement()
    const headerElement = this.headerElement()
    headerElement.innerHTML = `
      <h1 data-aos="zoom-in">${data.title}</h1>
      <p data-aos="fade-down" class="width-content">${data.content}</p>
    `
    rootElement.appendChild(headerElement)
    rootElement.appendChild(this.cardElements(data.cards))
    this.appendChild(rootElement)
  }
}

customElements.define('prevent-section', PreventSection)
