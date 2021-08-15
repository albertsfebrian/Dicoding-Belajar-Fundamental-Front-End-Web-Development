import 'regenerator-runtime'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import FetchData from '@scripts/FetchData'
import '@components/jumbotron/jumbotron'
import '@components/prevent-section/prevent-section'
import CounterController from '@scripts/CounterController'
import ChartController from '@scripts/ChartController'
import CountryController from '@scripts/CountryController'

AOS.init({ once: true, duration: 1000, offset: 50 })
const jumbotronElement = document.querySelector('jumbotron-component')
const preventElement = document.querySelector('prevent-section')

jumbotronElement.render()
CounterController('main', null, FetchData.getCovidInfo())
ChartController()
preventElement.render()
CountryController()
