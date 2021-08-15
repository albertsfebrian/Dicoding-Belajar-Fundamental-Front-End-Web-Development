import '@components/prevent-card/prevent-card.css'

class PreventCard extends HTMLElement {
  set cardData (cardData) {
    this._cardData = cardData
  }

  get cardData () {
    return this._cardData
  }

  render () {
    this.innerHTML = ''
    this.innerHTML = `
      <div class="card-info">
        <div class="image-circle">
          <img src="${this._cardData?.image.src}" alt="${this._cardData?.image.alt}" height="35" width="35">
        </div>
        <div>
          <h6>${this._cardData?.title}</h6>
          <p>${this._cardData?.content}</p>
        </div>
      </div>
    `
  }
}

customElements.define('prevent-card', PreventCard)
