class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :host {
                display: block;
                padding: 16px;
                width: 100%;
                background-color: #192655;
                color: #F3F0CA;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                text-align: center;
            }
            h1{
                font-size: 1.5rem;
                padding: 16px;
            }
          
        </style>

        <h1>Weather Finder</h1>`;
  }
}

customElements.define('app-bar', AppBar);
