import { useState } from 'react';
import './App.css';

const weatherApi = {
  key: "8898755400122a2ae60707cc60f4336f",
  url: "https://api.openweathermap.org/data/2.5/"
}
// api call
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


const App = () => {
  const [ query, setQuery ]    = useState('');
  const [ weather, setWeather ] = useState({});
  
  const dateBuilder = (d) => {
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "Nov", "Dec"];
    let days = ["Monday", "Thursday", "Wendnesday", "Tuesday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${weatherApi.url}weather?q=${query}&units=metric&&appid=${weatherApi.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result);
        console.log(result);
      });
    }
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? 
      ((weather.main.temp > 15) ? 'app hot' : 'app') :
      'app'}>
      <main>
        <div className='seacrh-box'>
          <input
            type="text"
            className="search-bar"
            placeholder="Enter city.."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{ dateBuilder(new Date()) }</div>
              <div className='weather-box'>
                <div className='temp'> {Math.round(weather.main.temp)} C</div>
                <div className='weather'> {weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
