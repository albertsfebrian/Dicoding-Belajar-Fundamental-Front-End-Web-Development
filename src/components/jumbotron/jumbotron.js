import '@components/jumbotron/jumbotron.css'
import covidImg from '@public/covid.png'

class Jumbotron extends HTMLElement {
  render () {
    this.innerHTML = ''
    const data = {
      image: {
        src: covidImg,
        alt: 'Protection'
      },
      title: 'STAY AT HOME AND SAVE THE WORLD',
      content: `Coronavirus disease (COVID-19) is an infectious disease caused by a newly
      discovered coronavirus. Most people infected with the COVID-19 virus will experience
      mild to moderate respiratory illness (like the flu) with symptoms such as a cough,
      fever, and in more severe cases, difficulty breathing`
    }
    this.innerHTML = `
      <div class="jumbotron jumbotron-fluid py-5 px-2">
        <div class="container">
            <div class="row">
                <div class="m-auto col-12 col-md-6" data-aos="fade-right">
                    <img class="w-100" src="${data.image.src}" alt="${data.image.alt}">
                </div>
                <div class="col-12 col-md-6 m-auto pt-5" data-aos="fade-left">
                    <h1 class="font-weight-bold pb-3">${data.title}</h1>
                    <p class="lead">${data.content}</p>
                </div>
            </div>
        </div>
      </div>
    `
  }
}

customElements.define('jumbotron-component', Jumbotron)
