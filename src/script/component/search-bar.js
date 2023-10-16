class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  set enterEvent(event) {
    this._enterEvent = event;
    this.render();
  }

  get searchValue() {
    return this.shadowDOM.querySelector('#searchElement').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
            
            .wrapper {
                max-width: 900px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                padding: 16px;
                border-radius: 5px;
                display: flex;
                flex-flow: column nowrap;
                gap: 16px;
                margin-block-end: 1rem;
            }

            .search-container {
                
                display: flex;
                top: 10px;
                background-color: #f5f8ff;
                position: sticky;
            }
            
            .search-container > input {
                background-color: transparent;
                width: 75%;
                padding: 16px;
                border: 0;
                border-bottom: 1px solid #6495ed;
                font-weight: bold;
            }
            
            .search-container > input:focus {
                outline: 0;
                border-bottom-color: #6759ff;
            }
            
            .search-container > input:focus::placeholder {
                font-weight: bold;
            }
            
            .search-container > input::placeholder {
                color: #E1AA74;
                font-weight: normal;
            }
            
            .search-container > button {
                width: 23%;
                cursor: pointer;
                margin-left: auto;
                padding: 16px;
                background-color: #192655;
                color: #F3F0CA;
                border-radius: 20px;
                border: 0;
                text-transform: uppercase;
            }

             #buttons {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: row wrap;
                gap: .4rem;
            }

            #buttons > button {
                border: 1px solid #6759ff;
                border-radius: 15px;
                background-color: trasparent;
                color: #6759ff;
                padding: 5px 10px;
                cursor: pointer;
            }

            #buttons button.active {
                background-color: #6759ff;
                color: white;
            }

            @media screen and (max-width: 550px) {
                .search-container {
                flex-direction: column;
                position: static;
                }
            
                .search-container > input {
                width: 100%;
                margin-bottom: 12px;
                }
            
                .search-container > button {
                width: 100%;
                }
            }
        </style>
        
        <div class="wrapper">
            <div id="search-container" class="search-container">
                <input placeholder="Search Your City, Subdistrict or Village Name " id="searchElement" type="search">
                <button id="searchButtonElement" type="submit">Search</button>
            </div>
        </div>`;

    this.shadowDOM.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
    this.shadowDOM.querySelector('#searchElement').addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        this._enterEvent();
      }
    });
  }
}

customElements.define('search-bar', SearchBar);
