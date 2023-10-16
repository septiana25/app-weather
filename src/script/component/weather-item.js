import './club-item.js';

class WeatherItem extends HTMLElement {
    constructor() {
        super();
    }

    set weathers(weathers) {
        this._weathers = weathers;
        this.render();
    }

    set cityName(cityName) {
        this._cityName = cityName;
    }

    render(){
        this.innerHTML = `
        <style>
           .container {
                display: block;
                margin-bottom: 18px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                overflow: hidden;
            }

            .waraper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: cornflowerblue;
                padding: 1rem;
                gap: 1rem;
            }

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column nowrap;
            }
            .icon p {
                text-transform: capitalize;
            }

            .weather-info {
                line-height: 2rem;
            }

            .weather-info h1 {
                font-size: 20px;
                text-transform: uppercase;
            }
            .waraper p {
                font-weight: bold;
            }

            .weather-grid {

            }


            
                
        </style>`;
        this._weathers.filterForecasts
        .forEach((weather, index) => {
            if (index === 0) {
                this.innerHTML += `
                <div class="container weather-grid">
                    <div class="waraper">
                        <div class="weather-info">
                            <h1>${this._weathers.cityName} - ${weather.dt_txt.split(" ")[0]} </h1>
                            <p>Temperature: ${(weather.main.temp - 273.15).toFixed(2)}°C</p>
                            <p>Wind: ${weather.wind.speed} M/S</p>
                            <p>Humidity: ${weather.main.humidity}%</p>
                        </div>
                        <div class="icon">
                            <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png" alt="weather-icon">
                            <p>${weather.weather[0].description}</p>
                        </div
                    </div>
                </div>
                `;
            } else {
                this.innerHTML += `
                <div class="container">
                    <div class="waraper ">
                        <div class="weather-info">
                            <h1> ${weather.dt_txt.split(" ")[0]} </h1>
                            <p>Temp: ${(weather.main.temp - 273.15).toFixed(2)}°C</p>
                            <p>Wind: ${weather.wind.speed} M/S</p>
                            <p>Humidity: ${weather.main.humidity}%</p>
                        </div>
                    </div>
                </div>
                `;
            }
        });
    }

    renderError(error) {
        this.innerHTML += `
        <style>
        .error-message {
            background-color: #ff6b6b;
            color: #fff;
            border: 1px solid #d23f3f;
            padding: 10px 20px;
            border-radius: 5px;
            text-align: center;
        }
        
        .error-text {
            margin: 0;
        }
        </style>`;
        this.innerHTML += `        
            <div class="error-message">
                <p class="error-text">${error}</p>
            </div>`;
    }
}

customElements.define('weather-item', WeatherItem);