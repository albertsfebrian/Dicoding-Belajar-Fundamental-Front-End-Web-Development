import axios from 'axios'

class FetchData {
  static baseUrl = 'https://covid19.mathdro.id/api/'

  static sendAPI (url) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(() => {
          reject(new Error('Failed to Fetch Data, Please try again...'))
        })
    })
  }

  static getCovidInfo () {
    return this.sendAPI(`${this.baseUrl}`)

  };

  static getCovidChart () {
    return this.sendAPI(`${this.baseUrl}daily`)
  };

  static getCountryList () {
    return this.sendAPI(`${this.baseUrl}countries`)
  };

  static getCovidInCountry (country) {
    return this.sendAPI(`${this.baseUrl}countries/${country}`)
  };
};
export default FetchData
