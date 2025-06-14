import React, { useState, useRef } from 'react'
import SearchSection from './componenets/SearchSection'
import CurrentWeather from './componenets/CurrentWeather'
import HourlyWeather from './componenets/HourlyWeather'
import NoResultsDiv from './componenets/NoResultDiv'
import { weatherCodes } from './constants.js' 

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecats, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef= useRef(null);

  const filterHourlyForecast= (hourlyDsta) => {
    const currentHour =new Date().getTime(0,0,0);
    const next24Hours = currentHour +24 * 60 * 60 * 1000;

    const next24HoursData = hourlyDsta.filter(({time}) => {
      const forecastTime= new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    })

    setHourlyForecasts(next24HoursData);

  }

  const getWeatherDetails= async (API_URL) =>{
    setHasNoResults(false);

    try{
      const response = await fetch(API_URL);
      if(!response.ok) throw new Error();
      const data= await response.json();

      const temperature= Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon= Object.keys(weatherCodes).find(icon=> weatherCodes[icon].includes(data.current.condition.code));

      setCurrentWeather({temperature, description, weatherIcon});

      const combinedHourlyData= [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];

      searchInputRef.current.value= data.location.name;
      filterHourlyForecast(combinedHourlyData);
    } catch {
      setHasNoResults(true);
    }
  }
  return (
    <div className='container'>
      <SearchSection getWeatherDetails= {getWeatherDetails} searchInputRef={searchInputRef}/>

      {hasNoResults ? (
        <NoResultsDiv/>
      ) : (
        <div className="weather-sect">
        <CurrentWeather currentWeather={currentWeather} />

        <div className="hourly">
          <ul className="weather-list">
            {hourlyForecats.map(hourlyData => (
              <HourlyWeather key={hourlyData.time_epoch} hourlyWeather={hourlyData} />
            ))}
          </ul>
        </div>
      </div>
      )
    }
    </div>
  )
}

export default App